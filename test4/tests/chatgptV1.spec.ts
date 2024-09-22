import { test, expect } from '@playwright/test';

test.describe('To-Do List functionality', () => {
  
  test.beforeEach(async ({ page }) => {
        await page.goto('http://127.0.0.1:8080/');
  });

  test('should add a new item to the list', async ({ page }) => {
    const input = page.locator('#itemInput');
    const addButton = page.locator('[data-testid="add-button"]');
    const itemList = page.locator('#itemList');

    await input.fill('測試項目1');
    await addButton.click();

    await expect(itemList).toContainText('測試項目1');
  });

  test('should edit an existing item', async ({ page }) => {
    const input = page.locator('#itemInput');
    const addButton = page.locator('[data-testid="add-button"]');
    const editButton = page.locator('[data-testid="edit-button"]');

    // 新增一個項目
    await input.fill('測試項目2');
    await addButton.click();

    // 編輯該項目
    await editButton.click();
    await input.fill('已編輯項目');
    await addButton.click();

    await expect(page.locator('#itemList li')).toContainText('已編輯項目');
  });

  test('should delete an item from the list', async ({ page }) => {
    const input = page.locator('#itemInput');
    const addButton = page.locator('[data-testid="add-button"]');
    const deleteButton = page.locator('[data-testid="delete-button"]');

    // 新增一個項目
    await input.fill('測試項目3');
    await addButton.click();

    // 刪除該項目
    await deleteButton.click();

    await expect(page.locator('#itemList')).not.toContainText('測試項目3');
  });

  test('should clear all items from the list', async ({ page }) => {
    const input = page.locator('#itemInput');
    const addButton = page.locator('[data-testid="add-button"]');
    const clearAllButton = page.locator('[data-testid="clear-all-button"]');

    // 新增兩個項目
    await input.fill('測試項目4');
    await addButton.click();
    await input.fill('測試項目5');
    await addButton.click();

    // 清除所有項目
    await clearAllButton.click();

    await expect(page.locator('#itemList')).toBeEmpty();
  });
});
