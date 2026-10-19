import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\ddb18d62-8562-44ea-8444-cc25833678f9';

async function captureFooterMap() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/contact.html', { waitUntil: 'networkidle2', timeout: 30000 });

  // Scroll to footer contact column
  await page.evaluate(() => {
    const el = document.querySelector('.footer-col-contact') || document.querySelector('.footer-map-action');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });

  await new Promise(r => setTimeout(r, 1000));

  const mapActionEl = await page.$('.footer-map-action');
  if (mapActionEl) {
    const box = await mapActionEl.boundingBox();
    console.log('footer-map-action bounding box:', box);
    await mapActionEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'footer_map_action.png')
    });
  } else {
    console.log('.footer-map-action not found!');
  }

  const contactCol = await page.$('.footer-col-contact');
  if (contactCol) {
    const box = await contactCol.boundingBox();
    console.log('footer-col-contact bounding box:', box);
    await contactCol.screenshot({
      path: path.join(ARTIFACT_DIR, 'footer_contact_col.png')
    });
  }

  // Get exact rendered dimensions of map embed vs map btn
  const dims = await page.evaluate(() => {
    const embed = document.querySelector('.footer-map-embed');
    const btn = document.querySelector('.footer-map-btn');
    const action = document.querySelector('.footer-map-action');
    return {
      embed: embed ? { width: embed.offsetWidth, height: embed.offsetHeight, radius: getComputedStyle(embed).borderRadius } : null,
      btn: btn ? { width: btn.offsetWidth, height: btn.offsetHeight, radius: getComputedStyle(btn).borderRadius } : null,
      action: action ? { width: action.offsetWidth, height: action.offsetHeight } : null
    };
  });
  console.log('DIMENSIONS:', JSON.stringify(dims, null, 2));

  await browser.close();
  console.log('Done capturing!');
}

captureFooterMap().catch(console.error);
