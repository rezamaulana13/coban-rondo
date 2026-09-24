const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== '.agents' && file !== '.git' && file !== 'node_modules') {
        getAllHtmlFiles(fullPath, arrayOfFiles);
      }
    } else if (file.endsWith('.html')) {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

const htmlFiles = getAllHtmlFiles(__dirname);
console.log(`Found ${htmlFiles.length} HTML files.`);

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Streamline Google Fonts to Plus Jakarta Sans only (remove unused Manrope & Outfit)
  const heavyFontStr = 'family=Manrope:wght@600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Outfit:wght@600;700;800&display=swap';
  const cleanFontStr = 'family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap';
  if (content.includes(heavyFontStr)) {
    content = content.replaceAll(heavyFontStr, cleanFontStr);
    modified = true;
  }

  // Optimize Google Fonts to non-blocking preload
  const gFontRegex = /<link href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]+" rel="stylesheet">/g;
  if (gFontRegex.test(content)) {
    content = content.replace(gFontRegex, (match) => {
      const urlMatch = match.match(/href="([^"]+)"/);
      if (!urlMatch) return match;
      const url = urlMatch[1];
      return `<link rel="preload" as="style" href="${url}" onload="this.onload=null;this.rel='stylesheet'">\n  <noscript><link rel="stylesheet" href="${url}"></noscript>`;
    });
    modified = true;
  }

  // 2. Optimize FontAwesome to non-blocking preload
  const faRegex = /<link href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/6\.5\.2\/css\/all\.min\.css" rel="stylesheet">/g;
  if (faRegex.test(content)) {
    content = content.replace(faRegex, `<link rel="preload" as="style" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" onload="this.onload=null;this.rel='stylesheet'">\n  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></noscript>`);
    modified = true;
  }

  // 3. Update style.css to style.min.css
  // Handle relative paths (e.g., ../assets/css/style.css or assets/css/style.css)
  if (content.includes('style.css')) {
    content = content.replace(/href="([^"]*assets\/css\/)style\.css"/g, 'href="$1style.min.css"');
    modified = true;
  }

  // 4. Update main.js to main.min.js and add defer
  if (content.includes('main.js')) {
    content = content.replace(/<script src="([^"]*assets\/js\/)main\.js"><\/script>/g, '<script defer src="$1main.min.js"></script>');
    modified = true;
  }

  // 5. Add defer to bootstrap.bundle.min.js if missing
  if (content.includes('<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.3/js/bootstrap.bundle.min.js"></script>')) {
    content = content.replace(
      '<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.3/js/bootstrap.bundle.min.js"></script>',
      '<script defer src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.3/js/bootstrap.bundle.min.js"></script>'
    );
    modified = true;
  }

  // 6. Remove unused preconnect to unsplash in head (keep dns-prefetch)
  if (content.includes('<link rel="preconnect" href="https://images.unsplash.com" crossorigin>')) {
    content = content.replace(/<link rel="preconnect" href="https:\/\/images\.unsplash\.com" crossorigin>\s*/g, '');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Optimized: ${path.relative(__dirname, filePath)}`);
  }
});
