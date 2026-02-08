const fs = require('fs');
const path = require('path');

// Load the JSON
const jsonPath = path.join(__dirname, '../lib/eloquent-content.json');
const content = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Get all section IDs from JSON
const allSectionIds = new Set();
content.forEach(chapter => {
    chapter.lessons.forEach(lesson => {
        lesson.sections.forEach(section => {
            allSectionIds.add(section.id);
        });
    });
});

// NEW corrected manual exercise keys
const manualExerciseKeys = [
    "ch00-l0-s0",   // Chapter 0 intro
    "ch01-l2-s0",   // Números (arithmetic) - FIXED
    "ch01-l3-s0",   // Cadenas (strings) - FIXED
    "ch01-l4-s0",   // Operadores unarios (typeof) - FIXED
    "ch01-l5-s0",   // Valores booleanos - FIXED
    "ch02-l9-s1",   // Chapter 2 - if statement
    "ch02-l10-s1",  // Chapter 2 - while loop
    "ch02-l12-s1"   // Chapter 2 - for loop
];

console.log('=== CHECKING CORRECTED EXERCISE KEY MATCHES ===\n');

manualExerciseKeys.forEach(key => {
    const exists = allSectionIds.has(key);
    console.log(`${key}: ${exists ? '✅ FOUND' : '❌ NOT FOUND'}`);
});

// Show what lessons correspond to these IDs
console.log('\n=== LESSON MAPPING CHECK ===\n');
content.slice(0, 3).forEach(chapter => {
    console.log(`\nChapter ${chapter.number}: ${chapter.title}`);
    chapter.lessons.forEach((lesson, li) => {
        const lessonId = lesson.id;
        const exerciseKeysForThisLesson = manualExerciseKeys.filter(k => k.startsWith(lessonId));
        if (exerciseKeysForThisLesson.length > 0) {
            console.log(`  ✅ Lesson ${li}: ${lesson.title} (${lessonId}) - has exercise(s): ${exerciseKeysForThisLesson.join(', ')}`);
        }
    });
});
