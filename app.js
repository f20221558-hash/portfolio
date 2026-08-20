/**
 * Swapnil Jacob - Product Manager Portfolio
 * Interactive Experience Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScrollSpy();
  initMetricCounters();
  initRecruiterLens();
  initCaseStudyModals();
  initClipboardActions();
  initContactForm();
  initLiveEditMode();
  initMobileMenu();
});

/* ==========================================================================
   1. NAVBAR SCROLL SPY & ADAPTIVE GLASS CONTRAST
   ========================================================================== */
function initNavbarScrollSpy() {
  const header = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const darkSection = document.querySelector('.dark-canvas-section');

  const sections = [
    { id: 'hero', nav: 'home' },
    { id: 'services', nav: 'services' },
    { id: 'experience', nav: 'experience' },
    { id: 'projects', nav: 'projects' },
    { id: 'skills', nav: 'skills' },
    { id: 'leadership', nav: 'leadership' },
    { id: 'contact', nav: 'contact' }
  ];

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 200;

    // Check if scrolled into dark section to adjust pill color contrast
    if (darkSection) {
      const darkTop = darkSection.offsetTop;
      if (window.scrollY >= darkTop - 100) {
        header.classList.add('scrolled-dark');
      } else {
        header.classList.remove('scrolled-dark');
      }
    }

    // Active link highlighting
    sections.forEach(({ id, nav }) => {
      const elem = document.getElementById(id);
      if (elem) {
        const top = elem.offsetTop;
        const height = elem.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            if (link.getAttribute('data-nav') === nav) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      }
    });
  });
}

/* ==========================================================================
   2. INTERACTIVE METRIC NUMBER COUNTERS
   ========================================================================== */
function initMetricCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1500;
          const start = 0;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * target);

            counter.textContent = currentVal.toLocaleString();

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toLocaleString();
            }
          }
          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.getElementById('metricsStrip');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* ==========================================================================
   3. RECRUITER LENS / ROLE FILTER SWITCHER
   ========================================================================== */
function initRecruiterLens() {
  const lensButtons = document.querySelectorAll('.lens-btn');
  const filterableCards = document.querySelectorAll('[data-category]');

  lensButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      lensButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedLens = btn.getAttribute('data-lens');

      filterableCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        
        if (selectedLens === 'all') {
          card.style.opacity = '1';
          card.style.transform = 'none';
          card.style.borderColor = '';
        } else if (categories.includes(selectedLens)) {
          card.style.opacity = '1';
          card.style.borderColor = 'rgba(255, 94, 30, 0.6)';
          card.style.transform = 'scale(1.02)';
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          card.style.opacity = '0.35';
          card.style.transform = 'scale(0.98)';
          card.style.borderColor = 'rgba(255, 255, 255, 0.05)';
        }
      });

      showToast(`Recruiter Lens: ${btn.textContent.trim()} activated`);
    });
  });
}

/* ==========================================================================
   4. CASE STUDY MODAL DEEP-DIVES
   ========================================================================== */
const CASE_STUDIES = {
  gig_workers: {
    tag: "FinTech & Gig Economy • Product Discovery",
    title: "Financial Management App for Indian Gig Workers",
    stats: [
      { val: "40+", lbl: "Delivery Partners Interviewed" },
      { val: "₹3-4/L", lbl: "Estimated Fuel Savings" },
      { val: "Tier-1", lbl: "PhonePe & Microsoft Validated" }
    ],
    content: `
      <h4 class="modal-section-title">The Problem & Market Need</h4>
      <p class="modal-body-text">
        India's 8M+ gig delivery workers (Swiggy, Zomato, Zepto, Blinkit, Uber) operate on paper-thin daily cashflow margins. Rising fuel price volatility consumes <strong>30–40% of daily gross earnings</strong>. Traditional banking apps fail to provide instant liquidity, micro-savings, or fuel-specific merchant discounts.
      </p>

      <h4 class="modal-section-title">Discovery & On-Ground User Research</h4>
      <p class="modal-body-text">
        Conducted 1-on-1 interviews with <strong>40+ delivery partners and auto/cab drivers</strong> across Bangalore and Goa. Key user insights uncovered:
      </p>
      <ul style="color:var(--text-light-secondary); padding-left:1.5rem; margin-bottom:1rem; font-size:0.95rem; line-height:1.7;">
        <li>Workers make 2-3 small fuel fill-ups per day (₹150–300 each) due to lack of lump-sum cash.</li>
        <li>High desire for automated fuel cashbacks and a single tap wallet to withdraw daily earnings.</li>
        <li>Existing broker/banking apps had confusing UI terminology with high cognitive load.</li>
      </ul>

      <h4 class="modal-section-title">Product Solution & Feature Architecture</h4>
      <p class="modal-body-text">
        Designed an end-to-end mobile financial companion built around three core pillars:
      </p>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; margin:1.5rem 0;">
        <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:1rem; border-radius:12px;">
          <h5 style="color:var(--accent-orange); font-size:0.95rem; margin-bottom:0.4rem;">1. Co-branded Fuel Card</h5>
          <p style="color:var(--text-light-secondary); font-size:0.85rem;">RuPay linked debit card with auto-applied ₹2–3/litre discounts at HPCL & IOCL fuel stations.</p>
        </div>
        <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:1rem; border-radius:12px;">
          <h5 style="color:var(--accent-cyan); font-size:0.95rem; margin-bottom:0.4rem;">2. Daily Earnings Auto-Sync</h5>
          <p style="color:var(--text-light-secondary); font-size:0.85rem;">Integration with gig partner APIs to reflect real-time daily payouts and single-click instant withdraw.</p>
        </div>
        <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:1rem; border-radius:12px;">
          <h5 style="color:var(--accent-emerald); font-size:0.95rem; margin-bottom:0.4rem;">3. Micro-Emergency Buffer</h5>
          <p style="color:var(--text-light-secondary); font-size:0.85rem;">Zero-interest daily fuel credit buffer (up to ₹500) repaid automatically from next shift earnings.</p>
        </div>
      </div>

      <h4 class="modal-section-title">Validation & Leadership Feedback</h4>
      <p class="modal-body-text">
        Presented the PRD, wireframes, and unit economics model to Senior Product Leaders from <strong>PhonePe</strong> and <strong>Microsoft</strong>. Commended for user empathy, rigorous unit economics at the station level, and clarity in go-to-market execution.
      </p>
    `
  },
  5paisa_wallet: {
    tag: "FinTech & WealthTech • Information Architecture",
    title: "5Paisa Investment Wallet & Ledger Redesign",
    stats: [
      { val: "70%", lbl: "Discoverability Improvement" },
      { val: "40%", lbl: "Time-to-Trace Reduction" },
      { val: "10+", lbl: "Brokerages Benchmarked" }
    ],
    content: `
      <h4 class="modal-section-title">Context & Challenge</h4>
      <p class="modal-body-text">
        During 5Paisa’s comprehensive mobile app overhaul, retail investors and active traders experienced confusion when trying to locate and understand transaction deductions, MTF interest, brokerage charges, and multi-asset funds movement.
      </p>

      <h4 class="modal-section-title">Competitive Benchmarking</h4>
      <p class="modal-body-text">
        Benchmarked <strong>10+ leading Indian and global investment platforms</strong> (Zerodha, Groww, Angel One, Robinhood) to dissect how top brokers communicate settlement cycles (T+1), ledger balances, and pending withdrawals.
      </p>

      <h4 class="modal-section-title">Key Architectural Interventions</h4>
      <ul style="color:var(--text-light-secondary); padding-left:1.5rem; margin-bottom:1rem; font-size:0.95rem; line-height:1.7;">
        <li><strong>Unified Funds Ledger:</strong> Consolidated separate trading, equity, and F&O balance sheets into a single, intuitive balance card.</li>
        <li><strong>8+ Dynamic Filter Taxonomies:</strong> Built smart categorizations for F&O margin calls, MTF charges, tax withholdings, bank transfers, and dividends.</li>
        <li><strong>Interactive Rupee Breakdown:</strong> Visual progress bar showing Available Balance vs Blocked Margin vs Pending Clearing.</li>
      </ul>

      <h4 class="modal-section-title">Measured Outcomes</h4>
      <p class="modal-body-text">
        - <strong>70% increase in transaction discoverability</strong> across user test sessions.<br>
        - <strong>40% reduction in time taken</strong> to locate specific charge deductions.<br>
        - Significant drop in customer support inquiries regarding ambiguous fee deductions.
      </p>
    `
  },
  netflix_sql: {
    tag: "Data Modeling & SQL • Consumer Streaming",
    title: "Netflix Content Strategy & Regional Data Analytics",
    stats: [
      { val: "8,000+", lbl: "Records Analyzed" },
      { val: "15%", lbl: "Targeting Strategy Lift" },
      { val: "50+", lbl: "Complex Queries Formulated" }
    ],
    content: `
      <h4 class="modal-section-title">Objective & Data Pipeline</h4>
      <p class="modal-body-text">
        Performed comprehensive exploratory data analysis on 8,000+ Netflix movies and TV shows to uncover release timing anomalies, duration trends, country-specific catalog biases, and audience maturity segmentations.
      </p>

      <h4 class="modal-section-title">Key SQL Insights</h4>
      <ul style="color:var(--text-light-secondary); padding-left:1.5rem; margin-bottom:1rem; font-size:0.95rem; line-height:1.7;">
        <li>Identified optimal release windows for international drama vs comedy series, maximizing weekend viewership retention.</li>
        <li>Uncovered catalog gaps in regional language content within emerging Asian markets.</li>
        <li>Analyzed director and cast collaboration frequency to inform IP acquisition recommendations.</li>
      </ul>

      <h4 class="modal-section-title">Strategic PM Recommendations</h4>
      <p class="modal-body-text">
        Formulated a data-backed catalog strategy presentation that delivered a <strong>15% improvement in audience targeting accuracy</strong> and streamlined regional content scheduling.
      </p>
    `
  },
  powerbi_dashboard: {
    tag: "Business Intelligence • Executive Decision Systems",
    title: "PowerBI Commercial Sales & Performance Automation",
    stats: [
      { val: "₹4.38L+", lbl: "Sales Volume Analyzed" },
      { val: "500", lbl: "Orders & 336 Customers" },
      { val: "80%", lbl: "Manual Reporting Reduction" }
    ],
    content: `
      <h4 class="modal-section-title">Problem Statement</h4>
      <p class="modal-body-text">
        Sales and regional operations teams spent 15+ hours weekly compiling manual spreadsheet reports, resulting in slow decision response to regional sales shifts and category margins.
      </p>

      <h4 class="modal-section-title">Dashboard Architecture & DAX Measures</h4>
      <p class="modal-body-text">
        Engineered an automated end-to-end Power BI report connected to live transactional data. Key features built:
      </p>
      <ul style="color:var(--text-light-secondary); padding-left:1.5rem; margin-bottom:1rem; font-size:0.95rem; line-height:1.7;">
        <li>Identified <strong>Maharashtra (₹1.02L)</strong> as the top revenue state and <strong>Electronics (₹1.66L)</strong> as the highest-grossing category.</li>
        <li>Custom DAX measures for Year-over-Year growth, customer acquisition cost vs lifetime value, and regional profit margins.</li>
        <li>Automated alert triggers when regional profit margins fall below 18%.</li>
      </ul>

      <h4 class="modal-section-title">Business Impact</h4>
      <p class="modal-body-text">
        Saved <strong>80% of weekly manual reporting time</strong>, empowering commercial leadership to make same-day inventory allocations.
      </p>
    `
  }
};

function initCaseStudyModals() {
  const modal = document.getElementById('caseStudyModal');
  const modalBody = document.getElementById('modalDynamicBody');
  const closeBtn = document.getElementById('modalCloseBtn');
  const triggers = document.querySelectorAll('.btn-open-case-study');

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const caseKey = btn.getAttribute('data-case');
      const data = CASE_STUDIES[caseKey];
      if (!data) return;

      modalBody.innerHTML = `
        <div class="modal-header-tag">${data.tag}</div>
        <h2 class="modal-title">${data.title}</h2>

        <div class="modal-grid-stats">
          ${data.stats.map(s => `
            <div class="modal-stat-box">
              <div class="modal-stat-value">${s.val}</div>
              <div class="modal-stat-label">${s.lbl}</div>
            </div>
          `).join('')}
        </div>

        <div class="modal-content-details">
          ${data.content}
        </div>
      `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. CLIPBOARD ACTIONS & TOAST
   ========================================================================== */
function initClipboardActions() {
  const copyButtons = document.querySelectorAll('[data-copy]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`);
        btn.textContent = 'Copied! ✓';
        setTimeout(() => {
          btn.textContent = 'Copy';
        }, 2000);
      }).catch(() => {
        showToast('Unable to copy, please select manually.');
      });
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toastNotice');
  const msgElem = document.getElementById('toastMessage');
  if (!toast || !msgElem) return;

  msgElem.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   6. CONTACT FORM INTERACTION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const msg = document.getElementById('senderMessage').value;

    // Trigger mailto link for direct sending
    const subject = encodeURIComponent(`PM Opportunity / Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
    const mailtoUrl = `mailto:f20221558@goa.bits-pilani.ac.in?subject=${subject}&body=${body}`;

    showToast(`Thank you ${name}! Opening mail client...`);
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 800);

    form.reset();
  });
}

/* ==========================================================================
   7. LIVE IN-BROWSER EDIT MODE (Swapnil Live Customizer)
   ========================================================================== */
function initLiveEditMode() {
  const toggleBtn = document.getElementById('editModeToggle');
  const label = document.getElementById('editModeLabel');
  let isEditMode = false;

  // Restore saved edits from localStorage if available
  const savedData = localStorage.getItem('swapnil_portfolio_edits');
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      Object.keys(parsed).forEach(key => {
        const el = document.querySelector(`[data-editable="${key}"]`);
        if (el) el.innerHTML = parsed[key];
      });
    } catch (e) {
      console.warn('Could not load cached edits', e);
    }
  }

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    isEditMode = !isEditMode;
    const editableElements = document.querySelectorAll('[data-editable]');

    if (isEditMode) {
      label.textContent = 'Save Edits';
      toggleBtn.style.background = 'var(--accent-orange)';
      showToast('✏️ Edit Mode ON: Click any text with dashed border to edit live!');

      editableElements.forEach(el => {
        el.contentEditable = 'true';
      });
    } else {
      label.textContent = 'Edit Mode';
      toggleBtn.style.background = '';
      
      // Save all edited fields to localStorage
      const edits = {};
      editableElements.forEach(el => {
        el.contentEditable = 'false';
        const key = el.getAttribute('data-editable');
        if (key) edits[key] = el.innerHTML;
      });

      localStorage.setItem('swapnil_portfolio_edits', JSON.stringify(edits));
      showToast('💾 All changes saved to your browser storage!');
    }
  });
}

/* ==========================================================================
   8. MOBILE MENU DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggle || !drawer) return;

  toggle.addEventListener('click', () => {
    drawer.classList.toggle('active');
  });

  links.forEach(l => {
    l.addEventListener('click', () => {
      drawer.classList.remove('active');
    });
  });
}
