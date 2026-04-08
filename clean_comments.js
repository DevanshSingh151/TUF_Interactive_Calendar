const fs = require('fs');
const path = require('path');

function cleanFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove JSX comments: {/* comment */}
  content = content.replace(/\{\/\*[\s\S]*?\*\/\}\s*\n?/g, '');
  
  // Remove standalone line comments: // comment
  content = content.replace(/^\s*\/\/.*$/gm, '');
  
  // Remove inline comments separated by space or tab:  // comment
  // Ensure we don't break https:// urls by requiring space before //
  content = content.replace(/[ \t]+\/\/.*$/gm, '');
  
  // Clean up double empty lines that may have been left behind
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  fs.writeFileSync(filePath, content);
  console.log(`Cleaned ${filePath}`);
}

const dir = 'c:/TUF_pro_task/src';

function walk(directory) {
    fs.readdirSync(directory).forEach(file => {
        let fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            cleanFile(fullPath);
        }
    });
}

walk(dir);
