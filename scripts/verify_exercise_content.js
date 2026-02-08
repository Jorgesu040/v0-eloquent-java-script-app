const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../lib/eloquent-content.json');
const content = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const manualExercisesPath = path.join(__dirname, '../lib/manual-exercises.ts');
const manualExercisesContent = fs.readFileSync(manualExercisesPath, 'utf8');

// Build section map
const sectionMap = new Map();
content.forEach(chapter => {
    chapter.lessons.forEach((lesson, li) => {
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

// Extract exercise keys and their prompts
const exerciseRegex = /"(ch\d{2}-l\d+-s\d+)":\s*\{[^}]*prompt:\s*"([^"]+)"/gs;
const exercises = [];
let match;

// Reset regex
const fileContent = manualExercisesContent;
const lines = fileContent.split('\n');
let currentKey = null;
let currentPrompt = null;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const keyMatch = line.match(/"(ch\d{2}-l\d+-s\d+)":/);
    if (keyMatch) {
        currentKey = keyMatch[1];
    }
    const promptMatch = line.match(/prompt:\s*"([^"]+)"/);
    if (promptMatch && currentKey) {
        currentPrompt = promptMatch[1];
        exercises.push({ key: currentKey, prompt: currentPrompt });
        currentKey = null;
    }
}

console.log('=== EXERCISE-LESSON CONTENT VERIFICATION ===\n');
console.log('Format: [EXERCISE KEY] Lesson Title\n         → Exercise Prompt\n');

exercises.forEach(ex => {
    const info = sectionMap.get(ex.key);
    if (info) {
        console.log(`[${ex.key}] Ch${info.chapterNum}: ${info.lessonTitle}`);
        console.log(`  → ${ex.prompt.substring(0, 80)}${ex.prompt.length > 80 ? '...' : ''}`);
        console.log('');
    }
});
