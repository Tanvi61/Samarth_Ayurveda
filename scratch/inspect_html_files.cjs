const fs = require('fs');

const files = ['index.html', 'about.html', 'products.html', 'contact.html', 'orders.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasSubheader = content.includes('id="siteSubheader"');
  const hasMarquee = content.includes('class="sona-alert-marquee"');
  const hasHeader = content.includes('id="siteHeader"');
  const hasFooterRoot = content.includes('id="siteFooterRoot"');
  const hasFooterInside = content.includes('id="siteFooter"');
  const hasModals = content.includes('id="enquiryModal"');
  const hasFloating = content.includes('id="floatingActionGroup"');
  const mainMatch = content.match(/<main id="mainContent"[^>]*>([\s\S]*?)<\/main>/);
  console.log(f, {
    totalLength: content.length,
    hasSubheader,
    hasMarquee,
    hasHeader,
    hasFooterRoot,
    hasFooterInside,
    hasModals,
    hasFloating,
    mainLength: mainMatch ? mainMatch[1].length : 0
  });
});
