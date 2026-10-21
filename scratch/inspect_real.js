import puppeteer from 'file:///e:/MindAxis/Samarth_Ayurveda/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\ddb18d62-8562-44ea-8444-cc25833678f9';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false, // see real browser
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err));

  await page.goto('http://localhost:5173/terms.html', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 3000));

  // Inspect iframe
  const frames = page.frames();
  console.log('Total frames:', frames.length);
  for (const f of frames) {
    console.log('Frame URL:', f.url());
    try {
      const content = await f.content();
      if (content.includes('error') || content.includes('Error')) {
        console.log('Frame contains error:', content.substring(0, 500));
      }
    } catch(e) {}
  }

  // Check footer layout
  const footerBox = await page.evaluate(() => {
    const el = document.querySelector('.site-footer');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const mapEmbed = document.querySelector('.footer-map-embed');
    const mapRect = mapEmbed ? mapEmbed.getBoundingClientRect() : null;
    return { rect, mapRect };
  });
  console.log('Footer dimensions:', footerBox);

  await page.screenshot({ path: `${ARTIFACT_DIR}/terms_real_render.png`, fullPage: false });
  await browser.close();
})();
