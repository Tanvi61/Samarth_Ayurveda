/**
 * Samarth Ayurveda / Sonaherbal.com - Authentic Footer Component
 * Matches original design from reference screenshot:
 * - Newsletter section: "Subscribe for updates, tips & exclusive offer", pill email input with black circle button
 * - Col 1: Main Menu (Home, Our Products, Contact, My Orders)
 * - Col 2: Get Help (Contact Information, Legal Notice, Privacy Policy, Refund Policy, Shipping Policy, Terms of Service, Track Order)
 * - Col 3: Follow Us on Instagram (3 Reels video cards with badges + @sonaliwaghmode8669)
 * - Col 4: Our Location & Integrated Google Map (Map preview + View On Google Maps + Google review badge + Socials)
 * - Bottom Bar: "© 2026 Sonaherbal.com, Powered by Shopify | Samarth Ayurveda" + Language Selector
 */

export function renderFooter(containerEl) {
  if (!containerEl) return;

  const currentYear = new Date().getFullYear();

  containerEl.innerHTML = `
    <footer class="site-footer" id="siteFooter">
      <div class="footer-container">
        <!-- Top Newsletter Row (Exact match to screenshot) -->
        <div class="footer-newsletter-wrap">
          <div class="footer-newsletter-info">
            <h2 class="footer-newsletter-title">Subscribe for updates,<br />tips &amp; exclusive offer</h2>
          </div>
          <div class="footer-newsletter-form-wrap">
            <form class="footer-newsletter-form" id="footerNewsletterForm">
              <div class="footer-newsletter-pill">
                <input class="footer-newsletter-input" id="footerEmailInput" type="email" placeholder="Enter your email" required autocomplete="email" />
                <button class="footer-newsletter-btn" type="submit" aria-label="Subscribe to newsletter">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M7.5 4.5L13 10L7.5 15.5"/>
                  </svg>
                </button>
              </div>
              <p class="footer-newsletter-disclaimer">
                By subscribing you agree to the <a href="terms.html">Terms of Use</a> &amp; <a href="privacy.html">Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>

        <!-- Main Footer Columns Grid -->
        <div class="footer-main-grid">
          <!-- Col 1: Main Menu -->
          <div class="footer-col footer-col-menu">
            <h3 class="footer-col-title">Main Menu</h3>
            <ul class="footer-links-list">
              <li><a class="footer-link" href="index.html" data-route="home">Home</a></li>
              <li><a class="footer-link" href="products.html" data-route="products">Our Products</a></li>
              <li><a class="footer-link" href="contact.html" data-route="contact">Contact</a></li>
              <li><a class="footer-link track-order-trigger" href="orders.html" data-route="orders">My Orders</a></li>
            </ul>
          </div>

          <!-- Col 2: Get Help -->
          <div class="footer-col footer-col-help">
            <h3 class="footer-col-title">Get Help</h3>
            <ul class="footer-links-list">
              <li><a class="footer-link" href="contact.html" data-route="contact" data-policy="contact">Contact Information</a></li>
              <li><a class="footer-link" href="#" data-policy="legal">Legal Notice</a></li>
              <li><a class="footer-link" href="privacy.html">Privacy Policy</a></li>
              <li><a class="footer-link" href="#" data-policy="refund">Refund Policy</a></li>
              <li><a class="footer-link" href="#" data-policy="shipping">Shipping Policy</a></li>
              <li><a class="footer-link" href="terms.html">Terms of Service</a></li>
              <li><a class="footer-link track-order-trigger" href="orders.html" data-route="orders">Track Order</a></li>
              <li><a class="footer-link" href="tel:+919325260725">Call Us: +91 93252 60725</a></li>
            </ul>
          </div>

          <!-- Col 3: Follow Us on Instagram (3 Video Reels Cards + Handle) -->
          <div class="footer-col footer-col-instagram">
            <h3 class="footer-col-title">Follow Us on Instagram</h3>
            <div class="footer-videos-grid">
              <!-- Video 1: Sonali at desk (matches leftmost card in screenshot) -->
              <div class="footer-video-card" data-video-index="0" data-video-src="https://sonaherbal.com/cdn/shop/videos/c/vp/ee67f6c7414d4a67b6b0e024f94b362e/ee67f6c7414d4a67b6b0e024f94b362e.HD-1080p-2.5Mbps-88431833.mp4?v=0">
                <img src="/images/reel-thumb-3.png" onerror="this.onerror=null;this.src='https://sonaherbal.com/cdn/shop/files/Screenshot_2026-07-07_010758.png?v=1783366724&width=180';" alt="Sonali Waghmode Instagram Reel 1" class="footer-video-thumb" loading="lazy" />
                <video class="footer-video-player" loop muted playsinline preload="none">
                  <source src="https://sonaherbal.com/cdn/shop/videos/c/vp/ee67f6c7414d4a67b6b0e024f94b362e/ee67f6c7414d4a67b6b0e024f94b362e.HD-1080p-2.5Mbps-88431833.mp4?v=0" type="video/mp4" />
                </video>
                <div class="footer-video-badge" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="3" width="20" height="18" rx="4" />
                    <polygon points="10 8 16 12 10 16 10 8" fill="white" stroke="none" />
                  </svg>
                </div>
              </div>

              <!-- Video 2: Aloe vera processing (matches middle card in screenshot) -->
              <div class="footer-video-card" data-video-index="1" data-video-src="https://sonaherbal.com/cdn/shop/videos/c/vp/1882b996a88f4d22acf136c07ad65fdb/1882b996a88f4d22acf136c07ad65fdb.HD-1080p-2.5Mbps-88431651.mp4?v=0">
                <img src="/images/reel-thumb-1.png" onerror="this.onerror=null;this.src='https://sonaherbal.com/cdn/shop/files/Screenshot_2026-07-07_010814.png?v=1783366724&width=180';" alt="Sonali Waghmode Instagram Reel 2" class="footer-video-thumb" loading="lazy" />
                <video class="footer-video-player" loop muted playsinline preload="none">
                  <source src="https://sonaherbal.com/cdn/shop/videos/c/vp/1882b996a88f4d22acf136c07ad65fdb/1882b996a88f4d22acf136c07ad65fdb.HD-1080p-2.5Mbps-88431651.mp4?v=0" type="video/mp4" />
                </video>
                <div class="footer-video-badge" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="3" width="20" height="18" rx="4" />
                    <polygon points="10 8 16 12 10 16 10 8" fill="white" stroke="none" />
                  </svg>
                </div>
              </div>

              <!-- Video 3: Sona Herbal Bottle (matches rightmost card in screenshot) -->
              <div class="footer-video-card" data-video-index="2" data-video-src="https://sonaherbal.com/cdn/shop/videos/c/vp/2a3ef42cc7304f108b8504ff78e606f1/2a3ef42cc7304f108b8504ff78e606f1.HD-1080p-2.5Mbps-88431650.mp4?v=0">
                <img src="/images/reel-thumb-2.png" onerror="this.onerror=null;this.src='https://sonaherbal.com/cdn/shop/files/Screenshot_2026-07-07_010739.png?v=1783366724&width=180';" alt="Sonali Waghmode Instagram Reel 3" class="footer-video-thumb" loading="lazy" />
                <video class="footer-video-player" loop muted playsinline preload="none">
                  <source src="https://sonaherbal.com/cdn/shop/videos/c/vp/2a3ef42cc7304f108b8504ff78e606f1/2a3ef42cc7304f108b8504ff78e606f1.HD-1080p-2.5Mbps-88431650.mp4?v=0" type="video/mp4" />
                </video>
                <div class="footer-video-badge" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="3" width="20" height="18" rx="4" />
                    <polygon points="10 8 16 12 10 16 10 8" fill="white" stroke="none" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Instagram Handle -->
            <div class="footer-ig-handle-wrap">
              <a href="https://www.instagram.com/sonaliwaghmode8669/" target="_blank" rel="noopener noreferrer" class="footer-ig-handle">@sonaliwaghmode8669</a>
            </div>
          </div>

          <!-- Col 4: Integrated Location & Map Embed -->
          <div class="footer-col footer-col-map">
            <h3 class="footer-col-title">Our Location</h3>
            <p class="footer-map-address">📍 Katraj-Pune, Maharashtra 411046</p>
            <div class="footer-map-action">
              <div class="footer-map-embed">
                <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=73.8400%2C18.4400%2C73.8800%2C18.4700&amp;layer=mapnik&amp;marker=18.4529%2C73.8567" width="100%" height="100%" style="border:0; display:block;" loading="eager" title="Katraj Pune Location Map"></iframe>
              </div>
              <a href="https://maps.google.com/?q=Katraj+Pune+Maharashtra+411046" target="_blank" rel="noopener noreferrer" class="footer-map-btn">
                <span>View On Google Maps ↗</span>
              </a>
              <a href="tel:+919325260725" class="footer-map-btn footer-call-btn" aria-label="Call Samarth Ayurveda">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.053 15.053 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1.01A11.36 11.36 0 018.57 3.9c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.52c0-.55-.45-1-1-1z"/>
                </svg>
                <span>Call: +91 93252 60725</span>
              </a>
            </div>

            <!-- Google Review Badge & Link (QA Check Item 4, 12, 16, 28) -->
            <div class="footer-google-review-wrap" style="margin-top: 14px;">
              <a href="https://maps.google.com/?q=Samarth+Ayurveda" target="_blank" rel="noopener noreferrer" class="footer-google-review-btn">
                <span class="google-icon-svg">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </span>
                <span class="google-review-text">
                  <strong>Review Us On Google</strong>
                  <span class="stars-gold">★★★★★ 4.9/5 Rating</span>
                </span>
              </a>
            </div>

            <!-- Social Media Icons (Open in New Tab) -->
            <div class="footer-social-row" style="margin-top: 10px;">
              <a href="https://www.facebook.com/sonaherbal" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/sonaliwaghmode8669/" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://wa.me/919325260725?text=Hello%20Ayurveda" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Bottom Copyright & Localization Bar (Matches screenshot layout) -->
        <div class="footer-bottom-bar footer-bottom-bar-centered">
          <div class="footer-copyright">
            <p>© ${currentYear} <strong>Sonaherbal.com</strong>, Powered by Shopify | <strong>Samarth Ayurveda</strong>. All Rights Reserved.</p>
          </div>
          <div class="footer-localization-wrap">
            <select class="footer-lang-select" aria-label="Language selector">
              <option value="en">English (IN)</option>
              <option value="mr">मराठी</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  `;

  // Attach Video Hover and Click Listeners
  const videoCards = containerEl.querySelectorAll('.footer-video-card');
  videoCards.forEach(card => {
    const video = card.querySelector('.footer-video-player');
    card.addEventListener('mouseenter', () => {
      if (video) {
        video.play().catch(() => {});
      }
    });
    card.addEventListener('mouseleave', () => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    card.addEventListener('click', () => {
      window.open('https://www.instagram.com/sonaliwaghmode8669/', '_blank', 'noopener,noreferrer');
    });
  });

  // Newsletter form submission handling
  const form = containerEl.querySelector('#footerNewsletterForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('#footerEmailInput');
      if (input && input.value) {
        alert('Thank you for subscribing to Sona Herbal & Samarth Ayurveda!');
        input.value = '';
      }
    });
  }
}
