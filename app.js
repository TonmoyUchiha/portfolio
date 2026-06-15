/* ═══════════════════════════════════════════════════════════════
   TONMOY PORTFOLIO — APPLICATION LOGIC
   Handles data loading, rendering, particles, scroll effects,
   admin panel, and mobile navigation.
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
    title: "Get In Touch",
    tagline: "Whether it's a project, a collaboration, or a conversation about enterprise systems and grad school — I'm all ears.",
    email: "tonmoy.bit@gmail.com",
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourprofile"
  },
  footer: "Md. Al Imran Tonmoy · Built with dark energy & orange ambition · Dhaka, Bangladesh"
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
    }
  } catch (e) {
    console.warn('Using default data — server unavailable.', e.message);
  }
}


/* ═══════════════════════════════════════════
   PARTICLE SYSTEM
   Lightweight canvas-based floating particles
   with connecting lines between nearby ones.
   ═══════════════════════════════════════════ */
class ParticleField {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -9999, y: -9999 };
    this.maxParticles = window.innerWidth < 768 ? 35 : 65;
    this.connectionDist = 140;
    this.rafId = null;
    this._resize = this.resize.bind(this);
    this._mouseMove = this.onMouseMove.bind(this);
    this._mouseLeave = this.onMouseLeave.bind(this);

    window.addEventListener('resize', this._resize);
    canvas.parentElement.addEventListener('mousemove', this._mouseMove);
    canvas.parentElement.addEventListener('mouseleave', this._mouseLeave);

    this.resize();
    this.init();
    this.animate();
  }

  resize() {
    const hero = this.canvas.parentElement;
    this.canvas.width = hero.offsetWidth;
    this.canvas.height = hero.offsetHeight;
  }

  init() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.5,
        alpha: Math.random() * 0.4 + 0.15
      });
    }
  }

  onMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
  }

  onMouseLeave() {
    this.mouse.x = -9999;
    this.mouse.y = -9999;
  }

  animate() {
    const { ctx, canvas, particles, mouse } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 93, 4, ${p.alpha})`;
      ctx.fill();

      // Connect to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.connectionDist) {
          const opacity = (1 - dist / this.connectionDist) * 0.12;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(232, 93, 4, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Mouse interaction — gentle repulsion
      const mdx = p.x - mouse.x;
      const mdy = p.y - mouse.y;
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mDist < 120) {
        const force = (120 - mDist) / 120 * 0.015;
        p.vx += (mdx / mDist) * force;
        p.vy += (mdy / mDist) * force;
      }

      // Dampen velocity
      p.vx *= 0.999;
      p.vy *= 0.999;
    }

    this.rafId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', this._resize);
    this.canvas.parentElement.removeEventListener('mousemove', this._mouseMove);
    this.canvas.parentElement.removeEventListener('mouseleave', this._mouseLeave);
  }
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
   RENDER PORTFOLIO
   ═══════════════════════════════════════════ */
function renderPortfolio() {
  const d = DATA;

  /* Hero */
  const words = d.hero.name.split(' ');
  const lastWord = words.pop();
  $('hero-name-el').innerHTML =
    (words.join(' ') + ' ') + `<span class="accent">${esc(lastWord)}</span>`;
  $('hero-tagline-el').innerHTML =
    `<span class="hl">"${esc(d.hero.tagline)}"</span>`;
  const c1 = $('hero-cta1-el');
  const c2 = $('hero-cta2-el');
  c1.textContent = d.hero.cta1;
  c2.textContent = d.hero.cta2;
  c2.href = d.hero.cvUrl || '#';

  /* About */
  $('about-title-el').textContent = d.about.title;
  $('about-text-el').innerHTML =
    (d.about.paragraphs || []).map(p => `<p>${esc(p)}</p>`).join('');
  $('interests-el').innerHTML =
    (d.about.interests || []).map(i => `<span class="tag">${esc(i)}</span>`).join('');

  /* Skills */
  $('skills-el').innerHTML =
    (d.skills || []).map(s => `
      <div class="glass-card skill-card">
        <div class="skill-card-title">${esc(s.category)}</div>
        <div class="skill-chips">
          ${(s.chips || []).map(c => `<span class="chip">${esc(c)}</span>`).join('')}
        </div>
      </div>`).join('');

  /* Experience */
  $('experience-el').innerHTML =
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

  /* Projects */
  $('projects-el').innerHTML =
    (d.projects || []).map(p => `
      <div class="glass-card project-card">
        <div class="project-card-title">${esc(p.title)}</div>
        <div class="project-card-desc">${esc(p.desc)}</div>
        <div class="project-tags">
          ${(p.tags || []).map(t => `<span class="project-tag">${esc(t)}</span>`).join('')}
        </div>
      </div>`).join('');

  /* Education */
  $('education-el').innerHTML =
    (d.education || []).map(e => `
      <div class="glass-card edu-card">
        <div class="edu-degree">${esc(e.degree)}</div>
        <div class="edu-school">${esc(e.school)}</div>
        <div class="edu-meta">${esc(e.meta)}</div>
      </div>`).join('');

  /* Next */
  $('next-el').innerHTML =
    (d.next || []).map(n => `
      <div class="glass-card next-card">
        <div class="next-emoji">${n.emoji}</div>
        <div class="next-label">${esc(n.label)}</div>
        <div class="next-text">${esc(n.text)}</div>
      </div>`).join('');

  /* Contact */
  $('contact-title-el').textContent = d.contact.title;
  $('contact-tagline-el').textContent = d.contact.tagline;
  $('contact-links-el').innerHTML = `
    <a class="contact-link email" href="mailto:${esc(d.contact.email)}">✉ ${esc(d.contact.email)}</a>
    <a class="contact-link social" href="${esc(d.contact.linkedin)}" target="_blank" rel="noopener">in LinkedIn</a>
    <a class="contact-link social" href="${esc(d.contact.github)}" target="_blank" rel="noopener">⌥ GitHub</a>`;

  /* Footer */
  $('footer-el').textContent = d.footer;
}


/* ═══════════════════════════════════════════
   SCROLL EFFECTS
   ═══════════════════════════════════════════ */
function initScrollObserver() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .stagger-children').forEach(el => obs.observe(el));
}

/* Active nav link based on scroll */
function initActiveNav() {
  const sections = document.querySelectorAll('[data-nav-section]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinks.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('data-nav-section');
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.2, rootMargin: '-64px 0px -50% 0px' });

  sections.forEach(s => obs.observe(s));
}

/* Nav background on scroll */
function initNavScroll() {
  const nav = document.querySelector('nav');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  });
}


/* ═══════════════════════════════════════════
   MOBILE NAV
   ═══════════════════════════════════════════ */
function initMobileNav() {
  const hamburger = $('hamburger');
  const overlay = $('mobileNavOverlay');
  if (!hamburger || !overlay) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  });

  overlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}


/* ═══════════════════════════════════════════
   ADMIN PANEL
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

  return '<p style="color:var(--muted)">Panel coming soon.</p>';
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
  try {
    const res = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(DATA)
    });
    if (res.ok) {
      renderPortfolio();
      showToast('✓ Changes saved and applied!');
    } else {
      showToast('❌ Failed to save data');
    }
  } catch (err) {
    showToast('❌ Error saving data');
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
  buildAdminUI();
  renderPortfolio();
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
  const pwd = prompt("Enter Admin Password:");
  if (pwd !== "tonmoy5663") {
    alert("Incorrect Password!");
    return;
  }
  buildAdminUI();
  $('adminModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAdmin() {
  $('adminModal').classList.remove('open');
  document.body.style.overflow = '';
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

  // Load data from MongoDB, render, and reveal
  await loadData();
  renderPortfolio();
  document.body.classList.add('loaded');

  // Start effects
  typewrite();
  initScrollObserver();
  initActiveNav();
  initNavScroll();
  initMobileNav();

  // Particle system
  const canvas = $('particles-canvas');
  if (canvas) new ParticleField(canvas);

  // Close modal on overlay click
  $('adminModal').addEventListener('click', function (e) {
    if (e.target === this) closeAdmin();
  });
});
