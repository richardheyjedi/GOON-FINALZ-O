
import os

file_path = r"c:\Users\richa\Desktop\retro-disruptive-hero (9)\content.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = '        name: "RONALDO PANYE",\n        role: "Mentor",\n        level: "LVL.89",\n        image: "https://aura360.com.br/wp-content/uploads/2026/03/SHUI.png",'
replacement = '        name: "RONALDO PANYE",\n        role: "Mentor",\n        level: "LVL.89",\n        image: "https://aura360.com.br/wp-content/uploads/2026/03/RONALDO-PANYE.jpg",'

if target in content:
    new_content = content.replace(target, replacement)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully replaced content.")
else:
    print("Target string not found.")
