const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../lib/eloquent-content.json');
const content = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const manualExercisesPath = path.join(__dirname, '../lib/manual-exercises.ts');
const manualExercisesContent = fs.readFileSync(manualExercisesPath, 'utf8');

const keyRegex = /"(ch\d{2}-l\d+-s\d+)":/g;
const existingKeys = new Set();
let match;
while ((match = keyRegex.exec(manualExercisesContent)) !== null) {
    existingKeys.add(match[1]);
}

console.log('=== CHAPTERS 10-21: LESSONS WITHOUT EXERCISES ===\n');

for (let chNum = 10; chNum <= 21; chNum++) {
    const chapter = content.find(c => c.number === chNum);
    if (!chapter) continue;

    console.log(`\n📚 CH${chNum}: ${chapter.title}`);
    console.log('─'.repeat(50));

    // Find lessons without exercises (max 3 suggestions per chapter)
    const suggestions = [];
    chapter.lessons.forEach((lesson, li) => {
        const hasExercise = lesson.sections.some(s => existingKeys.has(s.id));
        if (!hasExercise && suggestions.length < 3 && lesson.title !== 'Introducción' && lesson.title !== 'Resumen') {
            const sectionId = lesson.sections[0]?.id || 'N/A';
            suggestions.push({ index: li, title: lesson.title, id: sectionId });
        }
    });

    if (suggestions.length > 0) {
        suggestions.forEach(s => {
            console.log(`  → "${s.id}": L${s.index} ${s.title}`);
        });
    } else {
        console.log('  (Ya tiene ejercicios o solo tiene intro/resumen)');
    }
}
