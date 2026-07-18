const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const targetDir = path.join(__dirname, 'src', 'app', 'pages');

walkDir(targetDir, function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace paths to components
    content = content.replace(/from\s+["'](?:\.\.\/)+components\/([^"']+)["']/g, 'from "@/app/components/$1"');
    
    // Replace paths to imports
    content = content.replace(/from\s+["'](?:\.\.\/)+imports\/([^"']+)["']/g, 'from "@/imports/$1"');

    if (content !== original) {
      console.log(`Updated ${filePath}`);
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
});
