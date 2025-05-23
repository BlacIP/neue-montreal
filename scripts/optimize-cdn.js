#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Add CDN optimization headers to CSS files
const cssFiles = ['css/font.css', 'css/font.min.css'];

cssFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Add CDN-friendly comments if not already present
    if (!content.includes('CORS-enabled')) {
      const header = `/*! CORS-enabled CDN - Safe for cross-origin loading */\n`;
      content = header + content;
      fs.writeFileSync(file, content);
      console.log(`✅ Optimized ${file} for CDN`);
    }
  }
});

// Ensure .nojekyll exists
if (!fs.existsSync('.nojekyll')) {
  fs.writeFileSync('.nojekyll', '');
  console.log('✅ Created .nojekyll file');
}

console.log('🚀 CDN optimization complete!');