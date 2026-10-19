const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testContactLive() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  let dialogMessage = null;
  page.on('dialog', async (dialog) => {
    dialogMessage = dialog.message();
    console.log('[Dialog Triggered]:', dialogMessage);
    await dialog.accept();
  });

  console.log('Navigating to http://localhost:5173/contact.html...');
  await page.goto('http://localhost:5173/contact.html', { waitUntil: 'networkidle2' });

  // Fill in the form fields
  await page.type('#contactFullName', 'Ramesh Patil');
  await page.type('#contactEmail', 'ramesh@example.com');
  await page.type('#contactPhone', '9876543210');
  await page.type('#contactAddress', 'Katraj, Pune, Maharashtra 411046');
  await page.type('#contactSubject', 'Ayurvedic Hair Growth Consultation');
  await page.type('#contactMessage', 'Hello Tanvi, please provide details on authentic homemade hair oil packs.');

  // Extract Captcha Code
  const captchaText = await page.evaluate(() => {
    return document.getElementById('contactCaptchaDisplay')?.innerText.replace(/\s+/g, '') || '';
  });
  console.log('Extracted Captcha Code:', captchaText);
  await page.type('#contactCaptchaInput', captchaText);

  // Check reCAPTCHA
  await page.click('#contactRecaptchaClickArea');
  await new Promise(r => setTimeout(r, 600));

  console.log('Submitting Contact Form (#contactSubmitBtn)...');
  await page.click('#contactSubmitBtn');

  // Wait for submission completion
  await new Promise(r => setTimeout(r, 2500));

  console.log('Final Dialog Message:', dialogMessage);
  console.log('Current URL (Ensure no error page navigation):', page.url());

  if (page.url().includes('formsubmit.co')) {
    throw new Error('FAILED: Browser was redirected to formsubmit.co error page!');
  }

  if (dialogMessage !== 'Message sent successfully!') {
    throw new Error(`FAILED: Expected "Message sent successfully!" but got: ${dialogMessage}`);
  }

  console.log('✓ SUCCESS: Form submitted cleanly! Message sent to tanvideshmukh6104@gmail.com with NO error page!');
  await browser.close();
}

testContactLive().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
