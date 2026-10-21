import puppeteer from 'file:///e:/MindAxis/Samarth_Ayurveda/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\ddb18d62-8562-44ea-8444-cc25833678f9';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleLogs = [];
  const errors = [];
  page.on('console', msg => consoleLogs.push({ type: msg.type(), text: msg.text() }));
  page.on('pageerror', err => errors.push(err.toString()));

  await page.goto('http://localhost:5173/terms.html', { waitUntil: 'networkidle2' });

  console.log('--- CONSOLE LOGS ---');
  console.log(consoleLogs);
  console.log('--- ERRORS ---');
  console.log(errors);

  // Take screenshot of whole page and footer
  await page.screenshot({ path: `${ARTIFACT_DIR}/terms_inspection_full.png`, fullPage: true });

  const footer = await page.$('.site-footer');
  if (footer) {
    await footer.screenshot({ path: `${ARTIFACT_DIR}/terms_inspection_footer.png` });
    console.log('Footer screenshot saved');
  } else {
    console.log('NO FOOTER FOUND!');
  }

  // Also check footer HTML and errors
  const footerContent = await page.evaluate(() => {
    const f = document.querySelector('.site-footer');
    return f ? { outerHTML: f.outerHTML.substring(0, 500), innerText: f.innerText.substring(0, 500) } : null;
  });
  console.log('--- FOOTER CONTENT ---', footerContent);

  await browser.close();
})();
