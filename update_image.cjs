
const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\richa\\Desktop\\retro-disruptive-hero (9)\\content.ts';

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Construct the target string carefully matching the indentation seen in read_file output
  // Line 244:         name: "RONALDO PANYE",
  // Line 245:         role: "Mentor",
  // Line 246:         level: "LVL.89",
  // Line 247:         image: "https://aura360.com.br/wp-content/uploads/2026/03/SHUI.png",
  
  const target = `        name: "RONALDO PANYE",
        role: "Mentor",
        level: "LVL.89",
        image: "https://aura360.com.br/wp-content/uploads/2026/03/SHUI.png",`;
        
  const replacement = `        name: "RONALDO PANYE",
        role: "Mentor",
        level: "LVL.89",
        image: "https://aura360.com.br/wp-content/uploads/2026/03/RONALDO-PANYE.jpg",`;

  if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully updated the image URL.');
  } else {
    console.log('Target string not found. Printing nearby content for debugging:');
    const match = content.match(/name: "RONALDO PANYE"[\s\S]{0,200}/);
    if (match) {
        console.log('Found block:', match[0]);
    } else {
        console.log('Could not find RONALDO PANYE block');
    }
  }
} catch (err) {
  console.error('Error:', err);
}
