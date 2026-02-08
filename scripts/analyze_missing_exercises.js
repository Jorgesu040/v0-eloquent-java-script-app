const fs = require('fs');
const path = require('path');

// Load the JSON
const jsonPath = path.join(__dirname, '../lib/eloquent-content.json');
const content = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Load manual-exercises.ts
const manualExercisesPath = path.join(__dirname, '../lib/manual-exercises.ts');
const manualExercisesContent = fs.readFileSync(manualExercisesPath, 'utf8');

// Extract section-level keys
const keyRegex = /"(ch\d{2}-l\d+-s\d+)":/g;
const existingKeys = new Set();
let match;
while ((match = keyRegex.exec(manualExercisesContent)) !== null) {
    existingKeys.add(match[1]);
}

console.log('=== ANALYSIS: MANUAL_EXERCISES for Chapters 0-9 ===\n');

// For each chapter 0-9, show what lessons exist and which have exercises
for (let chNum = 0; chNum <= 9; chNum++) {
    const chapter = content.find(c => c.number === chNum);
    if (!chapter) continue;

    console.log(`\n📚 CHAPTER ${chNum}: ${chapter.title}`);
    console.log('─'.repeat(50));

    let lessonsWithExercises = 0;
    let lessonsWithoutExercises = [];

    chapter.lessons.forEach((lesson, li) => {
        const lessonHasExercise = lesson.sections.some(s => existingKeys.has(s.id));

        if (lessonHasExercise) {
            lessonsWithExercises++;
            const exerciseIds = lesson.sections.filter(s => existingKeys.has(s.id)).map(s => s.id);
            console.log(`  ✅ L${li}: ${lesson.title} (${exerciseIds.join(', ')})`);
        } else {
            lessonsWithoutExercises.push({ index: li, title: lesson.title, id: lesson.id, sections: lesson.sections });
        }
    });

    if (lessonsWithoutExercises.length > 0) {
        console.log(`\n  ❌ ${lessonsWithoutExercises.length} lessons WITHOUT exercises:`);
        lessonsWithoutExercises.forEach(l => {
            // Show first section ID as suggestion
            const suggestedId = l.sections[0]?.id || 'N/A';
            console.log(`     L${l.index}: ${l.title} → suggested key: "${suggestedId}"`);
        });
    }

    console.log(`\n  Summary: ${lessonsWithExercises}/${chapter.lessons.length} lessons have exercises`);
}
