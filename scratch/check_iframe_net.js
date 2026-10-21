import puppeteer from 'file:///e:/MindAxis/Samarth_Ayurveda/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  page.on('response', res => {
    if (res.url().includes('openstreetmap') || res.url().includes('google')) {
      console.log('RES:', res.status(), res.url().substring(0, 80));
    }
  });

  await page.goto('http://localhost:5173/terms.html', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 4000));

  const frameInfo = await page.evaluate(() => {
    const iframe = document.querySelector('.footer-map-embed iframe');
    if (!iframe) return 'no iframe';
    return {
      src: iframe.src,
      width: iframe.offsetWidth,
      height: iframe.offsetHeight
    };
  });
  console.log('Frame info:', frameInfo);

  await browser.close();
})();
