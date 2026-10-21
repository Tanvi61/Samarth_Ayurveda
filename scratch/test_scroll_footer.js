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

  await page.goto('http://localhost:5173/terms.html', { waitUntil: 'networkidle2' });

  // Scroll into view
  await page.evaluate(() => {
    const f = document.querySelector('.site-footer');
    if (f) f.scrollIntoView();
  });

  // Wait 3 seconds for tiles
  await new Promise(r => setTimeout(r, 3000));

  const footer = await page.$('.site-footer');
  if (footer) {
    await footer.screenshot({ path: `${ARTIFACT_DIR}/terms_scrolled_footer.png` });
  }

  await browser.close();
  console.log('Saved terms_scrolled_footer.png');
})();
