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
  await page.setViewport({ width: 300, height: 180 });

  const osmUrl = 'https://www.openstreetmap.org/export/embed.html?bbox=73.8400%2C18.4400%2C73.8800%2C18.4700&layer=mapnik&marker=18.4529%2C73.8567';
  await page.goto(osmUrl, { waitUntil: 'networkidle2' });

  await page.screenshot({ path: `${ARTIFACT_DIR}/osm_embed_test.png` });
  console.log('Saved osm_embed_test.png');
  await browser.close();
})();
