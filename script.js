/* ═══════════════════════════════════════
   script.js — Yusuf Usul Portfolio
   ═══════════════════════════════════════ */

/* ─── Cursor ─── */
const cursorEl = document.getElementById('cursor');
const dot      = cursorEl.querySelector('.cursor-dot');
const ring     = cursorEl.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

// Animate ring with lag
function animateCursor() {
  dot.style.left  = mx + 'px';
  dot.style.top   = my + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effect
document.querySelectorAll('a, button, .project-card, .gallery-item, .contact-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursorEl.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => cursorEl.classList.remove('cursor-hover'));
});

/* ─── Mobile menu ─── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  hamburger.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
});

function closeMobile() {
  mobileMenu.classList.remove('open');
  hamburger.textContent = '☰';
}

/* ─── Scroll reveal ─── */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => io.observe(el));

/* ─── Gallery lightbox ─── */
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img     = item.querySelector('img');
    const caption = item.dataset.caption || '';

    // Only open lightbox if a real image is loaded
    if (img && img.complete && img.naturalWidth > 0) {
      lightboxImg.src       = img.src;
      lightboxCaption.textContent = caption;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

/* ─── Project detail overlay ─── */
const projects = {
  p1: {
    emoji: '🎵',
    title: 'MusicMood App',
    meta:  'JavaScript · REST API · CSS',
    color: 'linear-gradient(135deg,#b5cfa8,#d4e8c8)',
    desc:  'MusicMood is een webapplicatie waarmee gebruikers op basis van hun huidige stemming muziekaanbevelingen krijgen. De gebruiker kiest een emotie (blij, rustig, energiek, ...) en de app haalt nummers op via een externe muziek-API.\n\nHet project was een ideale oefening in het werken met asynchrone JavaScript, het verwerken van API-responses en het bouwen van een intuïtieve gebruikersinterface. Bijzondere aandacht ging naar de UX: animaties en kleurgebruik veranderen mee met de gekozen stemming.',
    tech:   ['JavaScript', 'Fetch API', 'CSS Animations', 'Responsive Design'],
    github: 'https://github.com/yusufusul'
  },
  p2: {
    emoji: '🏃',
    title: 'SportTracker',
    meta:  'PHP · MySQL · HTML/CSS',
    color: 'linear-gradient(135deg,#a8c4d4,#c8dde8)',
    desc:  'SportTracker is een full-stack webapplicatie waarmee sporters hun activiteiten kunnen bijhouden. Gebruikers kunnen runs, fietssessies of andere sporten loggen, hun statistieken bekijken in overzichtelijke grafieken en persoonlijke records bewaren.\n\nAan de backend staat PHP met een MySQL-database. De applicatie maakt gebruik van sessies voor authenticatie en CRUD-operaties voor het beheren van activiteiten. Het was mijn eerste serieuze ervaring met een complete MVC-structuur.',
    tech:   ['PHP', 'MySQL', 'HTML', 'CSS', 'Chart.js', 'MVC-architectuur'],
    github: 'https://github.com/yusufusul'
  },
  p3: {
    emoji: '🎨',
    title: 'Portfolio Website',
    meta:  'HTML · CSS · JavaScript',
    color: 'linear-gradient(135deg,#f2c4a0,#f8dcc4)',
    desc:  'Dit portfolio is volledig vanuit nul gebouwd zonder frameworks. Het doel was om mijn kennis van pure webtechnologieën te tonen: semantische HTML, geavanceerde CSS (custom properties, animaties, grid, flexbox) en vanilla JavaScript.\n\nSpeciale features: een custom animated cursor, scroll-reveal animaties via IntersectionObserver, een fotogalerij met lightbox en een volledig responsief ontwerp.',
    tech:   ['Vanilla JavaScript', 'CSS Custom Properties', 'IntersectionObserver', 'Responsive Design', 'CSS Grid'],
    github: 'https://github.com/yusufusul'
  }
};

function openDetail(id) {
  const p = projects[id];
  if (!p) return;

  document.getElementById('detailContent').innerHTML = `
    <div style="height:120px;border-radius:12px;background:${p.color};
         display:flex;align-items:center;justify-content:center;
         font-size:3rem;margin-bottom:1.5rem;">${p.emoji}</div>
    <div class="detail-title">${p.title}</div>
    <div class="detail-meta">${p.meta}</div>
    <div class="detail-desc">${p.desc.replace(/\n\n/g, '<br><br>')}</div>
    <div class="detail-tech">
      <div class="detail-tech-label">Gebruikte technologieën</div>
      <div class="tags">
        ${p.tech.map(t => `<span class="tag blue">${t}</span>`).join('')}
      </div>
    </div>
    <a href="${p.github}" target="_blank" class="btn btn-primary" style="text-decoration:none;margin-top:1rem;">
      Bekijk op GitHub ↗
    </a>
  `;
  document.getElementById('overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDetailBtn() {
  document.getElementById('overlay').classList.remove('active');
  document.body.style.overflow = '';
}

function closeDetail(e) {
  if (e.target === document.getElementById('overlay')) closeDetailBtn();
}

/* ─── Contact form ─── */
function sendMessage() {
  const naam    = document.getElementById('contactNaam').value.trim();
  const email   = document.getElementById('contactEmail').value.trim();
  const bericht = document.getElementById('contactBericht').value.trim();

  if (!naam || !email || !bericht) {
    // Shake empty fields
    ['contactNaam', 'contactEmail', 'contactBericht'].forEach(id => {
      const el = document.getElementById(id);
      if (!el.value.trim()) {
        el.style.borderColor = '#f2a0a0';
        setTimeout(() => el.style.borderColor = '', 1500);
      }
    });
    return;
  }

  // Show success
  const successEl = document.getElementById('formSuccess');
  successEl.style.display = 'block';
  document.getElementById('contactNaam').value    = '';
  document.getElementById('contactEmail').value   = '';
  document.getElementById('contactBericht').value = '';

  setTimeout(() => { successEl.style.display = 'none'; }, 5000);
}

/* ─── Keyboard shortcuts ─── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeDetailBtn();
    closeLightbox();
    closeMobile();
  }
});

/* ─── Nav active state on scroll ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--ink)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
