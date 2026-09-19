import './main.js';
import { menuSections, menuCategories } from '../data/menu.js';
import { formatPrice } from './utils.js';

const listRoot = document.querySelector('[data-menu-root]');
const filterRoot = document.querySelector('[data-menu-filters]');
const modal = document.querySelector('[data-modal]');
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
          const hasImage = Boolean(item.image);
          const thumb = hasImage
            ? `<img class="menu-thumb" src="${item.image}" alt="" loading="lazy" />`
            : `<div class="menu-thumb placeholder" aria-hidden="true"></div>`;
          const featured = item.featured ? `<span class="tag-featured">Signature</span>` : '';
          const desc = item.desc ? `<p>${item.desc}</p>` : '';
          const interactive = hasImage || item.desc;
          return `
            <button
              type="button"
              class="menu-item ${interactive ? 'has-image' : ''}"
              data-section="${section.id}"
              data-index="${index}"
              ${interactive ? '' : 'tabindex="-1"'}
            >
              ${thumb}
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
        <section class="menu-section reveal is-visible" id="${section.id}">
          <div class="menu-section-title">
            <h2>${section.title}</h2>
          </div>
          ${section.note ? `<p class="menu-section-note">${section.note}</p>` : ''}
          <div class="menu-list">${items}</div>
        </section>
      `;
    })
    .join('');

  listRoot.querySelectorAll('.menu-item').forEach((btn) => {
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
  modalPrice.textContent = formatPrice(item) || 'Market price';
  if (item.image) {
    modalImage.hidden = false;
    modalImage.src = item.image;
    modalImage.alt = item.name;
  } else {
    modalImage.hidden = true;
    modalImage.removeAttribute('src');
  }
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
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
