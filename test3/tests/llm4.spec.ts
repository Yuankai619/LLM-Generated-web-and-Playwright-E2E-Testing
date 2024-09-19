import { test, expect } from '@playwright/test';

test.describe('飲料訂購系統', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080'); // 根據需要調整 URL
  });

  // 需求 1: 使用者界面元素
  test('使用者界面元素存在且正確佈局', async ({ page }) => {
    // 檢查主要元素是否存在
    await expect(page.getByRole('heading', { name: '來點什麼...' })).toBeVisible();
    await expect(page.getByTestId('price-display')).toBeVisible();
    await expect(page.getByTestId('total-display')).toBeVisible();
    await expect(page.getByRole('button', { name: '確認' })).toBeVisible();

    // 檢查下拉式選單元素
    await expect(page.getByRole('combobox', { name: '品名' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: '容量' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: '溫度' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: '甜度' })).toBeVisible();

    // 檢查輸入元素
    await expect(page.getByRole('spinbutton', { name: '數量' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: '訂購人' })).toBeVisible();
  });

  // 需求 2a, 2b, 2c: 品名和容量選項
  test('品名和容量選項正確填充', async ({ page }) => {
    const itemSelect = page.getByRole('combobox', { name: '品名' });
    await expect(itemSelect).toHaveCount(1);

    const itemOptions = await itemSelect.getByRole('option').all();
    expect(itemOptions.length).toBeGreaterThan(0);
    expect(itemOptions.length).toBeLessThanOrEqual(10);

    // 選擇第一個品項並檢查容量選項
    await itemSelect.selectOption({ index: 0 });
    const sizeSelect = page.getByRole('combobox', { name: '容量' });
    const sizeOptions = await sizeSelect.getByRole('option').all();
    expect(sizeOptions.length).toBeGreaterThan(0);
  });

  // 需求 2d, 3: 價格和總金額計算
  test('價格和總金額計算正確', async ({ page }) => {
    const itemSelect = page.getByRole('combobox', { name: '品名' });
    const sizeSelect = page.getByRole('combobox', { name: '容量' });
    const quantityInput = page.getByRole('spinbutton', { name: '數量' });
    const priceDisplay = page.getByTestId('price-display');
    const totalDisplay = page.getByTestId('total-display');

    await itemSelect.selectOption({ index: 0 });
    await sizeSelect.selectOption({ index: 0 });
    await expect(priceDisplay).not.toHaveText('0');

    await quantityInput.fill('2');
    const price = await priceDisplay.innerText();
    const expectedTotal = (parseInt(price) * 2).toString();
    await expect(totalDisplay).toHaveText(expectedTotal);
  });

  // 需求 4: 溫度選項
  test('溫度選項正確', async ({ page }) => {
    const tempSelect = page.getByRole('combobox', { name: '溫度' });
    
    // 等待選擇器元素出現並可見
    await expect(tempSelect).toBeVisible({ timeout: 5000 });
    
    const expectedOptions = ['熱', '全冰', '少冰', '去冰'];
    
    // 獲取實際的選項
    const actualOptions = await tempSelect.getByRole('option').allInnerTexts();
    
    // 檢查所有預期的選項是否都存在，忽略順序
    for (const option of expectedOptions) {
      expect(actualOptions).toContain(option);
    }
    
    // 檢查選項數量是否正確
    expect(actualOptions.length).toBe(expectedOptions.length);
    
    // 如果需要檢查順序，可以使用以下代碼：
    // expect(actualOptions).toEqual(expectedOptions);
  });

  // 需求 5: 甜度選項
  test('甜度選項正確', async ({ page }) => {
    const sweetSelect = page.getByRole('combobox', { name: '甜度' });
    
    // 等待選擇器元素出現並可交互
    await expect(sweetSelect).toBeEnabled({ timeout: 5000 });
  
    // 點擊 combobox 以打開選項列表
    await sweetSelect.click();
  
    const expectedOptions = ['全糖', '8分糖', '5分糖', '3分糖', '1分糖', '無糖'];
    
    for (const option of expectedOptions) {
      // 使用 getByRole 和 name 選項來定位每個選項
      const optionElement = sweetSelect.getByRole('option', { name: option });
      
      // 等待選項存在於 DOM 中
      await expect(optionElement).toBeAttached({ timeout: 2000 });
      
      // 檢查選項是否可以被選擇
      await expect(optionElement).toBeEnabled();
      
      // 額外檢查：確保選項文本正確
      const optionText = await optionElement.innerText();
      expect(optionText.trim()).toBe(option);
    }
  
    // 檢查選項數量是否正確
    const allOptions = await sweetSelect.getByRole('option').all();
    expect(allOptions.length).toBe(expectedOptions.length);
  
    // 選擇一個選項來驗證功能
    await sweetSelect.selectOption(expectedOptions[0]);
    await expect(sweetSelect).toHaveValue(expectedOptions[0]);
  
    // 關閉 combobox（可選，取決於您的 UI 行為）
    await page.keyboard.press('Escape');
  });

  // 需求 6, 7: 訂單確認和顯示在訂購清單中
  test('確認後訂單添加到訂購清單', async ({ page }) => {
    await fillOrderForm(page);
    await page.getByRole('button', { name: '確認' }).click();
    const orderList = page.getByTestId('order-list');
    await expect(orderList.getByRole('row')).toHaveCount(2); // 表頭 + 1 個訂單
    await expect(orderList.getByRole('checkbox')).toBeVisible();
  });

  // 需求 8: 刪除選定的訂單
  test('可以刪除選定的訂單', async ({ page }) => {
    await fillOrderForm(page);
    await page.getByRole('button', { name: '確認' }).click();
    await page.getByTestId('order-list').getByRole('checkbox').check();
    await page.getByRole('button', { name: '刪除勾選' }).click();
    await expect(page.getByTestId('order-list').getByRole('row')).toHaveCount(1); // 只剩表頭
  });

  // 需求 9: 訂單摘要
  test('訂單摘要正確更新', async ({ page }) => {
    await fillOrderForm(page);
    await page.getByRole('button', { name: '確認' }).click();
    const summary = page.getByTestId('order-summary');
    await expect(summary).toContainText('總數量: 1');
    await expect(summary).toContainText('總金額: 30');
  });

  // 需求 10: 自動填充客戶姓名
  test('第一筆訂單後自動填充客戶姓名', async ({ page }) => {
    await fillOrderForm(page, '測試客戶');
    await page.getByRole('button', { name: '確認' }).click();
    await fillOrderForm(page);
    const customerInput = page.getByRole('textbox', { name: '訂購人' });
    await expect(customerInput).toHaveValue('測試客戶');
  });

  // 需求 11: 結帳流程
  test('結帳流程顯示訂單摘要並清空訂購清單', async ({ page }) => {
    // 添加訂單
    await fillOrderForm(page);
    await page.getByRole('button', { name: '確認' }).click();
    
    // 確保訂單已經添加到清單中
    await expect(page.getByTestId('order-list').getByRole('row')).toHaveCount(2); // 表頭 + 1 個訂單
    
    const checkoutButton = page.getByRole('button', { name: '結帳' });
    
    // 等待結帳按鈕可用
    await expect(checkoutButton).toBeEnabled();
  
    // 設置對話框處理
    page.on('dialog', async dialog => {
      console.log('對話框信息:', dialog.message());
      expect(dialog.message()).toContain('訂單摘要');
      expect(dialog.message()).toContain('總金額');
      await dialog.accept();
    });
  
    // 點擊結帳按鈕
    await checkoutButton.click();
  
    // 等待一段時間，確保對話框已經處理完畢
    await page.waitForTimeout(1000);
  
    // 檢查訂購清單是否被清空
    await expect(page.getByTestId('order-list').getByRole('row')).toHaveCount(1, { timeout: 5000 }); // 只剩表頭
  
    // 檢查訂單摘要是否被重置
    const summary = page.getByTestId('order-summary');
    await expect(summary).toContainText('總數量: 0');
    await expect(summary).toContainText('總金額: 0');
  });
});

async function fillOrderForm(page, customerName = '測試客戶') {
  await page.getByRole('combobox', { name: '品名' }).selectOption({ index: 0 });
  await page.getByRole('combobox', { name: '容量' }).selectOption({ index: 0 });
  await page.getByRole('spinbutton', { name: '數量' }).fill('1');
  await page.getByRole('combobox', { name: '溫度' }).selectOption('全冰');
  await page.getByRole('combobox', { name: '甜度' }).selectOption('全糖');
  await page.getByRole('textbox', { name: '訂購人' }).fill(customerName);
}