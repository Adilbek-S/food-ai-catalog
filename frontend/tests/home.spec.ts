import { test, expect } from '@playwright/test';

// Requires both servers running:
//   backend  → PORT=3001 npm run dev  (in /backend)
//   frontend → npm run dev            (in /frontend)

test('page title contains FoodFinder', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/FoodFinder/);
});

test('shows at least 3 restaurant cards on load', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('a[href^="/restaurants/"]');
  // Wait for SWR to resolve and render cards
  await expect(cards.nth(2)).toBeVisible({ timeout: 10_000 });
  expect(await cards.count()).toBeGreaterThanOrEqual(3);
});

test('cuisine filter Итальянская narrows the card list', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('a[href^="/restaurants/"]');
  await expect(cards.nth(2)).toBeVisible({ timeout: 10_000 });
  const totalBefore = await cards.count();

  // Click cuisine filter and wait for the refetch to the backend
  await Promise.all([
    page.waitForResponse((r) =>
      r.url().includes('/restaurants') && r.url().includes('cuisine=italian'),
    ),
    page.getByRole('button', { name: 'Итальянская' }).click(),
  ]);

  await expect(cards.first()).toBeVisible({ timeout: 5_000 });
  const totalAfter = await cards.count();
  expect(totalAfter).toBeGreaterThan(0);
  expect(totalAfter).toBeLessThan(totalBefore);
});

test('clicking a restaurant card navigates to its detail page', async ({ page }) => {
  await page.goto('/');
  const firstCard = page.locator('a[href^="/restaurants/"]').first();
  await firstCard.waitFor({ timeout: 10_000 });
  await firstCard.click();
  await expect(page).toHaveURL(/\/restaurants\/\d+/, { timeout: 10_000 });
});
