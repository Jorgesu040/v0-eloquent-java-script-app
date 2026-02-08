
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../Eloquent JS course content');
const OUTPUT_FILE = path.join(__dirname, '../lib/eloquent-content.json');
const PUBLIC_DIR = path.join(__dirname, '../public/courses/eloquent');

// Make sure public dir exists
if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Helper to clean text
const cleanText = (text) => text.replace(/\s+/g, ' ').trim();
const stripTags = (html) => html.replace(/<[^>]*>/g, '');
const decodeHtml = (html) => html.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

function copyAsset(srcPath) {
    // srcPath is relative to SOURCE_DIR, e.g. "Introducción files/img.jpg"
    // We want to copy it to PUBLIC_DIR + srcPath
    // And return the public URL path

    // Decoded src URL (spaces are %20 in html sometimes, but here we got raw strings from src attribute?)
    // Usually src attributes are URL encoded.
    const decodedPath = decodeURIComponent(srcPath);
    const sourceFile = path.join(SOURCE_DIR, decodedPath);
    const targetFile = path.join(PUBLIC_DIR, decodedPath);
    const targetDir = path.dirname(targetFile);

    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    if (fs.existsSync(sourceFile)) {
        try {
            fs.copyFileSync(sourceFile, targetFile);
            // Return web-accessible path
            // Note: Windows paths use backslash, we need forward slash for URL
            const webPath = `/courses/eloquent/${decodedPath.replace(/\\/g, '/')}`;
            return webPath;
        } catch (e) {
            console.error(`Failed to copy ${sourceFile}:`, e.message);
            return srcPath;
        }
    } else {
        console.warn(`Asset not found: ${sourceFile}`);
        return srcPath;
    }
}

function findClosingTag(html, tagName, startIndex) {
    let balance = 1;
    let currentIndex = startIndex;

    while (currentIndex < html.length) {
        const nextOpen = html.indexOf(`<${tagName}`, currentIndex);
        const nextClose = html.indexOf(`</${tagName}>`, currentIndex);

        if (nextClose === -1) return -1;

        if (nextOpen !== -1 && nextOpen < nextClose) {
            balance++;
            currentIndex = nextOpen + 1;
        } else {
            balance--;
            currentIndex = nextClose + 1;
            if (balance === 0) {
                return nextClose;
            }
        }
    }
    return -1;
}

function parseBlocks(html) {
    const blocks = [];
    let currentIndex = 0;

    while (currentIndex < html.length) {
        const nextTagMatch = html.substring(currentIndex).match(/<(p|pre|blockquote|ul|ol|figure)[^>]*>/i);
        if (!nextTagMatch) break;

        const tagName = nextTagMatch[1].toLowerCase();
        const tagStart = currentIndex + nextTagMatch.index;
        const contentStart = tagStart + nextTagMatch[0].length;

        const closeIndex = findClosingTag(html, tagName, contentStart);

        if (closeIndex === -1) {
            currentIndex = contentStart;
            continue;
        }

        const content = html.substring(contentStart, closeIndex);
        const fullTag = html.substring(tagStart, closeIndex + tagName.length + 3);

        if (tagName === 'p') {
            if (content.includes('<img')) {
                const srcMatch = content.match(/src="([^"]*)"/);
                const altMatch = content.match(/alt="([^"]*)"/);
                if (srcMatch) {
                    let src = srcMatch[1];
                    if (src.startsWith('./')) src = src.substring(2);

                    const webPath = copyAsset(src);

                    blocks.push({
                        type: 'image',
                        src: webPath,
                        alt: altMatch ? altMatch[1] : 'Image',
                        caption: ''
                    });
                }
            } else {
                let cleanContent = content.replace(/<a[^>]*>(.*?)<\/a>/g, '$1');
                cleanContent = cleanContent.replace(/\s+/g, ' ').trim();

                blocks.push({
                    type: 'paragraph',
                    content: cleanContent
                });
            }
        } else if (tagName === 'pre') {
            const langMatch = fullTag.match(/data-language="([^"]*)"/);
            const code = decodeHtml(stripTags(content)).trim();
            blocks.push({
                type: 'code',
                content: code,
                language: langMatch && langMatch[1] !== 'null' ? langMatch[1] : 'javascript'
            });
        } else if (tagName === 'blockquote') {
            blocks.push({
                type: 'blockquote',
                content: cleanText(stripTags(content))
            });
        } else if (tagName === 'ul' || tagName === 'ol') {
            const items = [];
            let liIndex = 0;
            while (liIndex < content.length) {
                const nextLi = content.indexOf('<li', liIndex);
                if (nextLi === -1) break;
                const nextLiClose = findClosingTag(content, 'li', nextLi + 3);
                if (nextLiClose === -1) break;

                const liContent = content.substring(nextLi, nextLiClose);
                const liClean = cleanText(stripTags(liContent));
                items.push(liClean);
                liIndex = nextLiClose + 5;
            }

            blocks.push({
                type: 'list',
                content: items
            });
        }
        else if (tagName === 'figure') {
            const imgMatch = content.match(/<img[^>]*>/);
            if (imgMatch) {
                const srcMatch = imgMatch[0].match(/src="([^"]*)"/);
                const altMatch = imgMatch[0].match(/alt="([^"]*)"/);
                if (srcMatch) {
                    let src = srcMatch[1];
                    if (src.startsWith('./')) src = src.substring(2);

                    const webPath = copyAsset(src);

                    blocks.push({
                        type: 'image',
                        src: webPath,
                        alt: altMatch ? altMatch[1] : 'Image'
                    });
                }
            }
        }

        currentIndex = closeIndex + tagName.length + 3;
    }

    return blocks;
}

function parseChapter(filePath, chapterIndex) {
    console.log(`Parsing ${filePath}...`);
    let html = fs.readFileSync(filePath, 'utf8');

    // Extract everything inside <article>
    const articleMatch = html.match(/<article>(.*?)<\/article>/s);
    if (!articleMatch) return null;
    let content = articleMatch[1];

    // Remove nav
    content = content.replace(/<nav>.*?<\/nav>/s, '');

    // Extract H1 title
    const h1Match = content.match(/<h1>(.*?)<\/h1>/s);
    const title = h1Match ? cleanText(stripTags(h1Match[1])) : `Chapter ${chapterIndex}`;

    // Find first H1 end
    const h1End = h1Match ? h1Match.index + h1Match[0].length : 0;
    const firstH2 = content.indexOf('<h2');
    const introHtml = content.substring(h1End, firstH2 !== -1 ? firstH2 : content.length);

    // Extract first p for description
    const pMatch = introHtml.match(/<p[^>]*>(.*?)<\/p>/s);
    let description = pMatch ? cleanText(stripTags(pMatch[1])).substring(0, 150) + "..." : "Capítulo del curso Eloquent JavaScript";

    const chapterId = `ch${chapterIndex.toString().padStart(2, '0')}`;
    const lessons = [];

    // Split by H2
    const parts = [];
    const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gs;
    let match;
    const headers = [];
    while ((match = h2Regex.exec(content)) !== null) {
        headers.push({
            index: match.index,
            end: match.index + match[0].length,
            title: cleanText(stripTags(match[1]))
        });
    }

    if (headers.length === 0) {
        parts.push({ title: 'Introducción', html: content.substring(h1End) });
    } else {
        parts.push({ title: 'Introducción', html: content.substring(h1End, headers[0].index) });
        for (let i = 0; i < headers.length; i++) {
            const start = headers[i].end;
            const end = (i < headers.length - 1) ? headers[i + 1].index : content.length;
            parts.push({ title: headers[i].title, html: content.substring(start, end) });
        }
    }

    parts.forEach((part, index) => {
        const lessonId = `${chapterId}-l${index}`;
        const blocks = parseBlocks(part.html);

        const sections = [];
        let currentSectionBlocks = [];
        let sectionCount = 0;

        blocks.forEach((block) => {
            currentSectionBlocks.push(block);

            if (currentSectionBlocks.length >= 3 && block.type === 'paragraph') {
                sections.push({
                    id: `${lessonId}-s${sectionCount}`,
                    title: sections.length === 0 ? part.title : 'Continuación',
                    content: currentSectionBlocks
                });
                currentSectionBlocks = [];
                sectionCount++;
            }
        });

        if (currentSectionBlocks.length > 0) {
            sections.push({
                id: `${lessonId}-s${sectionCount}`,
                title: sections.length === 0 ? part.title : 'Continuación',
                content: currentSectionBlocks
            });
        }

        if (sections.length > 0) {
            lessons.push({
                id: lessonId,
                title: part.title,
                sections: sections,
                exercises: [],
                xpReward: 20 + (sections.length * 5)
            });
        }
    });

    return {
        id: chapterId,
        number: chapterIndex,
        title: title,
        titleEs: title,
        part: "part1",
        partLabel: "Parte 1",
        icon: "BookOpen",
        description: description,
        isProject: title.toLowerCase().includes("proyecto"),
        totalXP: lessons.reduce((acc, l) => acc + l.xpReward, 0),
        lessons: lessons
    };
}

function processAllFiles() {
    const files = fs.readdirSync(SOURCE_DIR).filter(file => file.endsWith('.html'));
    const chapters = [];

    files.forEach(file => {
        const filePath = path.join(SOURCE_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const match = content.match(/"number":(\d+)/);

        if (match) {
            const number = parseInt(match[1]);
            const chapterData = parseChapter(filePath, number);
            if (chapterData) chapters.push(chapterData);
        }
    });

    chapters.sort((a, b) => a.number - b.number);

    chapters.forEach(c => {
        if (c.number <= 12) {
            c.part = "part1";
            c.partLabel = "Parte 1: Lenguaje";
        } else if (c.number <= 19) {
            c.part = "part2";
            c.partLabel = "Parte 2: Navegador";
        } else {
            c.part = "part3";
            c.partLabel = "Parte 3: Node.js";
        }
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(chapters, null, 2));
    console.log(`Successfully generated ${OUTPUT_FILE} with ${chapters.length} chapters.`);
}

processAllFiles();
