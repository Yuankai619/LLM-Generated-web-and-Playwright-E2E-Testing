import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/飲料訂購系統/);
});

test('basic element test', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await expect(page.getByRole('heading', { name: '來點什麼' })).toBeVisible();
  await expect(page.locator('#order-form').getByRole('cell', { name: '品名' })).toBeVisible();
  await expect(page.locator('#order-form').getByRole('cell', { name: '容量' })).toBeVisible();
  await expect(page.locator('#order-form').getByRole('cell', { name: '單價' })).toBeVisible();
  await expect(page.locator('#order-form').getByRole('cell', { name: '數量' })).toBeVisible();
  await expect(page.locator('#order-form').getByRole('cell', { name: '金額' })).toBeVisible();
  await expect(page.locator('#order-form').getByRole('cell', { name: '溫度' })).toBeVisible();
  await expect(page.locator('#order-form').getByRole('cell', { name: '甜度' })).toBeVisible();
  await expect(page.locator('#order-form').getByRole('cell', { name: '訂購人' })).toBeVisible();
  await expect(page.getByRole('button', { name: '確認' })).toBeVisible();
  await expect(page.locator('#item')).toBeVisible();
  await expect(page.locator('#size')).toBeVisible();
  await expect(page.locator('#price')).toBeVisible();
  await expect(page.locator('#quantity')).toBeVisible();
  await expect(page.locator('#quantity')).toBeVisible();
  await expect(page.locator('#total')).toBeVisible();
  await expect(page.locator('#temperature')).toBeVisible();
  await expect(page.locator('#sweetness')).toBeVisible();
  await expect(page.locator('#customer')).toBeVisible();
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
  await page.locator('#quantity').click();
  await page.locator('#quantity').fill('2');
  await page.locator('#temperature').selectOption('少冰');
  await page.locator('#sweetness').selectOption('5分糖');
  await page.locator('#customer').click();
  await page.locator('#customer').fill('94sunglaaaaa');
  await page.getByRole('button', { name: '確認' }).click();
  await page.getByRole('button', { name: '確認' }).click();
  await page.locator('#customer').click();
  await page.locator('#customer').fill('94sungla');
  await page.locator('#size').selectOption('中杯');
  await page.locator('#quantity').click();
  await page.locator('#quantity').fill('21');
  await page.locator('#temperature').selectOption('全冰');
  await page.locator('#item').selectOption('綠茶');
  await page.getByRole('button', { name: '確認' }).click();
  await page.getByRole('button', { name: '確認' }).click();
  await page.getByRole('button', { name: '確認' }).click();
  await page.getByRole('checkbox').nth(2).check();
  await page.getByRole('button', { name: '刪除勾選' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: '結帳' }).click();
});
