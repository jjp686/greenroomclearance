/**
 * GREEN ROOM CLEARANCE — INTERACTIVE CLIENT SCRIPTS
 * Dynamic process stepper, interactive scope selector, sticky nav & validation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Bar & Scroll Spy
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy: highlight active nav item
    let currentSection = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(sec => {
      const secTop = sec.offsetTop;
      const secHeight = sec.offsetHeight;
      if (scrollPos >= secTop && scrollPos < secTop + secHeight) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // ==========================================================================
  // 2. Interactive "How It Works" 5-Step Process Switcher
  // ==========================================================================
  const stepData = {
    1: {
      badge: "Phase 01 of 05",
      title: "Initial Discussion",
      desc: "Reach out with details of your surplus stock, approximate quantities, and location. We review your requirements and provide an initial appraisal within 24 hours.",
      highlight: "Free Consultation & Appraisal",
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
      checklist: [
        "Quick overview of equipment types & quantities",
        "Discussion of collection timeframes and location",
        "Prompt response within 24 business hours"
      ]
    },
    2: {
      badge: "Phase 02 of 05",
      title: "Site Visit (if required)",
      desc: "For larger clearances or complex AV decommissionings across Bournemouth, Christchurch and Poole, we carry out a convenient on-site walk-through to audit the inventory.",
      highlight: "On-Site BCP Inventory Audit",
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
      checklist: [
        "Physical inspection of boardroom & workplace tech",
        "Logistical access review (loading bays, lifts, parking)",
        "Zero disruption planning for active workplaces"
      ]
    },
    3: {
      badge: "Phase 03 of 05",
      title: "Equipment Assessment",
      desc: "Every item is systematically checked, tested, and graded based on current secondary commercial market demand and residual value recovery potential.",
      highlight: "Systematic Testing & Valuation",
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
      checklist: [
        "Comprehensive model, serial, and condition logging",
        "Realistic market valuation and return estimate",
        "Transparent proposal with zero hidden surprises"
      ]
    },
    4: {
      badge: "Phase 04 of 05",
      title: "Collection and Clearance",
      desc: "Our insured team coordinates the physical pack-down and removal on your preferred schedule—ensuring prompt removal without interrupting your daily business operations.",
      highlight: "Insured & Seamless Logistics",
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>`,
      checklist: [
        "Careful disconnection, de-rigging, and protective packing",
        "Flexible scheduling (including out-of-hours if needed)",
        "Tidy, courteous departure with premises left clean"
      ]
    },
    5: {
      badge: "Phase 05 of 05",
      title: "Resale and Value Recovery",
      desc: "We remarket your equipment through vetted commercial and circular economy channels, returning recovered financial value to you while preventing needless electronic waste.",
      highlight: "Value Return & Circular Reuse",
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>`,
      checklist: [
        "Responsible remarketing to maximize financial return",
        "Ethical circular economy ethos: extending equipment lifecycle",
        "Clear financial settlement and reporting"
      ]
    }
  };

  const stepNavBtns = document.querySelectorAll('.step-nav-btn');
  const stepIndicatorText = document.getElementById('step-indicator-text');
  const stepTitleText = document.getElementById('step-title-text');
  const stepDescText = document.getElementById('step-desc-text');
  const stepChecklistItems = document.getElementById('step-checklist-items');
  const stepIconContainer = document.getElementById('step-icon-container');
  const stepHighlightText = document.getElementById('step-highlight-text');
  const stepCardDisplay = document.getElementById('step-card-display');

  function renderStep(stepNumber) {
    const data = stepData[stepNumber];
    if (!data) return;

    // Visual fade transition
    stepCardDisplay.style.opacity = '0.3';
    stepCardDisplay.style.transform = 'translateY(6px)';
    stepCardDisplay.style.transition = 'all 0.2s ease';

    setTimeout(() => {
      stepIndicatorText.textContent = data.badge;
      stepTitleText.textContent = data.title;
      stepDescText.textContent = data.desc;
      stepHighlightText.textContent = data.highlight;
      stepIconContainer.innerHTML = data.iconSvg;

      stepChecklistItems.innerHTML = data.checklist.map(item => `
        <li>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${item}</span>
        </li>
      `).join('');

      stepCardDisplay.style.opacity = '1';
      stepCardDisplay.style.transform = 'translateY(0)';
    }, 180);

    // Update active tab button
    stepNavBtns.forEach(btn => {
      if (btn.getAttribute('data-step') === String(stepNumber)) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });
  }

  stepNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const step = btn.getAttribute('data-step');
      renderStep(step);
    });
  });

  // ==========================================================================
  // 3. Interactive Equipment Scope Selector (Form Pills)
  // ==========================================================================
  const scopePills = document.querySelectorAll('.scope-pill-btn');
  const subjectInput = document.getElementById('form-subject');

  scopePills.forEach(pill => {
    pill.addEventListener('click', () => {
      scopePills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      
      const scopeType = pill.getAttribute('data-scope');
      if (subjectInput && !subjectInput.value.trim()) {
        subjectInput.value = `Surplus Clearance: ${scopeType}`;
      }
    });
  });

  // ==========================================================================
  // 4. Form Handling, Honeypot & Confirmation Modal
  // ==========================================================================
  const form = document.getElementById('clearance-enquiry-form');
  const submitBtn = document.getElementById('form-submit-btn');
  const submissionModal = document.getElementById('submission-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Check honeypot anti-spam
      const honeypot = document.getElementById('form-honeypot');
      if (honeypot && honeypot.value !== '') {
        console.warn('Spam detected via honeypot.');
        return;
      }

      // Basic HTML5 validation check
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // UI Loading state
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="1"></path>
        </svg>
        <span>Sending Enquiry...</span>
      `;

      // Simulate instantaneous graceful server dispatch
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Show thank you modal
        if (submissionModal) {
          submissionModal.classList.add('active');
        }
        form.reset();
        
        // Reset first scope pill
        scopePills.forEach((p, idx) => {
          if (idx === 0) p.classList.add('selected');
          else p.classList.remove('selected');
        });
      }, 700);
    });
  }

  if (modalCloseBtn && submissionModal) {
    modalCloseBtn.addEventListener('click', () => {
      submissionModal.classList.remove('active');
    });

    submissionModal.addEventListener('click', (e) => {
      if (e.target === submissionModal) {
        submissionModal.classList.remove('active');
      }
    });
  }
});

// Subtle keyframe animation for button spinner
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
