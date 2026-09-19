import { chromium } from 'playwright';
const base = 'https://nativa-coffee-bar.pages.dev';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1400);
await page.screenshot({ path: '/opt/cursor/artifacts/screenshots/home_hero_final.png', fullPage: false });

await page.goto(base + '/menu.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(900);
await page.screenshot({ path: '/opt/cursor/artifacts/screenshots/menu_overview_final.png', fullPage: false });

await page.locator('.menu-item.has-image').first().click();
await page.waitForTimeout(700);
await page.screenshot({ path: '/opt/cursor/artifacts/screenshots/menu_modal_final.png', fullPage: false });
await page.locator('[data-modal-close]').click({ force: true });
await page.waitForTimeout(300);

await page.locator('[data-filter="cocktails"]').click();
await page.waitForTimeout(600);
await page.screenshot({ path: '/opt/cursor/artifacts/screenshots/menu_cocktails_final.png', fullPage: false });

await page.goto(base + '/gallery.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(900);
await page.screenshot({ path: '/opt/cursor/artifacts/screenshots/gallery_final.png', fullPage: false });

await page.goto(base + '/visit.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(900);
await page.screenshot({ path: '/opt/cursor/artifacts/screenshots/visit_final.png', fullPage: false });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(base + '/', { waitUntil: 'networkidle' });
await mobile.waitForTimeout(1200);
await mobile.screenshot({ path: '/opt/cursor/artifacts/screenshots/home_mobile_final.png', fullPage: false });
await mobile.goto(base + '/menu.html', { waitUntil: 'networkidle' });
await mobile.waitForTimeout(900);
await mobile.screenshot({ path: '/opt/cursor/artifacts/screenshots/menu_mobile_final.png', fullPage: false });

await browser.close();
console.log('done');
