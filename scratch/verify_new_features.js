import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\ddb18d62-8562-44ea-8444-cc25833678f9';

async function testAllNewFeatures() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,1100']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1100 });

  // 1. Test contact.html
  console.log('Testing contact.html...');
  await page.goto('http://localhost:5173/contact.html', { waitUntil: 'networkidle2' });

  const btnText = await page.evaluate(() => {
    const btn = document.getElementById('contactSubmitBtn');
    return {
      text: btn?.innerText.trim(),
      hasSvg: !!btn?.querySelector('svg'),
      hasWaIcon: !!btn?.querySelector('.contact-whatsapp-icon'),
      classes: btn?.className
    };
  });
  console.log('Contact Submit Button:', btnText);

  // Take screenshot of contact form
  const contactFormEl = await page.$('.contact-form-column') || await page.$('#contactForm');
  if (contactFormEl) {
    await contactFormEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'contact_whatsapp_button.png')
    });
  }

  // 2. Test footer call button & policy links
  console.log('Testing footer call button and policy links...');
  const footerDetails = await page.evaluate(() => {
    const callBtn = document.querySelector('.footer-call-btn');
    const termsLink = document.querySelector('a[href="terms.html"]');
    const privacyLink = document.querySelector('a[href="privacy.html"]');
    return {
      hasCallBtn: !!callBtn,
      callHref: callBtn?.getAttribute('href'),
      callText: callBtn?.innerText.trim(),
      hasTermsLink: !!termsLink,
      hasPrivacyLink: !!privacyLink
    };
  });
  console.log('Footer details:', footerDetails);

  // Take screenshot of footer map column with Call button
  const footerMapCol = await page.$('.footer-col-map');
  if (footerMapCol) {
    await footerMapCol.screenshot({
      path: path.join(ARTIFACT_DIR, 'footer_call_button.png')
    });
  }

  // 3. Test terms.html
  console.log('Testing terms.html...');
  await page.goto('http://localhost:5173/terms.html', { waitUntil: 'networkidle2' });
  const termsTitle = await page.$eval('.policy-hero-title', el => el.innerText.trim());
  console.log('Terms page title:', termsTitle);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'terms_page.png')
  });

  // 4. Test privacy.html
  console.log('Testing privacy.html...');
  await page.goto('http://localhost:5173/privacy.html', { waitUntil: 'networkidle2' });
  const privacyTitle = await page.$eval('.policy-hero-title', el => el.innerText.trim());
  console.log('Privacy page title:', privacyTitle);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'privacy_page.png')
  });

  await browser.close();
  console.log('All tests completed successfully!');
}

testAllNewFeatures().catch(console.error);
