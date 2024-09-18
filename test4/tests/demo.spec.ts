// import { test, expect } from '@playwright/test';

// test('測試待辦事項功能', async ({ page }) => {
//   await page.goto('http://127.0.0.1:8080/');

//   // 新增 買三明治
//   await page.getByPlaceholder('輸入項目名稱').click();
//   await page.getByPlaceholder('輸入項目名稱').fill('買三明治');
//   await page.getByRole('button', { name: '新增' }).click();
//   await expect(page.locator('li').last()).toContainText('買三明治');

//   // 新增 買牛奶
//   await page.getByPlaceholder('輸入項目名稱').click();
//   await page.getByPlaceholder('輸入項目名稱').fill('買牛奶');
//   await page.getByRole('button', { name: '新增' }).click();
//   await expect(page.locator('li').last()).toContainText('買牛奶');

//   // 新增 帶筆電出門
//   await page.getByPlaceholder('輸入項目名稱').click();
//   await page.getByPlaceholder('輸入項目名稱').fill('帶筆電出門');
//   await page.getByRole('button', { name: '新增' }).click();
//   await expect(page.locator('li').last()).toContainText('帶筆電出門');

//   // 修改第二項為 買咖啡
//   await page.getByRole('button', { name: '✏️' }).nth(1).click();
//   await page.getByPlaceholder('輸入項目名稱').click();
//   await page.getByPlaceholder('輸入項目名稱').fill('買咖啡');
//   await page.getByRole('button', { name: '編輯' }).click();
//   await expect(page.locator('li').nth(1)).toContainText('買咖啡');

//   // 刪除第一項
//   const initialCount = await page.locator('li').count();
//   await page.getByRole('button', { name: '🗑️' }).first().click();
//   await expect(page.locator('li')).toHaveCount(initialCount - 1);

//   // 刪除全部
//   await page.getByRole('button', { name: '清除所有項目' }).click();
//   await expect(page.locator('li')).toHaveCount(0);
// });
