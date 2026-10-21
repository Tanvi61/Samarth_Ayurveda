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
  await page.setViewport({ width: 600, height: 400 });

  // Test map URL
  const testUrl = 'https://maps.google.com/maps?q=Katraj,+Pune,+Maharashtra+411046&t=&z=14&ie=UTF8&iwloc=&output=embed';
  await page.goto(testUrl, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  await page.screenshot({ path: `${ARTIFACT_DIR}/google_map_embed_test.png` });
  console.log('Saved google_map_embed_test.png');
  await browser.close();
})();
