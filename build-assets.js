const fs = require('fs');
const path = require('path');

function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\r?\n|\r|\t/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

function minifyJS(js) {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('//')) return '';
      return line;
    })
    .join('\n')
    .replace(/\r?\n\s*\r?\n/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

const dir = __dirname;
const cssPath = path.join(dir, 'assets', 'css', 'style.css');
const minCssPath = path.join(dir, 'assets', 'css', 'style.min.css');
const jsPath = path.join(dir, 'assets', 'js', 'main.js');
const minJsPath = path.join(dir, 'assets', 'js', 'main.min.js');

const css = fs.readFileSync(cssPath, 'utf8');
const minCss = minifyCSS(css);
fs.writeFileSync(minCssPath, minCss, 'utf8');
console.log('style.min.css written, size:', minCss.length);

const js = fs.readFileSync(jsPath, 'utf8');
const minJs = minifyJS(js);
fs.writeFileSync(minJsPath, minJs, 'utf8');
console.log('main.min.js written, size:', minJs.length);
