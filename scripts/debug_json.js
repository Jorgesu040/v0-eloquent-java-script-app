const fs = require('fs');
const path = require('path');

// Check the JSON output for chapter 0
const jsonPath = path.join(__dirname, '../lib/eloquent-content.json');
const content = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const ch0 = content.find(c => c.number === 0);
console.log('Chapter 0 lessons:', ch0.lessons.length);

// Find lesson with "Por qué importa el lenguaje"
ch0.lessons.forEach((lesson, li) => {
    console.log(`\nLesson ${li}: ${lesson.title}`);
    lesson.sections.forEach((section, si) => {
        console.log(`  Section ${si}: ${section.title}`);
        section.content.forEach((block, bi) => {
            if (block.type === 'code') {
                console.log(`    Block ${bi}: CODE - ${block.content.substring(0, 60)}...`);
            } else if (block.type === 'paragraph') {
                console.log(`    Block ${bi}: PARA - ${block.content.substring(0, 60)}...`);
            } else {
                console.log(`    Block ${bi}: ${block.type.toUpperCase()}`);
            }
        });
    });
});

// Check if any code block contains the binary
let foundBinary = false;
ch0.lessons.forEach((lesson) => {
    lesson.sections.forEach((section) => {
        section.content.forEach((block) => {
            if (block.type === 'code' && block.content.includes('00110001')) {
                console.log('\n=== FOUND BINARY CODE BLOCK ===');
                console.log(block.content);
                foundBinary = true;
            }
        });
    });
});

if (!foundBinary) {
    console.log('\n=== BINARY CODE BLOCK NOT FOUND IN JSON ===');
}
