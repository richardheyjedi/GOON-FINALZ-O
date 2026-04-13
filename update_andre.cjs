
const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\richa\\Desktop\\retro-disruptive-hero (9)\\content.ts';

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const searchString = 'image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1000",';
  const replaceString = 'image: "https://aura360.com.br/wp-content/uploads/2026/03/ANDRE-CANO.jpg",';
  
  if (content.indexOf(searchString) !== -1) {
    const newContent = content.replace(searchString, replaceString);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Successfully updated Andre Cano image.');
  } else {
    console.log('Could not find the target string.');
    // Debug: print what we see around Andre Cano
    const match = content.match(/name: "ANDRE CANO"[\s\S]{0,200}/);
    if (match) {
        console.log('Found context:', match[0]);
    }
  }
} catch (err) {
  console.error('Error:', err);
}
