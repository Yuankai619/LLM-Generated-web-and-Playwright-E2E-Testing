import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/飲料訂購系統/);
});

test('basic element test', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await expect(page.getByTestId('quan')).toBeVisible();
  await expect(page.locator('#order-form').getByRole('cell', { name: '數量' })).toBeVisible();
  await expect(page.locator('#order-form').getByRole('cell', { name: '數量' })).toBeVisible();
  await expect(page.locator('#order-form').getByRole('cell', { name: '金額' })).toBeVisible();
  await expect(page.locator('#order-form').getByRole('cell', { name: '溫度' })).toBeVisible();
  await expect(page.locator('#order-form').getByRole('cell', { name: '甜度' })).toBeVisible();
  await expect(page.locator('#order-form').getByRole('cell', { name: '訂購人' })).toBeVisible();
  await expect(page.locator('#item')).toBeVisible();
  await expect(page.locator('#size')).toBeVisible();
  await page.locator('#size').selectOption('大杯');
  await expect(page.getByRole('heading', { name: '飲料訂購系統' })).toBeVisible();
  await expect(page.getByRole('heading')).toContainText('飲料訂購系統');
  await expect(page.locator('#size')).toBeVisible();
  await expect(page.locator('#price')).toBeVisible();
  await expect(page.getByTestId('quan')).toBeVisible();
  await expect(page.locator('#total')).toBeVisible();
  await expect(page.locator('#temperature')).toBeVisible();
  await expect(page.getByRole('cell', { name: '全糖' })).toBeVisible();
  await expect(page.locator('#customer')).toBeVisible();
  await expect(page.getByText('訂購清單 選擇 品名 容量 單價 數量 金額 溫度 甜度 訂購人 刪除勾選 結帳')).toBeVisible();
  await expect(page.getByRole('heading', { name: '訂購清單' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '選擇' })).toBeVisible();
  await expect(page.locator('#orders').getByRole('cell', { name: '品名' })).toBeVisible();
  await expect(page.locator('#orders').getByRole('cell', { name: '容量' })).toBeVisible();
  await expect(page.locator('#orders').getByRole('cell', { name: '單價' })).toBeVisible();
  await expect(page.locator('#orders').getByRole('cell', { name: '數量' })).toBeVisible();
  await expect(page.locator('#orders').getByRole('cell', { name: '金額' })).toBeVisible();
  await expect(page.locator('#orders').getByRole('cell', { name: '溫度' })).toBeVisible();
  await expect(page.locator('#orders').getByRole('cell', { name: '甜度' })).toBeVisible();
  await expect(page.locator('#orders').getByRole('cell', { name: '訂購人' })).toBeVisible();
  await expect(page.getByRole('button', { name: '刪除勾選' })).toBeVisible();
  await expect(page.getByRole('button', { name: '結帳' })).toBeVisible();
});
//一個普通的test 對於同一個人 他的訂單流程
test('basic process test', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.locator('#item').selectOption('珍珠奶茶');
  await page.locator('#size').selectOption('大杯');
  await page.getByTestId('quan').click();
  await page.getByTestId('quan').fill('2');
  await page.getByTestId('quan').press('Enter');
  await page.locator('#temperature').selectOption('去冰');
  await page.locator('#temperature').selectOption('少冰');
  await page.locator('#customer').click();
  await page.locator('#customer').fill('94Sungla');
  await page.getByRole('button', { name: '確認' }).click();
  await page.getByRole('button', { name: '確認' }).click();
  await page.getByRole('button', { name: '確認' }).click({
    clickCount: 3
  });
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: '結帳' }).click();
});
