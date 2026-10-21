import puppeteer from 'file:///e:/MindAxis/Samarth_Ayurveda/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
import path from 'path';

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

  const errors = [];
  page.on('pageerror', err => errors.push(err.toString()));

  // 1. TERMS PAGE
  await page.goto('http://localhost:5173/terms.html', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // Top viewport screenshot (to compare directly with user screenshot)
  await page.screenshot({ path: `${ARTIFACT_DIR}/terms_new_top.png` });

  // Footer screenshot
  const termsFooter = await page.$('.site-footer');
  if (termsFooter) {
    await termsFooter.screenshot({ path: `${ARTIFACT_DIR}/terms_new_footer.png` });
  }

  // 2. PRIVACY PAGE
  await page.goto('http://localhost:5173/privacy.html', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // Top viewport screenshot
  await page.screenshot({ path: `${ARTIFACT_DIR}/privacy_new_top.png` });

  // 3. HOME PAGE FOOTER
  await page.goto('http://localhost:5173/index.html', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  const homeFooter = await page.$('.site-footer');
  if (homeFooter) {
    await homeFooter.screenshot({ path: `${ARTIFACT_DIR}/home_new_footer.png` });
  }

  console.log('Errors encountered:', errors);
  console.log('Screenshots saved successfully!');
  await browser.close();
})();
