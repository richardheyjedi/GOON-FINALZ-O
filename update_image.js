
const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\richa\\Desktop\\retro-disruptive-hero (9)\\content.ts';

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // A string exata que estamos procurando, baseada na leitura anterior do arquivo
  const target = `        name: "RONALDO PANYE",
        role: "Mentor",
        level: "LVL.89",
        image: "https://aura360.com.br/wp-content/uploads/2026/03/SHUI.png",`;
        
  const replacement = `        name: "RONALDO PANYE",
        role: "Mentor",
        level: "LVL.89",
        image: "https://aura360.com.br/wp-content/uploads/2026/03/RONALDO-PANYE.jpg",`;

  if (content.includes(target)) {
    const newContent = content.replace(target, replacement);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Successfully updated the image URL.');
  } else {
    console.log('Target string not found. Dumping a snippet around where it should be:');
    const index = content.indexOf('RONALDO PANYE');
    if (index !== -1) {
        console.log(content.substring(index, index + 200));
    } else {
        console.log('Could not find RONALDO PANYE in file');
    }
  }
} catch (err) {
  console.error('Error:', err);
}
