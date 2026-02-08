const fs = require('fs');
const path = require('path');

// Load the JSON
const jsonPath = path.join(__dirname, '../lib/eloquent-content.json');
const content = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Load manual-exercises.ts to extract all keys
const manualExercisesPath = path.join(__dirname, '../lib/manual-exercises.ts');
const manualExercisesContent = fs.readFileSync(manualExercisesPath, 'utf8');

// Extract all keys that look like "chXX-lY-sZ"
const keyRegex = /"(ch\d{2}-l\d+-s\d+)":/g;
const manualExerciseKeys = [];
let match;
while ((match = keyRegex.exec(manualExercisesContent)) !== null) {
    manualExerciseKeys.push(match[1]);
}

console.log(`Found ${manualExerciseKeys.length} manual exercise keys\n`);

// Build maps of all section and lesson IDs with their titles
const sectionMap = new Map(); // id -> { chapterNum, lessonTitle, sectionTitle }
const lessonMap = new Map();   // id -> { chapterNum, lessonTitle }

content.forEach(chapter => {
    chapter.lessons.forEach((lesson, li) => {
        lessonMap.set(lesson.id, {
            chapterNum: chapter.number,
            chapterTitle: chapter.title,
            lessonIndex: li,
            lessonTitle: lesson.title
        });
        lesson.sections.forEach((section, si) => {
            sectionMap.set(section.id, {
                chapterNum: chapter.number,
                chapterTitle: chapter.title,
                lessonIndex: li,
                lessonTitle: lesson.title,
                sectionIndex: si,
                sectionTitle: section.title
            });
        });
    });
});

// Check each manual exercise key
console.log('=== MANUAL EXERCISE VERIFICATION ===\n');

const mismatches = [];
const notFound = [];

manualExerciseKeys.forEach(key => {
    const info = sectionMap.get(key);
    if (info) {
        console.log(`✅ ${key} → Ch${info.chapterNum} L${info.lessonIndex}: ${info.lessonTitle}`);
    } else {
        console.log(`❌ ${key} → NOT FOUND IN JSON!`);
        notFound.push(key);
    }
});

if (notFound.length > 0) {
    console.log('\n=== KEYS NOT FOUND - NEED FIXING ===\n');
    notFound.forEach(key => {
        // Parse the key to understand what chapter/lesson it expects
        const [ch, lesson, section] = key.split('-');
        const chNum = parseInt(ch.replace('ch', ''));
        const lNum = parseInt(lesson.replace('l', ''));
        const sNum = parseInt(section.replace('s', ''));

        console.log(`${key} expects: Chapter ${chNum}, Lesson ${lNum}, Section ${sNum}`);

        // Show what lessons actually exist in that chapter
        const chapter = content.find(c => c.number === chNum);
        if (chapter) {
            console.log(`  Available lessons in Chapter ${chNum}:`);
            chapter.lessons.forEach((l, i) => {
                console.log(`    ${l.id}: ${l.title}`);
            });
        }
        console.log('');
    });
}

// Summary
console.log('\n=== SUMMARY ===');
console.log(`Total exercises: ${manualExerciseKeys.length}`);
console.log(`Found: ${manualExerciseKeys.length - notFound.length}`);
console.log(`Not found: ${notFound.length}`);

if (notFound.length === 0) {
    console.log('\n✅ All manual exercises are correctly mapped!');
}
