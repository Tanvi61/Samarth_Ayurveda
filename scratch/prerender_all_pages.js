import fs from 'fs';
import puppeteer from 'file:///e:/MindAxis/Samarth_Ayurveda/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';

const pages = [
  { url: 'http://localhost:5173/contact.html', file: 'e:/MindAxis/Samarth_Ayurveda/contact.html' },
  { url: 'http://localhost:5173/about.html', file: 'e:/MindAxis/Samarth_Ayurveda/about.html' },
  { url: 'http://localhost:5173/products.html', file: 'e:/MindAxis/Samarth_Ayurveda/products.html' },
  { url: 'http://localhost:5173/orders.html', file: 'e:/MindAxis/Samarth_Ayurveda/orders.html' }
];

async function prerenderAll() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  for (const p of pages) {
    console.log('Fetching', p.url);
    await page.goto(p.url, { waitUntil: 'networkidle2' });
    const mainHtml = await page.evaluate(() => document.getElementById('mainContent')?.innerHTML || '');
    const footerHtml = await page.evaluate(() => document.getElementById('siteFooterRoot')?.innerHTML || '');

    if (!mainHtml) {
      console.warn('Warning: No mainHtml for', p.file);
      continue;
    }

    let fileContent = fs.readFileSync(p.file, 'utf8');

    // Replace mainContent
    const mainRegex = /<main id="mainContent" class="main-content">[\s\S]*?<\/main>/;
    fileContent = fileContent.replace(mainRegex, `<main id="mainContent" class="main-content">\n${mainHtml}\n    </main>`);

    // Replace siteFooterRoot
    const footerRegex = /<div id="siteFooterRoot">[\s\S]*?<\/div>/;
    fileContent = fileContent.replace(footerRegex, `<div id="siteFooterRoot">\n${footerHtml}\n    </div>`);

    fs.writeFileSync(p.file, fileContent, 'utf8');
    console.log('Pre-rendered', p.file, '(main length:', mainHtml.length, ')');
  }

  await browser.close();
}

prerenderAll().catch(console.error);
