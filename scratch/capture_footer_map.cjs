const puppeteer = require('puppeteer');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\ddb18d62-8562-44ea-8444-cc25833678f9';

async function captureFooterMap() {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  } catch (err) {
    // try with explicit chrome path
    browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/contact.html', { waitUntil: 'networkidle0', timeout: 30000 });

  // Scroll to footer
  await page.evaluate(() => {
    const el = document.querySelector('.footer-map-action') || document.querySelector('.footer-col-contact');
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
    await contactCol.screenshot({
      path: path.join(ARTIFACT_DIR, 'footer_contact_col.png')
    });
  }

  // Also full page bottom
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'contact_page_footer.png')
  });

  await browser.close();
  console.log('Captured screenshots successfully!');
}

captureFooterMap().catch(console.error);
