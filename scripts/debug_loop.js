const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../Eloquent JS course content');
const filePath = path.join(SOURCE_DIR, 'Introducción __ Eloquent JavaScript.html');

let html = fs.readFileSync(filePath, 'utf8');

// Extract everything inside <article>
const articleMatch = html.match(/<article>(.*?)<\/article>/s);
let content = articleMatch[1];
content = content.replace(/<nav>.*?<\/nav>/s, '');

// Find the h2 "Por qué importa el lenguaje"
const h2Match = content.match(/<h2[^>]*>.*?Por qué importa el lenguaje.*?<\/h2>/s);
const startIndex = h2Match.index + h2Match[0].length;
const nextH2Match = content.substring(startIndex).match(/<h2[^>]*>/);
const endIndex = nextH2Match ? startIndex + nextH2Match.index : content.length;
const sectionHtml = content.substring(startIndex, endIndex);

// Simulate parseBlocks with debug
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
            if (balance === 0) return nextClose;
        }
    }
    return -1;
}

function parseBlocksDebug(html) {
    let currentIndex = 0;
    let iterations = 0;
    const MAX_ITERATIONS = 30;

    while (currentIndex < html.length && iterations < MAX_ITERATIONS) {
        iterations++;
        const nextTagMatch = html.substring(currentIndex).match(/<(p|pre|blockquote|ul|ol|figure)[^>]*>/i);

        if (!nextTagMatch) {
            console.log(`Iteration ${iterations}: No more tags found after index ${currentIndex}`);
            break;
        }

        const tagName = nextTagMatch[1].toLowerCase();
        const tagStart = currentIndex + nextTagMatch.index;
        const contentStart = tagStart + nextTagMatch[0].length;

        console.log(`Iteration ${iterations}: Found <${tagName}> at index ${tagStart}, tag: ${nextTagMatch[0].substring(0, 60)}`);

        const closeIndex = findClosingTag(html, tagName, contentStart);

        if (closeIndex === -1) {
            console.log(`  -> CLOSE TAG NOT FOUND, skipping to ${contentStart}`);
            currentIndex = contentStart;
            continue;
        }

        const contentLen = closeIndex - contentStart;
        console.log(`  -> Close tag at ${closeIndex}, content length: ${contentLen}`);

        // Show snippet of content
        const contentSnippet = html.substring(contentStart, Math.min(contentStart + 80, closeIndex));
        console.log(`  -> Content: ${contentSnippet.substring(0, 60)}...`);

        currentIndex = closeIndex + tagName.length + 3;
    }
}

parseBlocksDebug(sectionHtml);
