/* ═══════════════════════════════════════════════════════════════
   TONMOY PORTFOLIO — IMMERSIVE ANIMATION ENGINE
   GSAP + ScrollTrigger + Lenis + SplitType
   Cinematic scroll-driven experience with horizontal gallery,
   kinetic typography, magnetic buttons, and custom cursor.

   Admin panel logic preserved from original codebase.
   ═══════════════════════════════════════════════════════════════ */

/* ── DEFAULT DATA — source of truth for reset ── */
const DEFAULT_DATA = {
  hero: {
    name: "Md. Al Imran Tonmoy",
    titles: [
      "Project Coordinator",
      "ERP Specialist",
      "System Analyst",
      "Odoo Certified Leader",
      "CS Graduate",
      "Health Informatics Enthusiast"
    ],
    tagline: "I turn business chaos into structured systems — and sometimes into code.",
    cta1: "View My Work",
    cta2: "Download CV",
    cvUrl: "#"
  },
  about: {
    title: "Who I Am",
    paragraphs: [
      "I'm a Junior Project Coordinator at ATI Limited in Dhaka, where I manage end-to-end delivery of enterprise ERP, HRM, and Hospital Information System implementations across pharma, manufacturing, and healthcare sectors.",
      "I sit at the intersection of business logic and technology — writing FRDs and RTMs by day, debugging Python scripts and building agentic AI workflows by night. A certified Odoo Project Leader with a BSc in CSE from IUBAT (CGPA 3.73).",
      "Currently heading toward a Master's abroad, with research interests in Health Informatics and Clinical AI — the natural next chapter of my HIS field experience."
    ],
    interests: [
      "Enterprise Software", "Clinical AI", "Health Informatics", "Odoo ERP",
      "Python & SQL", "Dota 2", "Bangladeshi Cinema", "Group Travel",
      "Skincare", "System Design", "Process Diagramming", "REST APIs"
    ]
  },
  skills: [
    {
      category: "Project & Business",
      chips: [
        "Project Coordination", "Requirements Engineering", "FRD / BRD",
        "RTM", "Process Diagramming", "Stakeholder Management",
        "SOP Writing", "PMO Documentation", "Meeting Facilitation"
      ]
    },
    {
      category: "Technical Stack",
      chips: [
        "Python", "SQL", "JavaScript", "Node.js", "REST APIs",
        "Odoo", "ERP Implementation", "HRM Systems", "HIS Systems", "Agentic AI Coding"
      ]
    },
    {
      category: "Tools & Platforms",
      chips: [
        "Jira", "Excel (Advanced)", "Lucidchart", "VS Code",
        "Postman", "Shopify", "draw.io", "Git"
      ]
    },
    {
      category: "Soft Skills",
      chips: [
        "Cross-functional Communication", "Client-facing Delivery",
        "Enterprise Documentation", "Rapid Prototyping", "Multi-party Coordination"
      ]
    }
  ],
  experience: [
    {
      period: "2024 – Present",
      role: "Junior Project Coordinator",
      company: "ATI Limited, Dhaka, Bangladesh",
      bullets: [
        "Delivered ERP, HRM, and HIS modules for Drug International Ltd, Pharmik Group, KYAMCH, Harnest, and Jamuna Oil Company",
        "Authored enterprise-grade documentation: FRDs, RTMs, SOPs, meeting minutes, and project closure reports",
        "Managed the DIL HRM & Payroll system implementation including Leave Policy, Final Settlement, and Payroll Reconciliation modules",
        "Coordinated multi-party Odoo implementations (client, vendor, in-house team) as certified Odoo Project Leader",
        "Contributed hands-on code to system development using agentic AI workflows and automation"
      ]
    }
  ],
  projects: [
    {
      title: "DIL HRM & Payroll System",
      desc: "Enterprise HRM implementation for Drug International Limited. Delivered FRDs for Final Settlement, Leave Policy, Payroll Reconciliation, and Role-Based Access modules.",
      tags: ["HRM", "Payroll", "Enterprise", "FRD"]
    },
    {
      title: "KYAMCH Online Appointment System",
      desc: "Hospital Information System implementation for Khwaja Yunus Ali Medical College & Hospital. Led requirements gathering, documentation, and project closure reporting.",
      tags: ["HIS", "Healthcare", "Project Closure"]
    },
    {
      title: "Pharmik ERP",
      desc: "ERP issue consolidation and Accounts module setup flow documentation for Pharmik Group across multiple business verticals.",
      tags: ["ERP", "Pharma", "Accounts"]
    },
    {
      title: "ORDISS – Bangladesh Army",
      desc: "Developed a digital information system for the Bangladesh Army as the primary deliverable of BSc CSE final year project.",
      tags: ["Government", "System Design", "BSc"]
    },
    {
      title: "Vino Medical Center Ghana – HIS",
      desc: "Hospital Information System for Vino Medical Center, Ghana. International healthcare digitization project delivering end-to-end patient management.",
      tags: ["HIS", "Ghana", "Healthcare", "International"]
    },
    {
      title: "Edge & Ivy – Shopify Catalog",
      desc: "Built a 95-product luxury womenswear Fall 2026 knitwear catalog on Shopify for a premium fashion brand launching their online presence.",
      tags: ["E-commerce", "Shopify", "Fashion", "Catalog"]
    }
  ],
  education: [
    {
      degree: "B.Sc. Computer Science & Engineering",
      school: "IUBAT — International University of Business Agriculture and Technology",
      meta: "CGPA: 3.73 | Class of 2025"
    },
    {
      degree: "Certified Odoo Project Leader",
      school: "Odoo",
      meta: "Enterprise Resource Planning Certification"
    },
    {
      degree: "IELTS",
      school: "British Council",
      meta: "Completed April 2026"
    },
    {
      degree: "Masters Applications In Progress",
      school: "TU Darmstadt · Univ. of Debrecen · JCU Australia",
      meta: "Data Science · Business Intelligence · Health Informatics"
    }
  ],
  next: [
    {
      emoji: "🎓",
      label: "APPLYING TO",
      text: "TU Darmstadt (M.Sc. CS – Data Science & Engineering), University of Debrecen (BI MSc), James Cook University Australia (confirmed offer + scholarship)"
    },
    {
      emoji: "🔬",
      label: "RESEARCH INTEREST",
      text: "Health Informatics · Clinical AI · Data Science & Engineering · Business Intelligence Systems"
    },
    {
      emoji: "💼",
      label: "OPEN TO",
      text: "Research collaborations, graduate program connections, remote project work, enterprise consulting opportunities"
    }
  ],
  contact: {
    title: "Let's Talk",
    tagline: "Whether it's a project, a collaboration, or a conversation about enterprise systems and grad school — I'm all ears.",
    email: "tonmoy.bit@gmail.com",
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourprofile"
  },
  footer: "Md. Al Imran Tonmoy · Built with dark energy & golden ambition · Dhaka, Bangladesh"
};


/* ═══════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════ */
function deepClone(o) { return JSON.parse(JSON.stringify(o)); }

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function $(id) { return document.getElementById(id); }

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* ═══════════════════════════════════════════
   DATA PERSISTENCE
   ═══════════════════════════════════════════ */
let DATA = deepClone(DEFAULT_DATA);

async function loadData() {
  try {
    const res = await fetch('/api/data');
    if (res.ok) {
      const serverData = await res.json();
      DATA = { ...deepClone(DEFAULT_DATA), ...serverData };
    } else if (res.status === 404) {
      // DB is empty — seed it with the default data so subsequent loads work
      fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(DEFAULT_DATA)
      }).catch(() => {});
    }
  } catch (e) {
    console.warn('Using default data — server unavailable.', e.message);
  }
}


/* ═══════════════════════════════════════════
   RENDER PORTFOLIO
   Populates DOM with data. Called once after
   data load, and after admin saves.
   ═══════════════════════════════════════════ */
function renderPortfolio() {
  const d = DATA;

  /* Hero Name — split last word as accent */
  const words = d.hero.name.split(' ');
  const lastWord = words.pop();
  $('hero-name-el').innerHTML =
    words.map(w => `<span class="word">${w}</span> `).join('') +
    `<span class="word accent-word">${esc(lastWord)}</span>`;

  /* Hero tagline & CTAs */
  $('hero-tagline-el').textContent = `"${d.hero.tagline}"`;
  $('hero-cta1-el').textContent = d.hero.cta1;
  $('hero-cta2-el').textContent = d.hero.cta2;
  $('hero-cta2-el').href = d.hero.cvUrl || '#';

  /* About */
  $('about-title-el').textContent = d.about.title;
  $('about-text-el').innerHTML =
    (d.about.paragraphs || []).map(p => `<p>${esc(p)}</p>`).join('');
  $('interests-el').innerHTML =
    (d.about.interests || []).map(i =>
      `<span class="interest-tag">${esc(i)}</span>`
    ).join('');

  /* Skills */
  $('skills-el').innerHTML =
    (d.skills || []).map(s => `
      <div class="skill-card tilt-card">
        <div class="card-shine"></div>
        <div class="skill-card-title">${esc(s.category)}</div>
        <div class="skill-chips">
          ${(s.chips || []).map(c => `<span class="chip">${esc(c)}</span>`).join('')}
        </div>
      </div>`).join('');

  /* Experience */
  const timelineEl = $('experience-el');
  // Keep the timeline line element
  const lineEl = timelineEl.querySelector('.timeline-line');
  const lineHTML = lineEl ? lineEl.outerHTML : '<div class="timeline-line"><div class="timeline-line-fill" id="timeline-line-fill"></div></div>';
  timelineEl.innerHTML = lineHTML +
    (d.experience || []).map(e => `
      <div class="tl-item">
        <div class="tl-dot"></div>
        <div class="tl-period">${esc(e.period)}</div>
        <div class="tl-role">${esc(e.role)}</div>
        <div class="tl-company">${esc(e.company)}</div>
        <div class="tl-desc">
          <ul>${(e.bullets || []).map(b => `<li>${esc(b)}</li>`).join('')}</ul>
        </div>
      </div>`).join('');

  /* Projects — horizontal gallery slides */
  const projectHues = [40, 200, 270, 140, 15, 320, 60, 100];
  $('projects-el').innerHTML =
    (d.projects || []).map((p, i) => `
      <div class="project-slide" style="--project-hue: ${projectHues[i % projectHues.length]}">
        <div class="project-bg"></div>
        <div class="project-number">${String(i + 1).padStart(2, '0')}</div>
        <div class="project-content">
          <div class="project-tags-top">
            ${(p.tags || []).map(t => `<span class="project-tag">${esc(t)}</span>`).join('')}
          </div>
          <h3 class="project-title">${esc(p.title)}</h3>
          <p class="project-desc">${esc(p.desc)}</p>
        </div>
      </div>`).join('');

  /* Education */
  $('education-el').innerHTML =
    (d.education || []).map(e => `
      <div class="edu-card">
        <div class="edu-degree">${esc(e.degree)}</div>
        <div class="edu-school">${esc(e.school)}</div>
        <div class="edu-meta">${esc(e.meta)}</div>
      </div>`).join('');

  /* What's Next */
  const svgIcons = {
    "🎓": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px; color: var(--accent);"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>`,
    "🔬": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px; color: var(--accent);"><path d="M6 18h8M3 22h18M14 22a7 7 0 1 0-12-5M14 14h2M14 10h4M14 6h6M12 21a2 2 0 0 0 2-2V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v16a2 2 0 0 0 2 2z"/></svg>`,
    "💼": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px; color: var(--accent);"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`
  };

  $('next-el').innerHTML =
    (d.next || []).map(n => {
      const icon = svgIcons[n.emoji] || `<span style="font-size: 1.6rem;">${n.emoji}</span>`;
      return `
      <div class="next-card tilt-card">
        <div class="card-shine"></div>
        <div class="next-icon-container" style="margin-bottom: 1.5rem; display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: 12px; background: rgba(196, 163, 90, 0.04); border: 1px solid rgba(196, 163, 90, 0.1);">
          ${icon}
        </div>
        <div class="next-label">${esc(n.label)}</div>
        <div class="next-text">${esc(n.text)}</div>
      </div>`;
    }).join('');

  /* Contact */
  $('contact-title-el').textContent = d.contact.title;
  $('contact-tagline-el').textContent = d.contact.tagline;
  $('contact-links-el').innerHTML = `
    <a class="contact-link email magnetic" href="mailto:${esc(d.contact.email)}">✉ ${esc(d.contact.email)}</a>
    <a class="contact-link social magnetic" href="${esc(d.contact.linkedin)}" target="_blank" rel="noopener">in LinkedIn</a>
    <a class="contact-link social magnetic" href="${esc(d.contact.github)}" target="_blank" rel="noopener">⌥ GitHub</a>`;

  /* Sidebar Social Links (Dynamic) */
  const sidebarLinksEl = $('sidebar-links-el');
  if (sidebarLinksEl) {
    sidebarLinksEl.innerHTML = `
      <a class="sidebar-link magnetic" href="mailto:${esc(d.contact.email)}" title="Email" aria-label="Email">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      </a>
      <a class="sidebar-link magnetic" href="${esc(d.contact.linkedin)}" target="_blank" rel="noopener" title="LinkedIn" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
      </a>
      <a class="sidebar-link magnetic" href="${esc(d.contact.github)}" target="_blank" rel="noopener" title="GitHub" aria-label="GitHub">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
      </a>
    `;
  }

  /* Footer */
  $('footer-el').textContent = d.footer;
}


/* ═══════════════════════════════════════════
   TYPEWRITER
   ═══════════════════════════════════════════ */
let twIdx = 0, twChar = 0, twDeleting = false, twTimer = null;

function typewrite() {
  const titles = DATA.hero.titles || [];
  if (!titles.length) return;
  const el = $('typewriter');
  if (!el) return;
  const cur = titles[twIdx % titles.length];

  if (!twDeleting) {
    twChar++;
    el.textContent = cur.slice(0, twChar);
    if (twChar >= cur.length) {
      twDeleting = true;
      twTimer = setTimeout(typewrite, 2200);
      return;
    }
  } else {
    twChar--;
    el.textContent = cur.slice(0, twChar);
    if (twChar === 0) {
      twDeleting = false;
      twIdx++;
      twTimer = setTimeout(typewrite, 400);
      return;
    }
  }
  twTimer = setTimeout(typewrite, twDeleting ? 40 : 80);
}


/* ═══════════════════════════════════════════
   LENIS SMOOTH SCROLL (legacy — kept for
   reduced-motion fallback path only)
   ═══════════════════════════════════════════ */
let lenis = null;

function initLenis() {
  if (prefersReducedMotion) return;

  lenis = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}


/* ═══════════════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════════════ */
function initCursor() {
  if (prefersReducedMotion || window.innerWidth < 768) return;

  const dot = $('cursor-dot');
  const follower = $('cursor-follower');
  if (!dot || !follower) return;

  const dotX = gsap.quickTo(dot, 'left', { duration: 0.15, ease: 'power3.out' });
  const dotY = gsap.quickTo(dot, 'top', { duration: 0.15, ease: 'power3.out' });
  const fX = gsap.quickTo(follower, 'left', { duration: 0.45, ease: 'power3.out' });
  const fY = gsap.quickTo(follower, 'top', { duration: 0.45, ease: 'power3.out' });

  window.addEventListener('mousemove', (e) => {
    dotX(e.clientX);
    dotY(e.clientY);
    fX(e.clientX);
    fY(e.clientY);
  });

  // Hover effects on interactive elements
  const interactives = 'a, button, .btn, .chip, .interest-tag, .project-slide, .skill-card, .edu-card, .next-card, .contact-link, input, textarea';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactives)) {
      follower.classList.add('hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactives)) {
      follower.classList.remove('hovering');
    }
  });

  document.addEventListener('mousedown', () => follower.classList.add('clicking'));
  document.addEventListener('mouseup', () => follower.classList.remove('clicking'));
}


/* ═══════════════════════════════════════════
   MAGNETIC BUTTONS
   ═══════════════════════════════════════════ */
function initMagneticButtons() {
  if (prefersReducedMotion || window.innerWidth < 768) return;

  document.querySelectorAll('.magnetic').forEach(btn => {
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      xTo(x * 0.25);
      yTo(y * 0.25);
    });

    btn.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}


/* ═══════════════════════════════════════════
   3D CARD TILT
   ═══════════════════════════════════════════ */
function initCardTilt() {
  if (prefersReducedMotion || window.innerWidth < 768) return;

  document.querySelectorAll('.tilt-card').forEach(card => {
    const shine = card.querySelector('.card-shine');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (y - 0.5) * 12;
      const tiltY = (x - 0.5) * -12;

      gsap.to(card, {
        rotateX: tiltX,
        rotateY: tiltY,
        scale: 1.02,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800,
      });

      if (shine) {
        shine.style.setProperty('--shine-x', `${x * 100}%`);
        shine.style.setProperty('--shine-y', `${y * 100}%`);
      }
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
        transformPerspective: 800,
      });
    });
  });
}


/* ═══════════════════════════════════════════
   PRELOADER
   ═══════════════════════════════════════════ */
function initPreloader(onComplete) {
  if (prefersReducedMotion) {
    const preloader = $('preloader');
    if (preloader) preloader.style.display = 'none';
    onComplete();
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      // Curtain reveal
      const revealTl = gsap.timeline({
        onComplete: () => {
          const preloader = $('preloader');
          if (preloader) preloader.style.display = 'none';
          onComplete();
        }
      });

      revealTl
        .to('#preloader-content', {
          opacity: 0,
          scale: 0.85,
          duration: 0.3,
          ease: 'power2.in',
        })
        .to('.preloader-half--top', {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
        }, 0.15)
        .to('.preloader-half--bottom', {
          yPercent: 100,
          duration: 0.9,
          ease: 'power4.inOut',
        }, 0.15);
    }
  });

  // Letter animation
  tl.to('.preloader-letter', {
    y: 0,
    opacity: 1,
    stagger: 0.06,
    duration: 0.6,
    ease: 'power3.out',
    delay: 0.3,
  });

  // Counter animation
  const counter = $('preloader-counter');
  const barFill = $('preloader-bar-fill');
  const obj = { val: 0 };

  tl.to(obj, {
    val: 100,
    duration: 1.8,
    ease: 'power2.inOut',
    onUpdate: () => {
      const v = Math.round(obj.val);
      if (counter) counter.textContent = v + '%';
      if (barFill) barFill.style.width = v + '%';
    },
  }, '-=0.3');

  // Small pause at 100
  tl.to({}, { duration: 0.3 });
}


/* ═══════════════════════════════════════════
   HERO ANIMATIONS
   ═══════════════════════════════════════════ */
function initHeroAnimations() {
  if (prefersReducedMotion) {
    gsap.set(['.hero-name .char', '.hero-name .word', '.hero-tagline', '.hero-cta', '.scroll-indicator', '.float-el', '#main-nav'], {
      opacity: 1, y: 0, x: 0, scale: 1,
    });
    $('main-nav').classList.add('visible');
    return;
  }

  const tl = gsap.timeline({ delay: 0.1 });

  // Hero name — chars reveal upward (matches the .char exit in master timeline)
  tl.from('.hero-name .char', {
    y: '110%',
    opacity: 0,
    stagger: { each: 0.025, from: 'left' },
    duration: 0.7,
    ease: 'power3.out',
  });

  // Tagline
  tl.to('.hero-tagline', {
    opacity: 0.85,
    y: 0,
    duration: 0.7,
    ease: 'power2.out',
  }, '-=0.4');

  // CTAs
  tl.to('.hero-cta', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out',
  }, '-=0.3');

  // Scroll indicator
  tl.to('#scroll-indicator', {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'power2.out',
  }, '-=0.2');

  // Floating elements
  tl.to('.float-el', {
    opacity: 1,
    stagger: 0.08,
    duration: 0.6,
    ease: 'power2.out',
  }, '-=0.5');

  // Nav
  tl.add(() => {
    $('main-nav').classList.add('visible');
  }, '-=0.3');

  // Hero scroll-away animation (only for legacy/fallback path)
  if (!SceneSystem.active) {
    gsap.to('.hero-content', {
      y: -100,
      opacity: 0,
      scale: 0.95,
      scrollTrigger: {
        trigger: '#scene-hero',
        start: 'top top',
        end: 'bottom 60%',
        scrub: 1.5,
      },
    });

    gsap.to('#scroll-indicator', {
      opacity: 0,
      y: 20,
      scrollTrigger: {
        trigger: '#scene-hero',
        start: 'top top',
        end: '15% top',
        scrub: 1,
      },
    });
  }
}


/* ═══════════════════════════════════════════
   HERO MOUSE PARALLAX (floating elements)
   Delegated to SceneSystem.initMouseTracking
   when scene system is active.
   ═══════════════════════════════════════════ */
function initHeroParallax() {
  if (SceneSystem.active) return; // scene system handles this
  if (prefersReducedMotion || window.innerWidth < 768) return;

  const floatingEls = document.querySelectorAll('.float-el');
  if (!floatingEls.length) return;

  const speeds = [0.03, 0.02, 0.04, 0.025, 0.035, 0.015, 0.03];

  const heroEl = document.querySelector('#scene-hero') || document.querySelector('.hero-section');
  if (!heroEl) return;

  heroEl.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    floatingEls.forEach((el, i) => {
      const speed = speeds[i % speeds.length] * 100;
      gsap.to(el, {
        x: dx * speed,
        y: dy * speed,
        duration: 1.2,
        ease: 'power2.out',
      });
    });
  });
}


/* ═══════════════════════════════════════════
   SPLIT TYPE INITIALIZER
   Must run after renderPortfolio() injects text.
   Re-runs after admin saves.
   ═══════════════════════════════════════════ */
function initSplitType() {
  if (typeof SplitType === 'undefined') return;

  // Hero name into chars for scatter-exit animation
  const heroName = $('hero-name-el');
  if (heroName && heroName.textContent.trim()) {
    new SplitType(heroName, { types: 'chars,words' });
  }

  // About heading chars
  const aboutTitle = $('about-title-el');
  if (aboutTitle && aboutTitle.textContent.trim()) {
    new SplitType(aboutTitle, { types: 'chars,words' });
  }

  // About paragraphs into lines for clip reveal
  const aboutText = $('about-text-el');
  if (aboutText && aboutText.textContent.trim()) {
    new SplitType(aboutText, { types: 'lines' });
  }

  // Contact heading chars
  const contactTitle = $('contact-title-el');
  if (contactTitle && contactTitle.textContent.trim()) {
    new SplitType(contactTitle, { types: 'chars,words' });
  }

  // Experience heading
  const expHeading = document.querySelector('.exp-heading');
  if (expHeading && expHeading.textContent.trim()) {
    new SplitType(expHeading, { types: 'chars,words' });
  }
}


/* ═══════════════════════════════════════════════════════════════
   SCENE SYSTEM
   Virtual scroll + fixed-viewport scene engine.
   All animations are coordinated through a single master GSAP
   timeline scrubbed by ScrollTrigger watching #scroll-container.
   ═══════════════════════════════════════════════════════════════ */
const SceneSystem = {
  active: false,
  currentScene: 0,
  scrollVH: 800,      // total phantom scroll height in vh
  lenis: null,
  masterTL: null,
  _targetProg: 0,
  _currProg: 0,
  _scrollHandler: null,
  _tickerFn: null,

  // Called from DOMContentLoaded after preloader finishes
  init() {
    if (prefersReducedMotion) {
      this.initReducedMotionFallback();
      return;
    }

    this.active = true;

    // Set mobile scroll height
    if (window.innerWidth < 768) {
      this.scrollVH = 600;
    }

    // Set phantom scroll container height (scrollVH is in vh units)
    const sc = $('scroll-container');
    if (sc) sc.style.height = this.scrollVH + 'vh';

    // All scenes start invisible except hero
    gsap.set('.scene', { opacity: 0, visibility: 'hidden' });
    gsap.set('#scene-hero', { opacity: 1, visibility: 'visible' });

    this.initLenis();
    this.initMouseTracking();
    this.initParticleCanvas();

    // Handle resize — update scroll height and recalculate progress
    let rto;
    window.addEventListener('resize', () => {
      clearTimeout(rto);
      rto = setTimeout(() => {
        if (sc) sc.style.height = this.scrollVH + 'vh';
        if (this._scrollHandler) this._scrollHandler();
        ScrollTrigger.refresh();
      }, 250);
    });
  },

  initLenis() {
    // Removed Lenis — it called preventDefault() on wheel events which silently
    // bricked scrolling when its internal raf had any issue (Edge + unpkg CDN).
    // Now using native window scroll driven by GSAP ticker in buildMasterTimeline().
    this.lenis = null;
  },

  // Maps scroll progress [0,1] → master timeline seconds (piecewise linear).
  // Allocates a fixed scroll fraction to each scene regardless of how many
  // seconds that scene occupies in the GSAP timeline.
  _progressToTime(p) {
    const dur = this.masterTL ? this.masterTL.duration() : 5.43;
    // Breakpoints land in the cross-fade zone between each pair of scenes
    // (prev scene exiting + next scene entering), so every scene's full
    // reveal→enter→hold→exit cycle falls inside its own scroll window.
    const pts = [
      [0,    0],
      [0.12, 0.45],    // hero → about
      [0.26, 1.20],    // about → projects
      [0.56, 2.58],    // projects → skills
      [0.70, 3.38],    // skills → experience
      [0.84, 4.10],    // experience → contact
      [1.00, dur],     // contact fully done
    ];
    for (let i = 1; i < pts.length; i++) {
      if (p <= pts[i][0]) {
        const [p0, t0] = pts[i - 1];
        const [p1, t1] = pts[i];
        return t0 + (p - p0) / (p1 - p0) * (t1 - t0);
      }
    }
    return dur;
  },

  // Build the master timeline and wire ScrollTrigger
  // Called inside preloader callback (after DOM is stable)
  buildMasterTimeline() {
    ScrollTrigger.getAll().forEach(st => st.kill());

    const tl = gsap.timeline({ paused: true });
    this.masterTL = tl;

    try {
      this.buildHeroScene(tl);
      this.buildAboutScene(tl);
      this.buildProjectsScene(tl);
      this.buildSkillsScene(tl);
      this.buildExperienceScene(tl);
      this.buildContactScene(tl);
    } catch (err) {
      console.error('[SceneSystem] buildMasterTimeline failed:', err);
    }

    // Clean up any previous handler/ticker from a prior buildMasterTimeline call
    if (this._scrollHandler) window.removeEventListener('scroll', this._scrollHandler);
    if (this._tickerFn) gsap.ticker.remove(this._tickerFn);
    this._targetProg = 0;
    this._currProg   = 0;

    // Drive master timeline directly from window.scrollY.
    // No Lenis, no ScrollTrigger — just native scroll + GSAP ticker lerp.
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      this._targetProg = total > 0 ? Math.min(1, window.scrollY / total) : 0;
      const nav = $('main-nav');
      if (nav) nav.classList.toggle('scrolled', this._targetProg > 0.01);

      // Derive the active scene from scroll progress. The in-timeline
      // tl.call(onSceneChange) hooks are suppressed by masterTL.seek(),
      // so we drive nav highlight + per-scene mouse parallax from here.
      const p = this._targetProg;
      const idx = p < 0.12 ? 0 : p < 0.26 ? 1 : p < 0.56 ? 2 : p < 0.70 ? 3 : p < 0.84 ? 4 : 5;
      if (idx !== this.currentScene) this.onSceneChange(idx);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    this._scrollHandler = onScroll;

    const tickerFn = () => {
      if (!this.masterTL) return;
      const diff = this._targetProg - this._currProg;
      if (Math.abs(diff) < 0.00005) return;
      this._currProg += diff * 0.12;
      this.masterTL.seek(this._progressToTime(this._currProg));
    };
    gsap.ticker.add(tickerFn);
    this._tickerFn = tickerFn;
  },

  // ── SCENE 0: HERO EXIT ──
  // Hero enter is handled by initHeroAnimations() on preloader complete.
  // This segment only defines the exit to About.
  buildHeroScene(tl) {
    tl.addLabel('hero-exit', 0);

    // Name chars scatter outward
    tl.to('#hero-name-el .char', {
      y: '-130%',
      opacity: 0,
      stagger: { each: 0.018, from: 'center' },
      ease: 'power3.in',
      duration: 0.4,
    }, 'hero-exit');

    // Tagline and CTAs blur up
    tl.to(['.hero-tagline', '.hero-cta', '#scroll-indicator'], {
      filter: 'blur(10px)',
      opacity: 0,
      y: -25,
      stagger: 0.04,
      ease: 'power2.in',
      duration: 0.28,
    }, 'hero-exit+=0.08');

    // Glows expand and dissolve
    tl.to('.hero-glow', {
      scale: 2.8,
      opacity: 0,
      ease: 'power2.in',
      duration: 0.35,
    }, 'hero-exit');

    // Float elements scatter
    tl.to('.float-el', {
      x: () => gsap.utils.random(-350, 350),
      y: () => gsap.utils.random(-350, 350),
      opacity: 0,
      scale: 0,
      stagger: 0.025,
      ease: 'power3.in',
      duration: 0.32,
    }, 'hero-exit+=0.04');

    // Particles fade
    tl.to('#hero-particles', { opacity: 0, duration: 0.2 }, 'hero-exit');

    // Hero out, About in
    tl.to('#scene-hero', { opacity: 0, visibility: 'hidden', duration: 0.08 }, 'hero-exit+=0.4');
    tl.to('#scene-about', { opacity: 1, visibility: 'visible', duration: 0.08 }, 'hero-exit+=0.38');

    this.onSceneChange(0);
    tl.call(() => this.onSceneChange(1), [], 'hero-exit+=0.38');

    tl.addLabel('hero-done', 0.45);
  },

  // ── SCENE 1: ABOUT ──
  buildAboutScene(tl) {
    tl.addLabel('about-enter', 0.42);
    tl.addLabel('about-peak',  0.55);
    tl.addLabel('about-exit',  1.05);

    // Amber glow blooms from bottom-left
    tl.from('.about-glow-bloom', {
      scale: 0,
      opacity: 0,
      x: -120,
      ease: 'power2.out',
      duration: 0.32,
    }, 'about-enter');

    // Glassmorphic shape slides from left
    tl.from('.about-shape-left', {
      x: '-110%',
      opacity: 0,
      scale: 0.85,
      ease: 'power3.out',
      duration: 0.38,
    }, 'about-enter+=0.04');

    // Section label
    tl.from('#scene-about .section-label', {
      opacity: 0,
      y: 25,
      ease: 'power2.out',
      duration: 0.28,
    }, 'about-enter+=0.1');

    // Heading chars drop in
    tl.from('#about-title-el .char', {
      y: '115%',
      opacity: 0,
      stagger: { each: 0.022, from: 'left' },
      ease: 'power3.out',
      duration: 0.32,
    }, 'about-enter+=0.15');

    // Paragraph lines clip upward
    tl.from('#about-text-el .line', {
      y: '105%',
      opacity: 0,
      stagger: 0.055,
      ease: 'power2.out',
      duration: 0.22,
      clipPath: 'inset(0 0 100% 0)',
    }, 'about-enter+=0.22');

    // Interest tags fly from left
    tl.from('.interest-tag', {
      x: -55,
      opacity: 0,
      stagger: 0.022,
      ease: 'power3.out',
      duration: 0.18,
    }, 'about-enter+=0.38');

    // Mouse circle fades in
    tl.to('#about-mouse-circle', { opacity: 1, duration: 0.28 }, 'about-enter+=0.2');

    // EXIT: page-turn clip from right
    tl.to('#scene-about', {
      clipPath: 'inset(0 100% 0 0)',
      ease: 'power3.inOut',
      duration: 0.28,
    }, 'about-exit');

    tl.to('#scene-about', { visibility: 'hidden', duration: 0.01 }, 'about-exit+=0.28');
    tl.to('#scene-projects', { opacity: 1, visibility: 'visible', duration: 0.01 }, 'about-exit+=0.14');
    tl.call(() => this.onSceneChange(2), [], 'about-exit+=0.14');

    tl.addLabel('about-done', 1.20);
  },

  // ── SCENE 2: PROJECTS ──
  // Gets 3× scroll window (0.25 → 0.625) for horizontal carousel
  buildProjectsScene(tl) {
    tl.addLabel('proj-enter', 1.15);
    tl.addLabel('proj-exit',  2.55);

    const track   = $('projects-el');
    const slides  = track ? Array.from(track.querySelectorAll('.project-slide')) : [];
    const numSlides = slides.length || 1;

    // ENTER: header drops from top
    tl.from('.projects-scene-header', {
      y: -55,
      opacity: 0,
      ease: 'power3.out',
      duration: 0.18,
    }, 'proj-enter');

    // ENTER: first slide scales in from depth
    if (slides[0]) {
      tl.from(slides[0], {
        scale: 0.82,
        opacity: 0,
        filter: 'blur(18px)',
        ease: 'power3.out',
        duration: 0.22,
      }, 'proj-enter+=0.08');
    }

    // Ghost cards appear
    tl.from(['#proj-prev-ghost', '#proj-next-ghost'], {
      opacity: 0,
      x: (i) => i === 0 ? -30 : 30,
      ease: 'power2.out',
      stagger: 0.04,
      duration: 0.22,
    }, 'proj-enter+=0.18');

    // First dot active
    tl.call(() => {
      document.querySelectorAll('.proj-dot').forEach((d, i) => {
        d.classList.toggle('active', i === 0);
      });
    }, [], 'proj-enter+=0.05');

    // HORIZONTAL CAROUSEL: subdivide proj-enter → proj-exit across slides
    const winStart  = 1.15;
    const winEnd    = 2.55;
    const winSpan   = winEnd - winStart;
    const slideStep = winSpan / numSlides;

    slides.forEach((slide, idx) => {
      if (idx === 0) return;

      const segStart = winStart + idx * slideStep;

      // Slide track forward
      const slideWidth = () => {
        if (!slides[0]) return window.innerWidth * 0.78;
        const rect = slides[0].getBoundingClientRect();
        const gap = window.innerWidth * 0.03;
        return rect.width + gap;
      };

      tl.to(track, {
        x: () => -idx * slideWidth(),
        ease: 'power2.inOut',
        duration: slideStep * 0.7,
      }, segStart);

      // 3D tilt adjacent cards
      slides.forEach((other, j) => {
        const dist = j - idx;
        tl.to(other, {
          rotateY: dist === 0 ? 0 : (dist > 0 ? -14 : 14),
          scale:   dist === 0 ? 1 : 0.9,
          filter:  dist === 0 ? 'blur(0px)' : `blur(${Math.min(Math.abs(dist) * 2, 5)}px)`,
          opacity: Math.abs(dist) > 1 ? 0.35 : (dist === 0 ? 1 : 0.65),
          ease: 'power2.inOut',
          duration: slideStep * 0.7,
        }, segStart);
      });

      // Update dots
      tl.call(() => {
        document.querySelectorAll('.proj-dot').forEach((d, i) => {
          d.classList.toggle('active', i === idx);
        });
      }, [], segStart + slideStep * 0.35);

      // Content fades in
      const content = slide.querySelector('.project-content');
      if (content) {
        tl.from(content, {
          y: 35,
          opacity: 0,
          ease: 'power3.out',
          duration: slideStep * 0.5,
        }, segStart + slideStep * 0.25);
      }

      // Number parallax
      const num = slide.querySelector('.project-number');
      if (num) {
        tl.fromTo(num, { x: 55 }, { x: -55, ease: 'none', duration: slideStep }, segStart);
      }
    });

    // Progress bar
    tl.fromTo('#projects-progress-bar',
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', duration: winSpan },
      winStart
    );

    // EXIT: blur scale out
    tl.to('#scene-projects', {
      scale: 1.07,
      filter: 'blur(14px)',
      opacity: 0,
      ease: 'power2.in',
      duration: 0.075,
    }, 'proj-exit');

    tl.to('#scene-projects', { visibility: 'hidden', duration: 0.01 }, 'proj-exit+=0.075');
    tl.to('#scene-skills',   { opacity: 1, visibility: 'visible', duration: 0.01 }, 'proj-exit+=0.04');
    tl.call(() => this.onSceneChange(3), [], 'proj-exit+=0.04');

    tl.addLabel('proj-done', 2.58);
  },

  // ── SCENE 3: SKILLS ──
  buildSkillsScene(tl) {
    tl.addLabel('skills-enter', 2.60);
    tl.addLabel('skills-exit',  3.25);

    // Rings expand elastically
    tl.to('.skills-ring', {
      scale: 1,
      opacity: 1,
      stagger: 0.038,
      ease: 'elastic.out(1, 0.55)',
      duration: 0.32,
    }, 'skills-enter');

    // Center label
    tl.to('.skills-center-label', {
      opacity: 1,
      ease: 'power3.out',
      duration: 0.18,
    }, 'skills-enter+=0.15');

    // Orbit quadrants fly from edges
    tl.from('#skills-orbit-0', { y: -130, opacity: 0, ease: 'power3.out', duration: 0.28 }, 'skills-enter+=0.18');
    tl.from('#skills-orbit-1', { x:  130, opacity: 0, ease: 'power3.out', duration: 0.28 }, 'skills-enter+=0.22');
    tl.from('#skills-orbit-2', { y:  130, opacity: 0, ease: 'power3.out', duration: 0.28 }, 'skills-enter+=0.26');
    tl.from('#skills-orbit-3', { x: -130, opacity: 0, ease: 'power3.out', duration: 0.28 }, 'skills-enter+=0.30');

    // Chips materialize
    tl.from('.orbit-chip', {
      scale: 0,
      opacity: 0,
      stagger: { each: 0.013, from: 'random' },
      ease: 'back.out(2.2)',
      duration: 0.18,
    }, 'skills-enter+=0.36');

    // EXIT: chips collapse to center
    tl.to(['.orbit-chip', '.orbit-category-label'], {
      scale: 0,
      opacity: 0,
      stagger: { each: 0.008, from: 'random' },
      ease: 'power2.in',
      duration: 0.18,
    }, 'skills-exit');

    tl.to('.skills-ring, .skills-center-label', {
      scale: 0,
      opacity: 0,
      ease: 'power2.in',
      duration: 0.14,
    }, 'skills-exit+=0.06');

    tl.to('#skills-orbit-0, #skills-orbit-1, #skills-orbit-2, #skills-orbit-3', {
      opacity: 0,
      ease: 'power2.in',
      duration: 0.12,
    }, 'skills-exit');

    tl.to('#scene-skills',     { opacity: 0, visibility: 'hidden', duration: 0.05 }, 'skills-exit+=0.2');
    tl.to('#scene-experience', { opacity: 1, visibility: 'visible', duration: 0.01 }, 'skills-exit+=0.15');
    tl.call(() => this.onSceneChange(4), [], 'skills-exit+=0.15');

    tl.addLabel('skills-done', 3.38);
  },

  // ── SCENE 4: EXPERIENCE ──
  buildExperienceScene(tl) {
    tl.addLabel('exp-enter', 3.35);
    tl.addLabel('exp-exit',  3.97);

    // Background horizontal lines fade in
    tl.to('.exp-timeline-lines', {
      opacity: 1,
      ease: 'power2.out',
      duration: 0.22,
    }, 'exp-enter');

    // Section label
    tl.from('#scene-experience .section-label', {
      opacity: 0,
      y: 20,
      ease: 'power2.out',
      duration: 0.2,
    }, 'exp-enter+=0.08');

    // Heading chars descend from top
    tl.from('.exp-heading .char', {
      y: '-115%',
      opacity: 0,
      stagger: { each: 0.02, from: 'left' },
      ease: 'power3.out',
      duration: 0.28,
    }, 'exp-enter+=0.12');

    // Timeline line draws downward
    tl.from('#timeline-line-fill', {
      height: '0%',
      ease: 'power2.inOut',
      duration: 0.38,
    }, 'exp-enter+=0.18');

    // Timeline items slide from left
    tl.to('.tl-item', {
      x: 0,
      opacity: 1,
      stagger: 0.065,
      ease: 'power3.out',
      duration: 0.28,
    }, 'exp-enter+=0.25');

    // Dots glow on
    tl.to('.tl-dot', {
      background: 'var(--accent)',
      boxShadow: '0 0 15px rgba(196, 163, 90, 0.4)',
      stagger: 0.065,
      ease: 'power2.out',
      duration: 0.18,
      onComplete: () => {
        document.querySelectorAll('.tl-item').forEach(el => el.classList.add('active'));
      },
    }, 'exp-enter+=0.38');

    // EXIT: content lifts up
    tl.to('.exp-scene-inner', {
      y: -45,
      opacity: 0,
      ease: 'power2.in',
      duration: 0.18,
    }, 'exp-exit');

    tl.to('.exp-timeline-lines', { opacity: 0, duration: 0.18 }, 'exp-exit');

    tl.to('#scene-experience', { opacity: 0, visibility: 'hidden', duration: 0.05 }, 'exp-exit+=0.2');
    tl.to('#scene-contact',    { opacity: 1, visibility: 'visible', duration: 0.01 }, 'exp-exit+=0.15');
    tl.call(() => this.onSceneChange(5), [], 'exp-exit+=0.15');

    tl.addLabel('exp-done', 4.10);
  },

  // ── SCENE 5: CONTACT (prelude → main) ──
  buildContactScene(tl) {
    tl.addLabel('contact-enter',      4.10);
    tl.addLabel('contact-main-enter', 4.60);

    // Light rays expand from center
    tl.to('.contact-ray', {
      height: '62vh',
      opacity: 1,
      stagger: 0.04,
      ease: 'power2.out',
      duration: 0.28,
    }, 'contact-enter');

    // Prelude: edu cards
    tl.from('.edu-card', {
      y: 48,
      opacity: 0,
      stagger: 0.048,
      ease: 'power3.out',
      duration: 0.24,
    }, 'contact-enter+=0.1');

    // Prelude: next cards
    tl.from('.next-card', {
      scale: 0.88,
      opacity: 0,
      stagger: 0.048,
      ease: 'back.out(1.5)',
      duration: 0.24,
    }, 'contact-enter+=0.2');

    // Sub-transition: prelude exits upward
    tl.to('#contact-prelude', {
      y: '-105%',
      opacity: 0,
      ease: 'power3.inOut',
      duration: 0.22,
    }, 'contact-main-enter');

    // Main contact appears
    tl.to('#contact-main', {
      opacity: 1,
      visibility: 'visible',
      duration: 0.01,
    }, 'contact-main-enter+=0.08');

    // Heading chars reveal
    tl.from('#contact-title-el .char', {
      y: '125%',
      opacity: 0,
      stagger: { each: 0.025, from: 'left' },
      ease: 'power4.out',
      duration: 0.32,
    }, 'contact-main-enter+=0.1');

    // Tagline fades in
    tl.to('#contact-tagline-el', {
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      duration: 0.24,
    }, 'contact-main-enter+=0.3');

    // Contact links
    tl.from('.contact-link', {
      opacity: 0,
      y: 28,
      scale: 0.92,
      stagger: 0.07,
      ease: 'power3.out',
      duration: 0.26,
    }, 'contact-main-enter+=0.42');

    // Footer
    tl.from('#footer-el', {
      opacity: 0,
      duration: 0.28,
    }, 'contact-main-enter+=0.55');

    tl.addLabel('contact-done', 5.45);
  },

  // Mirror skill data from hidden #skills-el into the orbit divs
  syncSkillsOrbit() {
    const skillCards = document.querySelectorAll('#skills-el .skill-card');
    const orbits = [
      $('skills-orbit-0'),
      $('skills-orbit-1'),
      $('skills-orbit-2'),
      $('skills-orbit-3'),
    ];

    skillCards.forEach((card, i) => {
      const orbit = orbits[i % 4];
      if (!orbit) return;

      const title = card.querySelector('.skill-card-title')?.textContent.trim() || '';
      const chips = Array.from(card.querySelectorAll('.chip')).map(c => c.textContent.trim());

      orbit.innerHTML = `
        <div class="orbit-category-label">${esc(title)}</div>
        <div class="orbit-chips">
          ${chips.map(c => `<span class="orbit-chip">${esc(c)}</span>`).join('')}
        </div>
      `;
    });
  },

  // Create dot indicators for projects
  buildProjectDots() {
    const dots = $('projects-dots');
    if (!dots) return;
    const slides = document.querySelectorAll('.project-slide');
    dots.innerHTML = Array.from(slides).map((_, i) =>
      `<span class="proj-dot${i === 0 ? ' active' : ''}" aria-label="Project ${i + 1}"></span>`
    ).join('');
  },

  // Update nav active state when scene changes
  onSceneChange(idx) {
    this.currentScene = idx;

    const sceneToHref = {
      0: null,
      1: '#about',
      2: '#projects',
      3: '#skills',
      4: '#experience',
      5: '#contact-section',
    };

    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === sceneToHref[idx]);
    });

    const nav = $('main-nav');
    if (nav) {
      nav.classList.toggle('scrolled', idx > 0);
    }
  },

  // Single mousemove listener — branches by scene
  initMouseTracking() {
    if (prefersReducedMotion || window.innerWidth < 768) return;

    const speeds = [0.03, 0.02, 0.04, 0.025, 0.035, 0.015, 0.03];

    document.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      switch (this.currentScene) {
        case 0: // Hero: float element parallax
          document.querySelectorAll('.float-el').forEach((el, i) => {
            gsap.to(el, {
              x: dx * speeds[i % speeds.length] * 100,
              y: dy * speeds[i % speeds.length] * 100,
              duration: 1.2,
              ease: 'power2.out',
            });
          });
          break;

        case 1: // About: mouse circle + shape drift
          gsap.to('#about-mouse-circle', {
            left: e.clientX,
            top:  e.clientY,
            duration: 0.75,
            ease: 'power2.out',
          });
          gsap.to('.about-shape-left', {
            x: dx * 16,
            y: dy * 10,
            rotation: dx * 2.5,
            duration: 1.5,
            ease: 'power2.out',
          });
          break;

        case 3: // Skills: orbit wobble
          document.querySelectorAll('.skills-orbit').forEach((orbit, i) => {
            const xs = [0, 22, 0, -22];
            const ys = [-22, 0, 22, 0];
            gsap.to(orbit, {
              x: dx * xs[i],
              y: dy * ys[i],
              duration: 1.2,
              ease: 'power2.out',
            });
          });
          break;

        case 5: // Contact: ambient glow follows cursor
          const ambient = document.querySelector('.contact-ambient');
          if (ambient) {
            ambient.style.background = `radial-gradient(circle 450px at ${e.clientX}px ${e.clientY}px, rgba(196,163,90,0.06) 0%, transparent 70%)`;
          }
          break;
      }
    });
  },

  // Gold particle system on the hero canvas
  initParticleCanvas() {
    const canvas = $('hero-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 55 }, () => ({
      x:   Math.random() * canvas.width,
      y:   Math.random() * canvas.height + canvas.height * 0.3,
      vy:  -(Math.random() * 0.45 + 0.15),
      vx:  (Math.random() - 0.5) * 0.18,
      size:    Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.45 + 0.08,
    }));

    let rafId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196, 163, 90, ${p.opacity})`;
        ctx.fill();
      });
      rafId = requestAnimationFrame(animate);
    };
    animate();

    // Stop when hero scene hides
    this._stopParticles = () => {
      cancelAnimationFrame(rafId);
    };
  },

  // Intercept nav links to lenis.scrollTo() instead of native jump
  initSceneNav() {
    const isMobile = window.innerWidth < 768;
    const totalVH = this.scrollVH;

    // Map section IDs to scroll positions (in vh), aligned to piecewise breakpoints.
    // Each target lands ~30% into its scene so the content is clearly visible on arrival.
    const sectionToVH = {
      '#about':           Math.round(totalVH * 0.18),
      '#projects':        Math.round(totalVH * 0.34),
      '#skills':          Math.round(totalVH * 0.60),
      '#experience':      Math.round(totalVH * 0.75),
      '#contact-section': Math.round(totalVH * 0.90),
      '#education':       Math.round(totalVH * 0.90),
    };

    const scrollTo = (href) => {
      const target = sectionToVH[href];
      if (target === undefined) return;
      const targetPx = (target / 100) * window.innerHeight;
      if (this.lenis) {
        this.lenis.scrollTo(targetPx, {
          duration: 1.4,
          easing: (t) => 1 - Math.pow(1 - t, 4),
        });
      } else {
        window.scrollTo({ top: targetPx, behavior: 'smooth' });
      }
    };

    document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        scrollTo(link.getAttribute('href'));
        // Close mobile nav
        const ham = $('hamburger');
        const mob = $('mobile-nav');
        if (ham && mob) {
          ham.classList.remove('open');
          mob.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });

    // Logo scrolls to top
    const logo = $('nav-logo');
    if (logo) {
      logo.addEventListener('click', () => {
        if (this.lenis) {
          this.lenis.scrollTo(0, { duration: 1.4 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }

    // Hero CTAs pointing to #projects
    const cta1 = $('hero-cta1-el');
    if (cta1) {
      cta1.addEventListener('click', (e) => {
        if (cta1.getAttribute('href') === '#projects') {
          e.preventDefault();
          scrollTo('#projects');
        }
      });
    }
  },

  // Re-run after admin save or data reset
  reinitAfterSave() {
    if (!this.active) return;

    // Clean up scroll driver before rebuild
    if (this._scrollHandler) {
      window.removeEventListener('scroll', this._scrollHandler);
      this._scrollHandler = null;
    }
    if (this._tickerFn) {
      gsap.ticker.remove(this._tickerFn);
      this._tickerFn = null;
    }
    this._targetProg = 0;
    this._currProg   = 0;

    ScrollTrigger.getAll().forEach(st => st.kill());
    this.masterTL = null;

    // Re-apply SplitType now content is fresh
    initSplitType();

    // Reset skills-orbit and project dots
    this.syncSkillsOrbit();
    this.buildProjectDots();

    // Reset scene visibility
    gsap.set('.scene', { opacity: 0, visibility: 'hidden', clearProps: 'clipPath,filter,scale,x,y' });
    gsap.set('#scene-hero', { opacity: 1, visibility: 'visible' });

    // Reset contact-main
    gsap.set('#contact-main', { opacity: 0, visibility: 'hidden' });

    // Scroll to top
    if (this.lenis) {
      this.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Rebuild timeline
    requestAnimationFrame(() => {
      this.buildMasterTimeline();
      ScrollTrigger.refresh();
    });
  },

  // Fallback for prefers-reduced-motion: unwind scene system, use standard scroll
  initReducedMotionFallback() {
    const sc = $('scroll-container');
    if (sc) sc.style.display = 'none';

    const fs = $('fixed-scenes');
    if (fs) {
      fs.style.position = 'static';
      fs.style.height   = 'auto';
      fs.style.overflow = 'visible';
    }

    document.querySelectorAll('.scene').forEach(s => {
      s.style.position   = 'static';
      s.style.opacity    = '1';
      s.style.visibility = 'visible';
      s.style.height     = 'auto';
      s.style.minHeight  = '100vh';
      s.style.overflow   = 'visible';
    });

    // Show actual skills grid instead of orbits
    const skillsEl = $('skills-el');
    if (skillsEl) skillsEl.style.display = 'grid';

    // Contact-main always visible
    const cm = $('contact-main');
    if (cm) {
      cm.style.position   = 'static';
      cm.style.opacity    = '1';
      cm.style.visibility = 'visible';
    }

    // Contact-prelude always visible
    const cp = $('contact-prelude');
    if (cp) {
      cp.style.position = 'static';
      cp.style.overflow = 'visible';
      cp.style.height   = 'auto';
    }

    // Use standard Lenis for smooth native scroll
    initLenis();

    // Run original animation fallbacks
    initHeroAnimations();
    initSectionAnimations();
    initProjectsGallery();
    initNavScroll();
  },
};


/* ═══════════════════════════════════════════
   SECTION SCROLL ANIMATIONS
   (Reduced-motion fallback only — guarded when
    SceneSystem is active)
   ═══════════════════════════════════════════ */
function initSectionAnimations() {
  if (SceneSystem.active) return;
  if (prefersReducedMotion) return;

  // ── ABOUT SECTION ──
  // Heading reveal
  gsap.from('#about .section-heading', {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#about .section-heading',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });

  gsap.from('#about .section-label', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#about .section-label',
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });

  // About paragraphs — stagger reveal
  gsap.from('#about-text-el p', {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#about-text-el',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Interest tags
  gsap.to('.interest-tag', {
    opacity: 1,
    scale: 1,
    y: 0,
    stagger: 0.04,
    duration: 0.5,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.interests-grid',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });

  // ── SKILLS SECTION ──
  gsap.from('#skills .section-label, #skills .section-heading', {
    y: 40,
    opacity: 0,
    stagger: 0.1,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#skills',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  gsap.from('.skill-card', {
    y: 50,
    opacity: 0,
    rotateY: 15,
    stagger: 0.12,
    duration: 0.7,
    ease: 'power3.out',
    transformPerspective: 800,
    scrollTrigger: {
      trigger: '.skills-grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // ── EXPERIENCE SECTION ──
  gsap.from('#experience .section-label, #experience .section-heading', {
    y: 40,
    opacity: 0,
    stagger: 0.1,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#experience',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Timeline line fill
  const timelineEl = $('experience-el');
  if (timelineEl) {
    gsap.to('#timeline-line-fill', {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: timelineEl,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1,
      },
    });
  }

  // Timeline items
  gsap.utils.toArray('.tl-item').forEach((item, i) => {
    gsap.to(item, {
      x: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none none',
        onEnter: () => item.classList.add('active'),
      },
    });
  });

  // ── EDUCATION SECTION ──
  gsap.from('#education .section-label, #education .section-heading', {
    y: 40,
    opacity: 0,
    stagger: 0.1,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#education',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  gsap.to('.edu-card', {
    y: 0,
    opacity: 1,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.edu-grid',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });

  // ── WHAT'S NEXT SECTION ──
  gsap.from('#next .section-label, #next .section-heading', {
    y: 40,
    opacity: 0,
    stagger: 0.1,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#next',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  gsap.to('.next-card', {
    y: 0,
    opacity: 1,
    scale: 1,
    stagger: 0.12,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.next-grid',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });

  // ── CONTACT SECTION ──
  gsap.from('#contact-section .section-label', {
    y: 20,
    opacity: 0,
    duration: 0.5,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#contact-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Large heading scale reveal
  gsap.to('.contact-heading', {
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-heading',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });

  // Contact heading scale-down effect
  gsap.fromTo('.contact-heading', {
    scale: 1.3,
    opacity: 0,
  }, {
    scale: 1,
    opacity: 1,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-heading',
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });

  gsap.to('.contact-tagline', {
    opacity: 1,
    duration: 0.6,
    delay: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.contact-tagline',
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });

  gsap.to('.contact-links', {
    opacity: 1,
    duration: 0.6,
    delay: 0.25,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.contact-links',
      start: 'top 95%',
      toggleActions: 'play none none none',
    },
  });
}


/* ═══════════════════════════════════════════
   HORIZONTAL PROJECTS GALLERY
   (Reduced-motion fallback only — guarded when
    SceneSystem is active)
   ═══════════════════════════════════════════ */
function initProjectsGallery() {
  if (SceneSystem.active) return;

  const track = $('projects-el');
  if (!track) return;

  const slides = track.querySelectorAll('.project-slide');
  if (!slides.length) return;

  if (prefersReducedMotion) {
    gsap.set(slides, { opacity: 1 });
    return;
  }

  // Section labels/headings animation
  gsap.from('#projects .section-label, #projects .section-heading', {
    y: 40,
    opacity: 0,
    stagger: 0.1,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#projects',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Calculate scroll distance
  const getScrollDistance = () => -(track.scrollWidth - window.innerWidth + 100);

  // Horizontal scroll animation
  const horizontalScroll = gsap.to(track, {
    x: getScrollDistance,
    ease: 'none',
    scrollTrigger: {
      trigger: '#projects',
      start: 'top 10%',
      pin: true,
      scrub: 1,
      end: () => '+=' + (track.scrollWidth - window.innerWidth + 200),
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Update progress bar
        gsap.set('#projects-progress-bar', { scaleX: self.progress });
      },
    },
  });

  // Individual slide animations (parallax number)
  slides.forEach((slide) => {
    const number = slide.querySelector('.project-number');
    if (!number) return;

    gsap.fromTo(number, {
      x: 80,
    }, {
      x: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: slide,
        containerAnimation: horizontalScroll,
        start: 'left right',
        end: 'right left',
        scrub: true,
      },
    });

    // Content fade in
    const content = slide.querySelector('.project-content');
    if (content) {
      gsap.from(content, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: slide,
          containerAnimation: horizontalScroll,
          start: 'left 75%',
          toggleActions: 'play none none none',
        },
      });
    }
  });
}


/* ═══════════════════════════════════════════
   NAV SCROLL STATE
   (Reduced-motion fallback only — guarded when
    SceneSystem is active)
   ═══════════════════════════════════════════ */
function initNavScroll() {
  if (SceneSystem.active) return;

  const nav = $('main-nav');
  if (!nav) return;

  ScrollTrigger.create({
    trigger: '#scene-hero',
    start: 'bottom 80%',
    onEnter: () => nav.classList.add('scrolled'),
    onLeaveBack: () => nav.classList.remove('scrolled'),
  });

  // Active nav link tracking
  const sections = ['about', 'skills', 'experience', 'projects', 'contact-section'];
  const navLinks = document.querySelectorAll('.nav-links a');

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top 40%',
      end: 'bottom 40%',
      onToggle: (self) => {
        if (self.isActive) {
          navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
          });
        }
      },
    });
  });
}


/* ═══════════════════════════════════════════
   MOBILE NAV
   ═══════════════════════════════════════════ */
function initMobileNav() {
  const hamburger = $('hamburger');
  const mobileNav = $('mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}


/* ═══════════════════════════════════════════
   ADMIN PANEL (preserved from original)
   ═══════════════════════════════════════════ */
const TABS = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'next', label: "What's Next" },
  { id: 'contact', label: 'Contact' }
];

function buildAdminUI() {
  const tabsEl = $('adminTabs');
  const panelsEl = $('adminPanels');
  tabsEl.innerHTML = TABS.map((t, i) =>
    `<button class="admin-tab${i === 0 ? ' active' : ''}" onclick="switchTab('${t.id}')">${t.label}</button>`
  ).join('');
  panelsEl.innerHTML = TABS.map((t, i) =>
    `<div class="admin-panel${i === 0 ? ' active' : ''}" id="panel-${t.id}">${buildPanel(t.id)}</div>`
  ).join('');
}

function buildPanel(id) {
  const d = DATA;

  if (id === 'hero') return `
    <div class="form-group">
      <label class="form-label">FULL NAME</label>
      <input class="form-input" id="f-hero-name" value="${esc(d.hero.name)}">
    </div>
    <div class="form-group">
      <label class="form-label">ROTATING TITLES — one per line</label>
      <textarea class="form-textarea" id="f-hero-titles" style="min-height:110px">${(d.hero.titles || []).join('\n')}</textarea>
    </div>
    <div class="form-group">
      <label class="form-label">TAGLINE</label>
      <input class="form-input" id="f-hero-tagline" value="${esc(d.hero.tagline)}">
    </div>
    <div class="form-grid">
      <div class="form-group">
        <label class="form-label">PRIMARY BUTTON TEXT</label>
        <input class="form-input" id="f-hero-cta1" value="${esc(d.hero.cta1)}">
      </div>
      <div class="form-group">
        <label class="form-label">SECONDARY BUTTON TEXT</label>
        <input class="form-input" id="f-hero-cta2" value="${esc(d.hero.cta2)}">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">CV / RESUME (Upload)</label>
      <div style="display:flex;gap:10px;">
        <input type="file" class="form-input" id="f-hero-cvFile" accept=".pdf,.doc,.docx" style="flex:1">
        <button class="save-btn" onclick="uploadCv()" style="padding: 11px 16px;">Upload</button>
      </div>
      <label class="form-label" style="margin-top:10px">CV URL (auto-filled on upload)</label>
      <input class="form-input" id="f-hero-cvUrl" value="${esc(d.hero.cvUrl || '')}">
    </div>`;

  if (id === 'about') return `
    <div class="form-group">
      <label class="form-label">SECTION TITLE</label>
      <input class="form-input" id="f-about-title" value="${esc(d.about.title)}">
    </div>
    ${[0, 1, 2].map(i => `
    <div class="form-group">
      <label class="form-label">PARAGRAPH ${i + 1}</label>
      <textarea class="form-textarea" id="f-about-p${i}">${esc((d.about.paragraphs || [])[i] || '')}</textarea>
    </div>`).join('')}
    <div class="form-group">
      <label class="form-label">INTERESTS — comma-separated</label>
      <input class="form-input" id="f-about-interests" value="${esc((d.about.interests || []).join(', '))}">
    </div>`;

  if (id === 'skills') return `
    <button class="add-btn" onclick="addSkillCategory()">+ Add Skill Category</button>
    <div id="skills-admin">
      ${(d.skills || []).map((s, i) => `
      <div class="item-block" id="skill-block-${i}">
        <div class="item-block-header">
          <span class="item-block-title">Category ${i + 1}</span>
          <button class="remove-btn" onclick="removeItem('skills',${i})">Remove</button>
        </div>
        <div class="form-group">
          <label class="form-label">CATEGORY NAME</label>
          <input class="form-input" data-skill="${i}" data-field="category" value="${esc(s.category)}">
        </div>
        <div class="form-group">
          <label class="form-label">SKILLS — comma-separated</label>
          <input class="form-input" data-skill="${i}" data-field="chips" value="${esc((s.chips || []).join(', '))}">
        </div>
      </div>`).join('')}
    </div>`;

  if (id === 'experience') return `
    <button class="add-btn" onclick="addItem('experience',{period:'',role:'',company:'',bullets:[]})">+ Add Experience</button>
    <div id="exp-admin">
      ${(d.experience || []).map((e, i) => `
      <div class="item-block" id="exp-block-${i}">
        <div class="item-block-header">
          <span class="item-block-title">Experience ${i + 1}</span>
          <button class="remove-btn" onclick="removeItem('experience',${i})">Remove</button>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">PERIOD</label>
            <input class="form-input" data-exp="${i}" data-field="period" value="${esc(e.period)}">
          </div>
          <div class="form-group">
            <label class="form-label">ROLE / TITLE</label>
            <input class="form-input" data-exp="${i}" data-field="role" value="${esc(e.role)}">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">COMPANY & LOCATION</label>
          <input class="form-input" data-exp="${i}" data-field="company" value="${esc(e.company)}">
        </div>
        <div class="form-group">
          <label class="form-label">BULLET POINTS — one per line</label>
          <textarea class="form-textarea" data-exp="${i}" data-field="bullets" style="min-height:130px">${esc((e.bullets || []).join('\n'))}</textarea>
        </div>
      </div>`).join('')}
    </div>`;

  if (id === 'projects') return `
    <button class="add-btn" onclick="addItem('projects',{title:'',desc:'',tags:[]})">+ Add Project</button>
    <div id="proj-admin">
      ${(d.projects || []).map((p, i) => `
      <div class="item-block" id="proj-block-${i}">
        <div class="item-block-header">
          <span class="item-block-title">Project ${i + 1}</span>
          <button class="remove-btn" onclick="removeItem('projects',${i})">Remove</button>
        </div>
        <div class="form-group">
          <label class="form-label">TITLE</label>
          <input class="form-input" data-proj="${i}" data-field="title" value="${esc(p.title)}">
        </div>
        <div class="form-group">
          <label class="form-label">DESCRIPTION</label>
          <textarea class="form-textarea" data-proj="${i}" data-field="desc">${esc(p.desc)}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">TAGS — comma-separated</label>
          <input class="form-input" data-proj="${i}" data-field="tags" value="${esc((p.tags || []).join(', '))}">
        </div>
      </div>`).join('')}
    </div>`;

  if (id === 'education') return `
    <button class="add-btn" onclick="addItem('education',{degree:'',school:'',meta:''})">+ Add Entry</button>
    <div id="edu-admin">
      ${(d.education || []).map((e, i) => `
      <div class="item-block" id="edu-block-${i}">
        <div class="item-block-header">
          <span class="item-block-title">Education ${i + 1}</span>
          <button class="remove-btn" onclick="removeItem('education',${i})">Remove</button>
        </div>
        <div class="form-group">
          <label class="form-label">DEGREE / CERTIFICATION</label>
          <input class="form-input" data-edu="${i}" data-field="degree" value="${esc(e.degree)}">
        </div>
        <div class="form-group">
          <label class="form-label">INSTITUTION</label>
          <input class="form-input" data-edu="${i}" data-field="school" value="${esc(e.school)}">
        </div>
        <div class="form-group">
          <label class="form-label">META (CGPA, Year, etc.)</label>
          <input class="form-input" data-edu="${i}" data-field="meta" value="${esc(e.meta)}">
        </div>
      </div>`).join('')}
    </div>`;

  if (id === 'next') return `
    <button class="add-btn" onclick="addItem('next',{emoji:'🚀',label:'',text:''})">+ Add Status Card</button>
    <div id="next-admin">
      ${(d.next || []).map((n, i) => `
      <div class="item-block" id="next-block-${i}">
        <div class="item-block-header">
          <span class="item-block-title">Card ${i + 1}</span>
          <button class="remove-btn" onclick="removeItem('next',${i})">Remove</button>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">EMOJI</label>
            <input class="form-input" data-next="${i}" data-field="emoji" value="${esc(n.emoji)}" style="font-size:1.2rem">
          </div>
          <div class="form-group">
            <label class="form-label">LABEL</label>
            <input class="form-input" data-next="${i}" data-field="label" value="${esc(n.label)}">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">BODY TEXT</label>
          <textarea class="form-textarea" data-next="${i}" data-field="text">${esc(n.text)}</textarea>
        </div>
      </div>`).join('')}
    </div>`;

  if (id === 'contact') return `
    <div class="form-group">
      <label class="form-label">SECTION TITLE</label>
      <input class="form-input" id="f-contact-title" value="${esc(d.contact.title)}">
    </div>
    <div class="form-group">
      <label class="form-label">TAGLINE</label>
      <textarea class="form-textarea" id="f-contact-tagline">${esc(d.contact.tagline)}</textarea>
    </div>
    <div class="form-group">
      <label class="form-label">EMAIL ADDRESS</label>
      <input class="form-input" id="f-contact-email" value="${esc(d.contact.email)}">
    </div>
    <div class="form-group">
      <label class="form-label">LINKEDIN URL</label>
      <input class="form-input" id="f-contact-linkedin" value="${esc(d.contact.linkedin)}">
    </div>
    <div class="form-group">
      <label class="form-label">GITHUB URL</label>
      <input class="form-input" id="f-contact-github" value="${esc(d.contact.github)}">
    </div>
    <div class="form-group" style="margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid var(--border)">
      <label class="form-label">FOOTER TEXT</label>
      <input class="form-input" id="f-footer" value="${esc(DATA.footer)}">
    </div>`;

  return '<p style="color:var(--text-muted)">Panel coming soon.</p>';
}

function switchTab(id) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  const tab = document.querySelector(`.admin-tab[onclick="switchTab('${id}')"]`);
  if (tab) tab.classList.add('active');
  const panel = $('panel-' + id);
  if (panel) panel.classList.add('active');
}


/* ── Collect all form values into DATA ── */
function collectFromAdmin() {
  const d = deepClone(DATA);
  const g = id => { const el = $(id); return el ? el.value : null; };

  /* Hero */
  if (g('f-hero-name') !== null) d.hero.name = g('f-hero-name');
  if (g('f-hero-titles') !== null) d.hero.titles = g('f-hero-titles').split('\n').map(s => s.trim()).filter(Boolean);
  if (g('f-hero-tagline') !== null) d.hero.tagline = g('f-hero-tagline');
  if (g('f-hero-cta1') !== null) d.hero.cta1 = g('f-hero-cta1');
  if (g('f-hero-cta2') !== null) d.hero.cta2 = g('f-hero-cta2');
  if (g('f-hero-cvUrl') !== null) d.hero.cvUrl = g('f-hero-cvUrl');

  /* About */
  if (g('f-about-title') !== null) d.about.title = g('f-about-title');
  const ps = [0, 1, 2].map(i => g(`f-about-p${i}`)).filter(v => v !== null && v.trim());
  if (ps.length) d.about.paragraphs = ps;
  if (g('f-about-interests') !== null) d.about.interests = g('f-about-interests').split(',').map(s => s.trim()).filter(Boolean);

  /* Skills */
  document.querySelectorAll('[data-skill]').forEach(el => {
    const i = parseInt(el.dataset.skill), f = el.dataset.field;
    if (!d.skills[i]) d.skills[i] = {};
    d.skills[i][f] = f === 'chips' ? el.value.split(',').map(s => s.trim()).filter(Boolean) : el.value;
  });

  /* Experience */
  document.querySelectorAll('[data-exp]').forEach(el => {
    const i = parseInt(el.dataset.exp), f = el.dataset.field;
    if (!d.experience[i]) d.experience[i] = {};
    d.experience[i][f] = f === 'bullets' ? el.value.split('\n').map(s => s.trim()).filter(Boolean) : el.value;
  });

  /* Projects */
  document.querySelectorAll('[data-proj]').forEach(el => {
    const i = parseInt(el.dataset.proj), f = el.dataset.field;
    if (!d.projects[i]) d.projects[i] = {};
    d.projects[i][f] = f === 'tags' ? el.value.split(',').map(s => s.trim()).filter(Boolean) : el.value;
  });

  /* Education */
  document.querySelectorAll('[data-edu]').forEach(el => {
    const i = parseInt(el.dataset.edu), f = el.dataset.field;
    if (!d.education[i]) d.education[i] = {};
    d.education[i][f] = el.value;
  });

  /* Next */
  document.querySelectorAll('[data-next]').forEach(el => {
    const i = parseInt(el.dataset.next), f = el.dataset.field;
    if (!d.next[i]) d.next[i] = {};
    d.next[i][f] = el.value;
  });

  /* Contact */
  if (g('f-contact-title') !== null) d.contact.title = g('f-contact-title');
  if (g('f-contact-tagline') !== null) d.contact.tagline = g('f-contact-tagline');
  if (g('f-contact-email') !== null) d.contact.email = g('f-contact-email');
  if (g('f-contact-linkedin') !== null) d.contact.linkedin = g('f-contact-linkedin');
  if (g('f-contact-github') !== null) d.contact.github = g('f-contact-github');
  if (g('f-footer') !== null) d.footer = g('f-footer');

  return d;
}

async function saveAll() {
  DATA = collectFromAdmin();

  // Apply changes to the page immediately, before the server responds
  ScrollTrigger.getAll().forEach(st => st.kill());
  renderPortfolio();
  if (SceneSystem.active) {
    SceneSystem.reinitAfterSave();
  } else {
    requestAnimationFrame(() => {
      initSectionAnimations();
      initProjectsGallery();
      initCardTilt();
      initMagneticButtons();
      ScrollTrigger.refresh();
    });
  }
  initCardTilt();
  initMagneticButtons();

  // Persist to server (best-effort)
  try {
    const res = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(DATA)
    });
    showToast(res.ok ? '✓ Changes saved!' : '⚠ Applied locally — server error, changes may not persist');
  } catch (err) {
    showToast('⚠ Applied locally — server unreachable, changes may not persist');
  }
}

async function resetDefaults() {
  if (!confirm('Reset ALL content to defaults? This cannot be undone.')) return;
  DATA = deepClone(DEFAULT_DATA);
  try {
    await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(DATA)
    });
  } catch (err) { /* best effort */ }

  ScrollTrigger.getAll().forEach(st => st.kill());
  buildAdminUI();
  renderPortfolio();

  if (SceneSystem.active) {
    SceneSystem.reinitAfterSave();
  } else {
    requestAnimationFrame(() => {
      initSectionAnimations();
      initProjectsGallery();
      initCardTilt();
      initMagneticButtons();
      ScrollTrigger.refresh();
    });
  }

  initCardTilt();
  initMagneticButtons();
  showToast('↺ Reset to defaults.');
}

async function uploadCv() {
  const fileInput = $('f-hero-cvFile');
  const file = fileInput?.files[0];
  if (!file) {
    showToast('Please select a file first.');
    return;
  }
  const formData = new FormData();
  formData.append('cv', file);

  try {
    const res = await fetch('/api/upload-cv', {
      method: 'POST',
      body: formData
    });
    if (res.ok) {
      const data = await res.json();
      $('f-hero-cvUrl').value = data.cvUrl;
      showToast('✓ CV uploaded successfully!');
    } else {
      showToast('❌ Upload failed.');
    }
  } catch (err) {
    showToast('❌ Error uploading file.');
  }
}


/* ── Dynamic list helpers ── */
function addSkillCategory() {
  DATA = collectFromAdmin();
  DATA.skills.push({ category: 'New Category', chips: [] });
  buildAdminUI(); switchTab('skills');
}

function addItem(key, template) {
  DATA = collectFromAdmin();
  DATA[key].push(deepClone(template));
  buildAdminUI(); switchTab(key);
}

function removeItem(key, idx) {
  DATA = collectFromAdmin();
  DATA[key].splice(idx, 1);
  buildAdminUI(); switchTab(key);
}


/* ── Modal ── */
function openAdmin() {
  $('admin-password-input').value = '';
  $('password-error').style.display = 'none';
  $('passwordModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  if (lenis) lenis.stop();
}

function closePasswordModal() {
  $('passwordModal').classList.remove('open');
  document.body.style.overflow = '';
  if (lenis) lenis.start();
}

function submitPassword() {
  const pwd = $('admin-password-input').value;
  if (pwd === "tonmoy5663") {
    closePasswordModal();
    buildAdminUI();
    $('adminModal').classList.add('open');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  } else {
    $('password-error').style.display = 'block';
  }
}

// Bind to window for HTML event handlers
window.openAdmin = openAdmin;
window.closePasswordModal = closePasswordModal;
window.submitPassword = submitPassword;

function closeAdmin() {
  $('adminModal').classList.remove('open');
  document.body.style.overflow = '';
  if (lenis) lenis.start();
}


/* ── Toast ── */
function showToast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}


/* ═══════════════════════════════════════════
   INITIALIZATION
   ═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {
  // Prevent scroll restoration flash
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (window.location.hash) window.history.replaceState(null, null, window.location.pathname);
  window.scrollTo(0, 0);

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Load data & render
  await loadData();
  renderPortfolio();

  // Apply SplitType now that DOM has content
  initSplitType();

  // Initialize SceneSystem (or its reduced-motion fallback)
  // This replaces initLenis() for the scene path
  SceneSystem.init();

  // Typewriter
  typewrite();

  // Mobile nav
  initMobileNav();

  // Preloader → then kick off everything
  initPreloader(() => {
    // Hero enter animation (unchanged — plays on preloader exit)
    initHeroAnimations();
    initHeroParallax(); // guarded inside; delegates to SceneSystem when active
    initCursor();

    if (SceneSystem.active) {
      // Scene path: build master timeline, sync data, wire nav
      SceneSystem.syncSkillsOrbit();
      SceneSystem.buildProjectDots();

      requestAnimationFrame(() => {
        SceneSystem.buildMasterTimeline();
        SceneSystem.initSceneNav();
        initCardTilt();
        initMagneticButtons();
        ScrollTrigger.refresh();
      });
    } else {
      // Reduced-motion / fallback path: standard scroll animations
      requestAnimationFrame(() => {
        initSectionAnimations();
        initProjectsGallery();
        initNavScroll();
        initCardTilt();
        initMagneticButtons();
        ScrollTrigger.refresh();
      });
    }
  });

  // Close modals on overlay click
  $('adminModal').addEventListener('click', function (e) {
    if (e.target === this) closeAdmin();
  });
  $('passwordModal').addEventListener('click', function (e) {
    if (e.target === this) closePasswordModal();
  });
});
