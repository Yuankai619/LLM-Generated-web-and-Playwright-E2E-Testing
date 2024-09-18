import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/飲料訂購系統/);
});

test('basic element test', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await expect(page.getByRole('heading', { name: '來點什麼' })).toBeVisible();
  await expect(page.getByText('來點什麼... 品名 容量 單價 數量 金額 溫度 甜度 訂購人 綠茶珍珠奶茶 中杯大杯 30 30 熱 全冰 少冰 去冰 全糖 8分糖 5分糖 3分糖 1')).toBeVisible();
  await expect(page.getByTestId('order-form').getByRole('cell', { name: '品名' })).toBeVisible();
  await expect(page.getByTestId('order-form').getByRole('cell', { name: '容量' })).toBeVisible();
  await expect(page.getByTestId('order-form').getByText('單價')).toBeVisible();
  await expect(page.getByTestId('order-form').getByRole('cell', { name: '數量' })).toBeVisible();
  await expect(page.getByTestId('order-form').getByRole('cell', { name: '金額', exact: true })).toBeVisible();
  await expect(page.getByTestId('order-form').getByRole('cell', { name: '溫度' })).toBeVisible();
  await expect(page.getByTestId('order-form').getByRole('cell', { name: '甜度' })).toBeVisible();
  await expect(page.getByTestId('order-form').getByRole('cell', { name: '訂購人' })).toBeVisible();
  await expect(page.getByTestId('item-select')).toBeVisible();
  await expect(page.getByRole('cell', { name: '綠茶' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '中杯' })).toBeVisible();
  await expect(page.getByTestId('size-select')).toBeVisible();
  await expect(page.getByRole('cell', { name: '單價' }).nth(1)).toBeVisible();
  await expect(page.getByTestId('price-display')).toBeVisible();
  await expect(page.getByRole('cell', { name: '1' })).toBeVisible();
  await expect(page.getByTestId('quantity-input')).toBeVisible();
  await expect(page.getByRole('cell', { name: '總金額' })).toBeVisible();
  await expect(page.getByTestId('total-display')).toBeVisible();
  await expect(page.getByRole('cell', { name: '熱' })).toBeVisible();
  await expect(page.getByTestId('temperature-select')).toBeVisible();
  await expect(page.getByRole('cell', { name: '全糖' })).toBeVisible();
  await expect(page.getByTestId('sweetness-select')).toBeVisible();
  await expect(page.locator('td:nth-child(8)')).toBeVisible();
  await expect(page.getByTestId('customer-input')).toBeVisible();
  await expect(page.getByTestId('confirm-button')).toBeVisible();
  await expect(page.getByRole('heading', { name: '訂購清單' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '選擇' })).toBeVisible();
  await expect(page.getByTestId('order-list').getByRole('cell', { name: '品名' })).toBeVisible();
  await expect(page.getByTestId('order-list').getByRole('cell', { name: '容量' })).toBeVisible();
  await expect(page.getByTestId('order-list').getByRole('cell', { name: '單價' })).toBeVisible();
  await expect(page.getByTestId('order-list').getByRole('cell', { name: '數量' })).toBeVisible();
  await expect(page.getByTestId('order-list').getByRole('cell', { name: '金額' })).toBeVisible();
  await expect(page.getByTestId('order-list').getByRole('cell', { name: '溫度' })).toBeVisible();
  await expect(page.getByTestId('order-list').getByRole('cell', { name: '甜度' })).toBeVisible();
  await expect(page.getByTestId('order-list').getByRole('cell', { name: '訂購人' })).toBeVisible();
  await expect(page.getByTestId('delete-selected-button')).toBeVisible();
  await expect(page.getByTestId('checkout-button')).toBeVisible();
});
//一個普通的test 對於同一個人 他的訂單流程
test('basic process test', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.getByTestId('item-select').selectOption('珍珠奶茶');
  await page.getByTestId('size-select').selectOption('大杯');
  await page.getByTestId('quantity-input').click();
  await page.getByTestId('quantity-input').fill('3');
  await page.getByTestId('quantity-input').press('Enter');
  await page.getByTestId('temperature-select').selectOption('全冰');
  await page.getByTestId('sweetness-select').selectOption('3分糖');
  await page.getByTestId('customer-input').click();
  await page.getByTestId('customer-input').fill('987362');
  await page.getByTestId('confirm-button').click();
  await page.getByTestId('confirm-button').dblclick();
  await page.getByRole('checkbox').nth(1).check();
  await page.getByTestId('delete-selected-button').click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByTestId('checkout-button').click();
});