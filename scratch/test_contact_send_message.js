import puppeteer from 'file:///e:/MindAxis/Samarth_Ayurveda/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testSendMessage() {
  console.log('--- Starting Contact Send Message Test ---');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    let interceptedRequest = null;
    await page.setRequestInterception(true);
    page.on('request', req => {
      if (req.url().includes('formsubmit.co/ajax/tanvideshmukh6104@gmail.com')) {
        if (req.method() === 'OPTIONS') {
          console.log('[Puppeteer] Responding to OPTIONS preflight');
          req.respond({
            status: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Accept'
            }
          });
          return;
        }

        const rawBody = req.postData();
        console.log('[Puppeteer] Intercepted FormSubmit POST request. Body length:', rawBody ? rawBody.length : 0);
        let parsed = null;
        try {
          parsed = rawBody ? JSON.parse(rawBody) : null;
        } catch (e) {
          console.error('Parse error:', e);
        }
        interceptedRequest = {
          url: req.url(),
          method: req.method(),
          headers: req.headers(),
          postData: parsed,
          rawBody: rawBody
        };
        // Respond with mock success so test does not rely on internet connectivity or rate limits
        req.respond({
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          contentType: 'application/json',
          body: JSON.stringify({ success: "true", message: "Form submitted successfully." })
        });
        return;
      }
      req.continue();
    });

    let dialogMessage = null;
    page.on('dialog', async dialog => {
      dialogMessage = dialog.message();
      console.log('[Puppeteer] Dialog popped up:', dialogMessage);
      await dialog.accept();
    });

    console.log('Navigating to http://localhost:5173/contact.html...');
    await page.goto('http://localhost:5173/contact.html', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    // Fill form fields
    await page.type('#contactFullName', 'Tanvi Deshmukh');
    await page.type('#contactEmail', 'tanvideshmukh6104@gmail.com');
    await page.type('#contactPhone', '9876543210');
    await page.type('#contactSubject', 'Natural Haircare Consultation Request');
    await page.type('#contactAddress', 'Pune, Maharashtra 411046');
    await page.type('#contactMessage', 'I would like to request an Ayurvedic consultation for natural herbal haircare products.');

    // Extract captcha code
    const captchaCode = await page.evaluate(() => {
      const display = document.getElementById('contactCaptchaDisplay');
      return display ? display.innerText.replace(/\s+/g, '') : '';
    });
    console.log('Extracted Captcha Code:', captchaCode);
    await page.type('#contactCaptchaInput', captchaCode);

    // Click reCAPTCHA checkbox
    await page.click('#contactRecaptchaClickArea');
    await new Promise(r => setTimeout(r, 600));

    // Verify verified state
    const isChecked = await page.evaluate(() => {
      return document.getElementById('contactRecaptchaCheckbox')?.classList.contains('checked');
    });
    console.log('reCAPTCHA Checked state:', isChecked);

    // Click Send Message button
    console.log('Clicking Send Message button (#contactSubmitBtn)...');
    await page.click('#contactSubmitBtn');

    // Wait for button state or fetch completion
    await new Promise(r => setTimeout(r, 1200));

    if (!interceptedRequest) {
      throw new Error('FAILED: FormSubmit request was NOT intercepted!');
    }

    console.log('\n--- VERIFICATION OF DISPATCHED PAYLOAD ---');
    console.log('Target URL:', interceptedRequest.url);
    console.log('Subject:', interceptedRequest.postData._subject);
    console.log('Approval Status:', interceptedRequest.postData['Approval Status']);
    console.log('Customer Full Name:', interceptedRequest.postData['Customer Full Name']);
    console.log('Email Address:', interceptedRequest.postData['Email Address']);
    console.log('Phone Number:', interceptedRequest.postData['Phone Number']);
    console.log('Address & City:', interceptedRequest.postData['Address & City']);
    console.log('Customer Message:', interceptedRequest.postData['Customer Message']);
    console.log('\nStructured Message For Approval:\n', interceptedRequest.postData['Structured Approval Summary']);

    console.log('Dialog received:', dialogMessage);
    if (dialogMessage === 'Message sent successfully!') {
      console.log('✓ Verified: Dialog displays ONLY the simple message "Message sent successfully!" with no private email or info!');
    } else {
      throw new Error(`Expected dialog "Message sent successfully!" but got "${dialogMessage}"`);
    }

    console.log('\nALL VERIFICATION TESTS PASSED SUCCESSFULLY! ✓');
  } finally {
    await browser.close();
  }
}

testSendMessage().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
