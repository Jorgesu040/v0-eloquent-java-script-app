const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../Eloquent JS course content');
const filePath = path.join(SOURCE_DIR, 'Introducción __ Eloquent JavaScript.html');

let html = fs.readFileSync(filePath, 'utf8');

// Extract everything inside <article>
const articleMatch = html.match(/<article>(.*?)<\/article>/s);
if (!articleMatch) {
    console.log('No article found');
    process.exit(1);
}
let content = articleMatch[1];

// Remove nav
content = content.replace(/<nav>.*?<\/nav>/s, '');

// Find the h2 "Por qué importa el lenguaje"
const h2Match = content.match(/<h2[^>]*>.*?Por qué importa el lenguaje.*?<\/h2>/s);
if (!h2Match) {
    console.log('H2 not found');
    process.exit(1);
}

console.log('H2 found at index:', h2Match.index);

// Get content after this h2 until next h2
const startIndex = h2Match.index + h2Match[0].length;
const nextH2Match = content.substring(startIndex).match(/<h2[^>]*>/);
const endIndex = nextH2Match ? startIndex + nextH2Match.index : content.length;

const sectionHtml = content.substring(startIndex, endIndex);
console.log('Section length:', sectionHtml.length);

// Now test the regex
const tagRegex = /<(p|pre|blockquote|ul|ol|figure)[^>]*>/i;
console.log('\n=== Testing regex on section ===');

const testMatch = sectionHtml.match(tagRegex);
console.log('First match:', testMatch ? testMatch[0].substring(0, 50) : 'none');

// Find ALL pre tags in section
console.log('\n=== All <pre> tags in section ===');
const preMatches = sectionHtml.matchAll(/<pre[^>]*>/gi);
for (const m of preMatches) {
    console.log(`At index ${m.index}: ${m[0].substring(0, 80)}`);
    // Show content after
    const contentStart = m.index + m[0].length;
    const contentPreview = sectionHtml.substring(contentStart, contentStart + 100);
    console.log('  Content: ' + contentPreview.substring(0, 80));
}

// Find ALL p tags in section  
console.log('\n=== First 5 <p> tags in section ===');
const pMatches = [...sectionHtml.matchAll(/<p[^>]*>/gi)].slice(0, 5);
for (const m of pMatches) {
    console.log(`At index ${m.index}: ${m[0].substring(0, 50)}`);
}

// Check if the pre tag is INSIDE a p tag
console.log('\n=== Checking if pre is nested ===');
const preTagIndex = sectionHtml.indexOf('<pre');
const closestPBefore = sectionHtml.lastIndexOf('<p', preTagIndex);
const closestPCloseBefore = sectionHtml.lastIndexOf('</p>', preTagIndex);
console.log(`Pre tag at: ${preTagIndex}`);
console.log(`Closest <p before pre: ${closestPBefore}`);
console.log(`Closest </p> before pre: ${closestPCloseBefore}`);

if (closestPBefore > closestPCloseBefore) {
    console.log('PRE IS INSIDE AN UNCLOSED P TAG!');
    // Show what's in that p tag
    const pContent = sectionHtml.substring(closestPBefore, preTagIndex + 100);
    console.log('P tag content:', pContent);
}
