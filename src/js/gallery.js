import './main.js';

const gallery = document.querySelector('[data-lightbox-gallery]');
const lightbox = document.querySelector('[data-lightbox]');
const lightboxImg = document.querySelector('[data-lightbox-image]');
const lightboxClose = document.querySelector('[data-lightbox-close]');

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.removeAttribute('src');
  lightboxImg.alt = '';
  document.body.style.overflow = '';
}

gallery?.querySelectorAll('figure img').forEach((img) => {
  img.closest('figure')?.addEventListener('click', () => openLightbox(img.currentSrc || img.src, img.alt));
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
