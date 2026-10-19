import fs from 'fs';

const indexPath = 'e:/MindAxis/Samarth_Ayurveda/index.html';
let indexHtml = fs.readFileSync(indexPath, 'utf8');

const mainHtml = fs.readFileSync('e:/MindAxis/Samarth_Ayurveda/scratch/extracted_main.html', 'utf8');
const footerHtml = fs.readFileSync('e:/MindAxis/Samarth_Ayurveda/scratch/extracted_footer.html', 'utf8');

// Replace empty main
const mainRegex = /<main id="mainContent" class="main-content">[\s\S]*?<\/main>/;
indexHtml = indexHtml.replace(mainRegex, `<main id="mainContent" class="main-content">\n${mainHtml}\n    </main>`);

// Replace empty footer
const footerRegex = /<div id="siteFooterRoot"><\/div>/;
indexHtml = indexHtml.replace(footerRegex, `<div id="siteFooterRoot">\n${footerHtml}\n    </div>`);

fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('Successfully pre-rendered home view into index.html');
