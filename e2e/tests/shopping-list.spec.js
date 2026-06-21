const { test, expect } = require('@playwright/test');

test.describe('Dragon Ball mission list', () => {
  test('mostra a lista inicial de itens da missão', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('text=Lista de Compras da equipe Z')).toBeVisible();
    await expect(page.locator('ul.item-list li').first()).toBeVisible();
  });

  test('adiciona um novo item da missão', async ({ page }) => {
    const itemName = `Kamehameha Capsule ${Date.now()}`;

    await page.goto('/');
    await page.fill('input[aria-label="Novo item"]', itemName);
    await page.click('text=Adicionar');

    await expect(page.locator(`text=${itemName}`)).toBeVisible();
  });

  test('remove um item adicionado', async ({ page }) => {
    const itemName = `Senzu Bean extra ${Date.now()}`;
    const itemRow = page.locator('ul.item-list li', { hasText: itemName });

    await page.goto('/');
    await page.fill('input[aria-label="Novo item"]', itemName);
    await page.click('text=Adicionar');

    await expect(itemRow).toHaveCount(1);
    await itemRow.locator('button:has-text("Remover")').click();
    await expect(itemRow).toHaveCount(0);
  });

  test('exibe erro ao tentar adicionar item vazio', async ({ page }) => {
    await page.goto('/');

    await page.click('text=Adicionar');
    await expect(page.locator('text=Digite um item da missão.')).toBeVisible();
  });
});
