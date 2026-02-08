const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../Eloquent JS course content');

function findAllTags(html) {
    // Match all opening tags (not closing tags)
    const tagRegex = /<([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
    const tags = {};
    let match;

    while ((match = tagRegex.exec(html)) !== null) {
        const tagName = match[1].toLowerCase();
        tags[tagName] = (tags[tagName] || 0) + 1;
    }

    return tags;
}

function analyzeFiles() {
    const files = fs.readdirSync(SOURCE_DIR).filter(file => file.endsWith('.html'));
    const allTags = {};
    const tagsByFile = {};

    files.forEach(file => {
        const filePath = path.join(SOURCE_DIR, file);
        const html = fs.readFileSync(filePath, 'utf8');

        // Extract only article content
        const articleMatch = html.match(/<article>(.*?)<\/article>/s);
        if (!articleMatch) {
            console.log(`No article found in: ${file}`);
            return;
        }

        const content = articleMatch[1];
        const tags = findAllTags(content);
        tagsByFile[file] = tags;

        Object.keys(tags).forEach(tag => {
            allTags[tag] = (allTags[tag] || 0) + tags[tag];
        });
    });

    console.log('\n=== ALL UNIQUE TAGS USED IN ARTICLES ===\n');
    const sortedTags = Object.entries(allTags).sort((a, b) => b[1] - a[1]);
    sortedTags.forEach(([tag, count]) => {
        console.log(`${tag}: ${count} occurrences`);
    });

    console.log('\n=== TAGS NOT HANDLED BY CURRENT PARSER ===\n');
    const handledTags = ['p', 'pre', 'blockquote', 'ul', 'ol', 'figure', 'li', 'img', 'a', 'h1', 'h2', 'nav', 'code', 'em', 'strong', 'br', 'span', 'article'];
    const unhandledTags = sortedTags.filter(([tag]) => !handledTags.includes(tag));
    unhandledTags.forEach(([tag, count]) => {
        console.log(`${tag}: ${count} occurrences`);
    });

    // Now let's check which tags appear at block level (direct children of article)
    console.log('\n=== BLOCK-LEVEL TAGS (outside of paragraphs) ===\n');
    files.forEach(file => {
        const filePath = path.join(SOURCE_DIR, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const articleMatch = html.match(/<article>(.*?)<\/article>/s);
        if (!articleMatch) return;

        let content = articleMatch[1];
        // Remove nav
        content = content.replace(/<nav>.*?<\/nav>/s, '');

        // Find top-level block elements by looking at what's directly after a closing tag or start
        const blockRegex = /<(table|dl|div|section|aside|hr|h3|h4|details|summary|svg|canvas)[^>]*>/gi;
        let blockMatch;
        const blocksInFile = [];
        while ((blockMatch = blockRegex.exec(content)) !== null) {
            blocksInFile.push(blockMatch[1].toLowerCase());
        }
        if (blocksInFile.length > 0) {
            console.log(`${file}:`);
            const unique = [...new Set(blocksInFile)];
            unique.forEach(b => console.log(`  - ${b}`));
        }
    });

    // Find sample of unhandled content
    console.log('\n=== SAMPLE: First occurrence of unhandled block tags ===\n');
    const checkTags = ['table', 'div', 'dl', 'h3', 'h4', 'details', 'summary', 'hr', 'svg', 'canvas'];
    checkTags.forEach(tag => {
        for (const file of files) {
            const filePath = path.join(SOURCE_DIR, file);
            const html = fs.readFileSync(filePath, 'utf8');
            const regex = new RegExp(`<${tag}[^>]*>.*?</${tag}>`, 's');
            const match = html.match(regex);
            if (match) {
                console.log(`\n--- First <${tag}> found in ${file} ---`);
                console.log(match[0].substring(0, 300) + (match[0].length > 300 ? '...' : ''));
                break;
            }
        }
    });
}

analyzeFiles();
