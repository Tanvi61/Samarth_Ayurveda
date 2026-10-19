const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const files = [
  { name: 'index.html', page: 'home' },
  { name: 'about.html', page: 'about' },
  { name: 'products.html', page: 'products' },
  { name: 'contact.html', page: 'contact' },
  { name: 'orders.html', page: 'orders' }
];

files.forEach(({ name, page }) => {
  const filePath = path.join(rootDir, name);
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract head
  const headMatch = content.match(/<head>([\s\S]*?)<\/head>/i);
  if (!headMatch) {
    console.error(`Could not find <head> in ${name}`);
    return;
  }
  const headContent = headMatch[1];

  // Extract main content
  const mainMatch = content.match(/<main id="mainContent"[^>]*>([\s\S]*?)<\/main>/i);
  let mainInner = '';
  if (mainMatch) {
    mainInner = mainMatch[1].trim();
  }

  const cleanHtml = `<!DOCTYPE html>
<html lang="en">
<head>${headContent}</head>
<body data-page="${page}">

  <div class="page-wrapper">
    <!-- Unified Dynamic Layout Header Root (Single Source of Truth in src/js/layout.js) -->
    <div id="siteHeaderRoot"></div>

    <!-- MAIN CONTENT AREA -->
    <main id="mainContent" class="main-content">
${mainInner}
    </main>

    <!-- Unified Dynamic Layout Footer Root (Single Source of Truth in src/js/footer.js) -->
    <div id="siteFooterRoot"></div>
  </div>

  <!-- Unified Dynamic Layout Modals & Floating Root (Single Source of Truth in src/js/layout.js) -->
  <div id="siteModalsRoot"></div>

  <!-- Application Bootstrap -->
  <script type="module" src="./src/js/app.js"></script>
</body>
</html>
`;

  fs.writeFileSync(filePath, cleanHtml, 'utf8');
  console.log(`Refactored ${name} successfully! New size: ${cleanHtml.length} chars (was ${content.length})`);
});
