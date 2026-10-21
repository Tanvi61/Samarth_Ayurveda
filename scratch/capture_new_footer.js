import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\ddb18d62-8562-44ea-8444-cc25833678f9';

async function captureNewFooter() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,1100']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1100 });
  await page.goto('http://localhost:5173/index.html', { waitUntil: 'networkidle2', timeout: 30000 });

  // Scroll to footer
  await page.evaluate(() => {
    const footer = document.querySelector('.site-footer');
    if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'start' });
  });

  await new Promise(r => setTimeout(r, 1200));

  const footerEl = await page.$('.site-footer');
  if (footerEl) {
    await footerEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'new_authentic_footer.png')
    });
  }

  // Also capture the main grid area specifically
  const gridEl = await page.$('.footer-main-grid');
  if (gridEl) {
    await gridEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'new_footer_grid.png')
    });
  }

  // Also test responsive at 900px
  await page.setViewport({ width: 900, height: 1100 });
  await new Promise(r => setTimeout(r, 500));
  if (footerEl) {
    await footerEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'new_footer_tablet.png')
    });
  }

  // Also test mobile at 390px
  await page.setViewport({ width: 390, height: 1100 });
  await new Promise(r => setTimeout(r, 500));
  if (footerEl) {
    await footerEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'new_footer_mobile.png')
    });
  }

  await browser.close();
  console.log('Finished capturing all footer screenshots!');
}

captureNewFooter().catch(console.error);
