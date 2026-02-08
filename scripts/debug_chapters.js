const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../Eloquent JS course content');

if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`Directory not found: ${SOURCE_DIR}`);
    process.exit(1);
}

const files = fs.readdirSync(SOURCE_DIR).filter(file => file.endsWith('.html'));

console.log('Scanning files for chapter numbers...');
files.forEach(file => {
    const content = fs.readFileSync(path.join(SOURCE_DIR, file), 'utf8');
    const match = content.match(/"number":(\d+)/);
    if (match) {
        console.log(`[${match[1]}] ${file}`);
    } else {
        console.log(`[??] ${file}`);
    }
});
