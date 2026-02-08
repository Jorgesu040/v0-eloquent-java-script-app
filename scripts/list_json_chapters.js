const fs = require('fs');
const content = require('../lib/eloquent-content.json');

content.forEach(c => {
    console.log(`${c.id}: ${c.title} (Number: ${c.number})`);
});
