import fs from 'fs';

async function fetchAndSave(url, filename) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    // look for shopify-policy__container or main content
    const match = html.match(/<div class="shopify-policy__container"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i) ||
                  html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    if (match) {
      fs.writeFileSync(filename, match[0]);
      console.log('Saved', filename, match[0].length);
    } else {
      // Find where body starts
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyMatch) {
        fs.writeFileSync(filename, bodyMatch[0]);
        console.log('Saved body to', filename, bodyMatch[0].length);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

async function run() {
  await fetchAndSave('https://sonaherbal.com/policies/terms-of-service', 'scratch/sona_terms.html');
  await fetchAndSave('https://sonaherbal.com/policies/privacy-policy', 'scratch/sona_privacy.html');
}

run();
