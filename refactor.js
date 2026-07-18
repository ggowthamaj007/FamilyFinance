const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, 'assets', 'js', 'app.js');
const sourceCode = fs.readFileSync(appJsPath, 'utf8');

// Find all function declarations
const functionRegex = /^async function (\w+)|^function (\w+)/gm;
let match;
const allFunctions = [];

while ((match = functionRegex.exec(sourceCode)) !== null) {
    const fnName = match[1] || match[2];
    allFunctions.push(fnName);
}

// Generate the window exposure block
let windowExports = '\n\n// ==========================================\n// GLOBAL EXPORTS FOR ES MODULE COMPATIBILITY\n// ==========================================\n';
allFunctions.forEach(fn => {
    windowExports += `window.${fn} = ${fn};\n`;
});

// Write to the end of app.js
fs.appendFileSync(appJsPath, windowExports);
console.log("Successfully prepared app.js for ES Module transition by exposing globals. Functions exported: " + allFunctions.length);
