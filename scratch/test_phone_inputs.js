import puppeteer from 'file:///e:/MindAxis/Samarth_Ayurveda/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testAllPhoneInputs() {
  console.log('--- Testing Phone Number Inputs Across All Forms ---');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // 1. CONTACT PAGE PHONE INPUT
    console.log('\n[1/3] Testing Contact Page Phone Field (#contactPhone)...');
    await page.goto('http://localhost:5173/contact.html', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    // Test typing standard 10 digits
    await page.type('#contactPhone', '9876543210');
    let val1 = await page.$eval('#contactPhone', el => el.value);
    console.log('  Standard 10 digits entered:', val1);
    if (val1 !== '9876543210') throw new Error(`Expected '9876543210' but got '${val1}'`);

    // Test typing with +91
    await page.$eval('#contactPhone', el => el.value = '');
    await page.type('#contactPhone', '+91 9876543210');
    let val2 = await page.$eval('#contactPhone', el => el.value);
    console.log('  Phone with +91 entered:', val2);
    if (val2 !== '9876543210') throw new Error(`Expected '9876543210' for +91 but got '${val2}'`);

    // Test typing with 0 prefix
    await page.$eval('#contactPhone', el => el.value = '');
    await page.type('#contactPhone', '09876543210');
    let val3 = await page.$eval('#contactPhone', el => el.value);
    console.log('  Phone with leading 0 entered:', val3);
    if (val3 !== '9876543210') throw new Error(`Expected '9876543210' for leading 0 but got '${val3}'`);

    console.log('✓ Contact phone field accepts and normalizes all input variations perfectly!');

    // 2. QUICK ENQUIRY MODAL PHONE INPUT
    console.log('\n[2/3] Testing Quick Enquiry Modal Phone Field (#enquiryPhone)...');
    await page.evaluate(() => {
      if (window.openEnquiryModal) window.openEnquiryModal('Herbal Hair Oil 200ml');
    });
    await new Promise(r => setTimeout(r, 600));

    await page.type('#enquiryPhone', '+91 9123456780');
    let valEnquiry = await page.$eval('#enquiryPhone', el => el.value);
    console.log('  Enquiry phone with +91 entered:', valEnquiry);
    if (valEnquiry !== '9123456780') throw new Error(`Expected '9123456780' but got '${valEnquiry}'`);
    console.log('✓ Quick Enquiry phone field normalizes perfectly!');

    // 3. MY ORDERS PAGE PHONE INPUT
    console.log('\n[3/3] Testing My Orders Mobile Input (#ordersMobileInput)...');
    await page.goto('http://localhost:5173/orders.html', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    await page.type('#ordersMobileInput', '+91 9988776655');
    let valOrders = await page.$eval('#ordersMobileInput', el => el.value);
    console.log('  Orders phone with +91 entered:', valOrders);
    if (valOrders !== '9988776655') throw new Error(`Expected '9988776655' but got '${valOrders}'`);
    console.log('✓ My Orders mobile input normalizes perfectly!');

    console.log('\nALL PHONE NUMBER TESTS PASSED SUCCESSFULLY! ✓');
  } finally {
    await browser.close();
  }
}

testAllPhoneInputs().catch(err => {
  console.error('Phone test error:', err);
  process.exit(1);
});
