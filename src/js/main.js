import '../styles/main.css';

const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-links');
const progress = document.querySelector('[data-scroll-progress]');

function onScroll() {
  if (!header) return;
  const y = window.scrollY;
  header.classList.toggle('is-scrolled', y > 16);
  header.classList.toggle('is-compact', y > 120);
  if (progress) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(100, (y / max) * 100) : 0;
    progress.style.width = `${pct}%`;
  }
}

onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

if (toggle && nav) {
  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
}

const reveals = document.querySelectorAll('.reveal');
if (reveals.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-visible'));
}

/* Soft fade-in for images as they load */
document.querySelectorAll('img[data-fade]').forEach((img) => {
  const show = () => img.classList.add('is-loaded');
  if (img.complete) show();
  else img.addEventListener('load', show, { once: true });
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = String(new Date().getFullYear());
