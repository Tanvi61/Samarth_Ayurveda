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

  // 1. Check contact.html button and icon
  await page.goto('http://localhost:5173/contact.html', { waitUntil: 'networkidle2' });
  const contactBtn = await page.$('#contactSubmitBtn');
  if (contactBtn) {
    await contactBtn.screenshot({ path: `${ARTIFACT_DIR}/verified_wa_submit_btn.png` });
  }

  // 2. Check terms.html bottom area (footer + anything below)
  await page.goto('http://localhost:5173/terms.html', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await new Promise(r => setTimeout(r, 1200));

  // Take screenshot of the bottom 600px of the page
  await page.screenshot({ path: `${ARTIFACT_DIR}/terms_bottom_clean.png` });

  // Inspect what elements exist after #siteFooterRoot
  const belowFooterElements = await page.evaluate(() => {
    const footer = document.getElementById('siteFooterRoot') || document.querySelector('.site-footer');
    if (!footer) return 'No footer';
    const modalsRoot = document.getElementById('siteModalsRoot');
    return {
      modalsRootChildren: modalsRoot ? Array.from(modalsRoot.children).map(c => ({ tag: c.tagName, id: c.id, className: c.className, display: window.getComputedStyle(c).display })) : null,
      pageWrapperChildren: Array.from(document.querySelector('.page-wrapper').children).map(c => ({ tag: c.tagName, id: c.id, className: c.className })),
      bodyTextAfterFooter: document.body.innerText.split('All Rights Reserved.')[1] || ''
    };
  });
  console.log('Below footer elements:', JSON.stringify(belowFooterElements, null, 2));

  // 3. Check privacy.html bottom area
  await page.goto('http://localhost:5173/privacy.html', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: `${ARTIFACT_DIR}/privacy_bottom_clean.png` });

  await browser.close();
  console.log('Verification completed!');
})();
