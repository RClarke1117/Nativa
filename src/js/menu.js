import './main.js';
import { menuSections, menuCategories } from '../data/menu.js';
import { formatPrice } from './utils.js';

const listRoot = document.querySelector('[data-menu-root]');
const filterRoot = document.querySelector('[data-menu-filters]');
const modal = document.querySelector('[data-modal]');
const modalMedia = document.querySelector('[data-modal-media]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalDesc = document.querySelector('[data-modal-desc]');
const modalPrice = document.querySelector('[data-modal-price]');
const modalImage = document.querySelector('[data-modal-image]');
const modalClose = document.querySelector('[data-modal-close]');

function priceHtml(item) {
  if (!item.price) return '<div class="menu-price"></div>';
  const label = item.priceLabel
    ? `<small>${item.priceLabel}</small>`
    : item.priceAlt
      ? `<small>sm / lg</small>`
      : '';
  return `<div class="menu-price">${formatPrice(item)}${label}</div>`;
}

function renderSections(activeCategory = 'all') {
  if (!listRoot) return;
  const sections = menuSections.filter(
    (section) => activeCategory === 'all' || section.category === activeCategory
  );

  listRoot.innerHTML = sections
    .map((section) => {
      const items = section.items
        .map((item, index) => {
          const featured = item.featured ? `<span class="tag-featured">Signature</span>` : '';
          const desc = item.desc ? `<p>${item.desc}</p>` : '';
          return `
            <button
              type="button"
              class="menu-item menu-item-text"
              data-section="${section.id}"
              data-index="${index}"
            >
              <div class="menu-item-body">
                <h3>${item.name}${featured}</h3>
                ${desc}
              </div>
              ${priceHtml(item)}
            </button>
          `;
        })
        .join('');

      return `
        <section class="menu-section" id="${section.id}">
          <div class="menu-section-title">
            <h2>${section.title}</h2>
          </div>
          ${section.note ? `<p class="menu-section-note">${section.note}</p>` : ''}
          <div class="menu-list">${items}</div>
        </section>
      `;
    })
    .join('');

  listRoot.querySelectorAll('.menu-item').forEach((btn, i) => {
    btn.style.setProperty('--i', String(i % 12));
    btn.classList.add('menu-item-enter');
    btn.addEventListener('click', () => {
      const section = menuSections.find((s) => s.id === btn.dataset.section);
      const item = section?.items[Number(btn.dataset.index)];
      if (item) openModal(item, section.title);
    });
  });
}

function openModal(item, sectionTitle) {
  if (!modal) return;
  modalTitle.textContent = item.name;
  modalDesc.textContent = item.desc || `${sectionTitle} · Nativa Coffee Bar`;
  modalPrice.textContent = formatPrice(item) || 'Ask your server';

  if (item.image) {
    modalMedia?.removeAttribute('hidden');
    modalImage.removeAttribute('hidden');
    modalImage.alt = item.name;
    modalImage.src = item.image;
  } else {
    modalMedia?.setAttribute('hidden', '');
    modalImage.setAttribute('hidden', '');
    modalImage.removeAttribute('src');
    modalImage.alt = '';
  }

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modalClose?.focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  modalImage.removeAttribute('src');
  modalImage.alt = '';
  modalMedia?.setAttribute('hidden', '');
}

if (filterRoot) {
  const buttons = [{ id: 'all', label: 'All' }, ...menuCategories];

  filterRoot.innerHTML = buttons
    .map(
      (btn, i) => `
      <button type="button" class="filter-btn ${i === 0 ? 'is-active' : ''}" data-filter="${btn.id}">
        ${btn.label}
      </button>`
    )
    .join('');

  filterRoot.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-filter]');
    if (!btn) return;
    filterRoot.querySelectorAll('.filter-btn').forEach((el) => el.classList.remove('is-active'));
    btn.classList.add('is-active');
    renderSections(btn.dataset.filter);
    btn.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  });
}

renderSections('all');

modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

const params = new URLSearchParams(window.location.search);
const cat = params.get('cat');
if (cat && filterRoot) {
  const btn = filterRoot.querySelector(`[data-filter="${cat}"]`);
  if (btn) btn.click();
}
