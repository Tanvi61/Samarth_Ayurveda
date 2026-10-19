import puppeteer from 'file:///e:/MindAxis/Samarth_Ayurveda/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testEnquirySubmit() {
  console.log('--- Starting Quick Enquiry Send Message Test ---');
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
        interceptedRequest = {
          url: req.url(),
          method: req.method(),
          headers: req.headers(),
          postData: rawBody ? JSON.parse(rawBody) : null
        };
        req.respond({
          status: 200,
          headers: { 'Access-Control-Allow-Origin': '*' },
          contentType: 'application/json',
          body: JSON.stringify({ success: "true", message: "Enquiry submitted successfully." })
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

    await page.goto('http://localhost:5173/products.html', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    // Open quick enquiry modal via trigger or window call
    await page.evaluate(() => {
      if (window.openEnquiryModal) {
        window.openEnquiryModal('Herbal Hair Oil 200ml');
      } else {
        const modal = document.getElementById('enquiryModal');
        if (modal) modal.classList.add('is-open');
      }
    });
    await new Promise(r => setTimeout(r, 600));

    // Fill enquiry form
    await page.type('#enquiryFullName', 'Rahul Sharma');
    await page.type('#enquiryEmail', 'rahul@example.com');
    await page.type('#enquiryPhone', '9123456780');
    await page.type('#enquiryAddress', 'Katraj, Pune 411046');
    await page.type('#enquirySubject', 'Bulk Order Quotation');
    await page.type('#enquiryMessage', 'Requesting pricing and delivery schedule for 50 bottles of Herbal Hair Oil.');

    // Extract captcha code
    const captchaCode = await page.evaluate(() => {
      const display = document.getElementById('enquiryCaptchaDisplay');
      return display ? display.innerText.replace(/\s+/g, '') : '';
    });
    console.log('Extracted Enquiry Captcha Code:', captchaCode);
    await page.type('#enquiryCaptchaInput', captchaCode);

    // Click reCAPTCHA checkbox
    await page.click('#enquiryRecaptchaClickArea');
    await new Promise(r => setTimeout(r, 600));

    // Click submit enquiry button
    console.log('Clicking Submit Enquiry button (#enquirySubmitBtn)...');
    await page.click('#enquirySubmitBtn');
    await new Promise(r => setTimeout(r, 1200));

    if (!interceptedRequest) {
      throw new Error('FAILED: FormSubmit request was NOT intercepted for Quick Enquiry modal!');
    }

    console.log('\n--- VERIFICATION OF ENQUIRY DISPATCHED PAYLOAD ---');
    console.log('Target URL:', interceptedRequest.url);
    console.log('Subject:', interceptedRequest.postData._subject);
    console.log('Approval Status:', interceptedRequest.postData['Approval Status']);
    console.log('Product Selected:', interceptedRequest.postData['Product Selected']);
    console.log('Customer Full Name:', interceptedRequest.postData['Customer Name']);
    console.log('\nStructured Message For Approval:\n', interceptedRequest.postData['Structured Approval Summary']);

    console.log('Dialog received:', dialogMessage);
    if (dialogMessage === 'Enquiry sent successfully!') {
      console.log('✓ Verified: Enquiry dialog displays ONLY "Enquiry sent successfully!"');
    } else {
      throw new Error(`Expected dialog "Enquiry sent successfully!" but got "${dialogMessage}"`);
    }

    console.log('\nALL ENQUIRY VERIFICATION TESTS PASSED SUCCESSFULLY! ✓');
  } finally {
    await browser.close();
  }
}

testEnquirySubmit().catch(err => {
  console.error('Enquiry test error:', err);
  process.exit(1);
});
