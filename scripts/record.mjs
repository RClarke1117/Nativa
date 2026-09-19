import { chromium } from 'playwright';
const base = 'https://nativa-coffee-bar.pages.dev';
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: { dir: '/tmp/nativa-video', size: { width: 1280, height: 720 } },
});
const page = await context.newPage();
await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.mouse.wheel(0, 600);
await page.waitForTimeout(800);
await page.click('a.btn-primary');
await page.waitForTimeout(1200);
await page.locator('[data-filter="specialty"]').click();
await page.waitForTimeout(800);
await page.locator('.menu-item.has-image').first().click();
await page.waitForTimeout(1200);
await page.locator('[data-modal-close]').click({ force: true });
await page.waitForTimeout(500);
await page.locator('[data-filter="cocktails"]').click();
await page.waitForTimeout(1000);
await page.goto(base + '/gallery.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await page.mouse.wheel(0, 500);
await page.waitForTimeout(800);
await context.close();
await browser.close();
console.log('video recorded');
