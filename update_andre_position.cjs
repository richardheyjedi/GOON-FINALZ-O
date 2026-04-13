
const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\richa\\Desktop\\retro-disruptive-hero (9)\\content.ts';

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const searchString = 'image: "https://aura360.com.br/wp-content/uploads/2026/03/ANDRE-CANO.jpg",';
  const replaceString = 'image: "https://aura360.com.br/wp-content/uploads/2026/03/ANDRE-CANO.jpg",\n        imagePosition: "object-center",';
  
  if (content.indexOf(searchString) !== -1) {
    const newContent = content.replace(searchString, replaceString);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Successfully added imagePosition for Andre Cano.');
  } else {
    console.log('Could not find the target string.');
    // Debug
    const match = content.match(/name: "ANDRE CANO"[\s\S]{0,300}/);
    if (match) {
        console.log('Found context:', match[0]);
    }
  }
} catch (err) {
  console.error('Error:', err);
}
