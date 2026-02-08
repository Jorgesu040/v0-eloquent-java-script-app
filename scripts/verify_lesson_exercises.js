const fs = require('fs');
const path = require('path');

// Load the JSON
const jsonPath = path.join(__dirname, '../lib/eloquent-content.json');
const content = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Load manual-exercises.ts to extract all keys
const manualExercisesPath = path.join(__dirname, '../lib/manual-exercises.ts');
const manualExercisesContent = fs.readFileSync(manualExercisesPath, 'utf8');

// Extract LESSON-level keys (format: "chXX-lY": [...])
// These are different from section keys ("chXX-lY-sZ")
const lessonKeyRegex = /"(ch\d{2}-l\d+)":\s*\[/g;
const lessonExerciseKeys = [];
let match;
while ((match = lessonKeyRegex.exec(manualExercisesContent)) !== null) {
    lessonExerciseKeys.push(match[1]);
}

console.log(`Found ${lessonExerciseKeys.length} MANUAL_LESSON_EXERCISES keys\n`);

// Build map of lesson IDs
const lessonMap = new Map();
content.forEach(chapter => {
    chapter.lessons.forEach((lesson, li) => {
        lessonMap.set(lesson.id, {
            chapterNum: chapter.number,
            chapterTitle: chapter.title,
            lessonIndex: li,
            lessonTitle: lesson.title
        });
    });
});

// Check each lesson exercise key
console.log('=== MANUAL_LESSON_EXERCISES VERIFICATION ===\n');

const notFound = [];

lessonExerciseKeys.forEach(key => {
    const info = lessonMap.get(key);
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
        const [ch, lesson] = key.split('-');
        const chNum = parseInt(ch.replace('ch', ''));
        const lNum = parseInt(lesson.replace('l', ''));

        console.log(`${key} expects: Chapter ${chNum}, Lesson ${lNum}`);

        const chapter = content.find(c => c.number === chNum);
        if (chapter) {
            console.log(`  Available lessons in Chapter ${chNum}:`);
            chapter.lessons.forEach((l, i) => {
                console.log(`    L${i}: ${l.id} → ${l.title}`);
            });
        }
        console.log('');
    });
}

// Summary
console.log('\n=== SUMMARY ===');
console.log(`Total lesson exercise keys: ${lessonExerciseKeys.length}`);
console.log(`Found: ${lessonExerciseKeys.length - notFound.length}`);
console.log(`Not found: ${notFound.length}`);

if (notFound.length === 0) {
    console.log('\n✅ All MANUAL_LESSON_EXERCISES are correctly mapped!');
}
