import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  // 新增 "買三明治"
  await page.getByPlaceholder('輸入項目名稱').click();
  await page.getByPlaceholder('輸入項目名稱').fill('買三明治');
  await page.getByTestId('add-button').click();
  await expect(page.locator('li').filter({ hasText: '買三明治' })).toHaveCount(1); // 確保新增成功

  // 新增 "買牛奶"
  await page.getByPlaceholder('輸入項目名稱').click();
  await page.getByPlaceholder('輸入項目名稱').fill('買牛奶');
  await page.getByTestId('add-button').click();
  await expect(page.locator('li').filter({ hasText: '買牛奶' })).toHaveCount(1); // 確保新增成功

  // 新增 "帶筆電出門"
  await page.getByPlaceholder('輸入項目名稱').click();
  await page.getByPlaceholder('輸入項目名稱').fill('帶筆電出門');
  await page.getByTestId('add-button').click();
  await expect(page.locator('li').filter({ hasText: '帶筆電出門' })).toHaveCount(1); // 確保新增成功

  // 編輯 "買牛奶" 為 "買咖啡"
  await page.locator('li').filter({ hasText: '買牛奶' }).getByTestId('edit-button').click();
  await page.getByPlaceholder('輸入項目名稱').click();
  await page.getByPlaceholder('輸入項目名稱').fill('買咖啡');
  await page.getByTestId('add-button').click();
  await expect(page.locator('li').filter({ hasText: '買咖啡' })).toHaveCount(1); // 確保編輯成功
  await expect(page.locator('li').filter({ hasText: '買牛奶' })).toHaveCount(0); // 確保 "買牛奶" 被成功編輯

  // 刪除 "買三明治"
  await page.locator('li').filter({ hasText: '買三明治' }).getByTestId('delete-button').click();
  await expect(page.locator('li').filter({ hasText: '買三明治' })).toHaveCount(0); // 確保刪除成功

  // 清除所有項目
  await page.getByTestId('clear-all-button').click();
  await expect(page.locator('li')).toHaveCount(0); // 確保所有項目被清除
});
