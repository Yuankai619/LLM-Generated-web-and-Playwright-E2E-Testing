import { test, expect } from '@playwright/test';

test.describe('Online Quiz E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 導航到測驗頁面
    await page.goto('/');
  });

  test('Quiz title is visible', async ({ page }) => {
    // 測試對象: 標題
    const title = page.getByTestId('quiz-title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('線上測驗');
  });

  test('Navigate through questions', async ({ page }) => {
    // 測試對象: 問題計數器
    const questionCount = page.getByTestId('question-count');
    await expect(questionCount).toHaveText('第 1 題 / 共 3 題');

    // 測試對象: 下一題按鈕
    const nextButton = page.getByTestId('next-button');
    await nextButton.click();
    await expect(questionCount).toHaveText('第 2 題 / 共 3 題');

    await nextButton.click();
    await expect(questionCount).toHaveText('第 3 題 / 共 3 題');

    // 測試對象: 前一題按鈕
    const prevButton = page.getByRole('button', { name: '前一個問題' });
    await prevButton.click();
    await expect(questionCount).toHaveText('第 2 題 / 共 3 題');
  });

  test('Select answers and submit quiz', async ({ page }) => {
    // 測試對象: 答案選項
    await page.getByTestId('option-a').click();
    await page.getByTestId('next-button').click();

    await page.getByTestId('option-b').click();
    await page.getByTestId('next-button').click();

    await page.getByTestId('option-c').click();

    // 測試對象: 送出按鈕
    const submitButton = page.getByTestId('submit-button');
    await submitButton.click();

    // 測試對象: 測驗結果
    const result = page.getByTestId('quiz-result');
    await expect(result).toBeVisible();
    await expect(result).toHaveText('答對題數：3 / 總題數：3');
  });

  test('Correct and incorrect answers are highlighted', async ({ page }) => {
    // 選擇答案
    await page.getByTestId('option-a').click();  // 正確答案
    await page.getByTestId('next-button').click();

    await page.getByTestId('option-a').click();  // 錯誤答案 (正確答案是 b)
    await page.getByTestId('next-button').click();

    await page.getByTestId('option-c').click();  // 正確答案

    // 提交測驗
    await page.getByTestId('submit-button').click();

    // 測試對象: 答案選項的顏色
    // 檢查第三題 (當前頁面)
    await expect(page.locator('.options')).toHaveClass(/correct-question/);
    
    // 檢查第二題
    await page.getByRole('button', { name: '前一個問題' }).click();
    await expect(page.locator('.options')).toHaveClass(/incorrect-question/);
    
    // 檢查第一題
    await page.getByRole('button', { name: '前一個問題' }).click();
    await expect(page.locator('.options')).toHaveClass(/correct-question/);
  });
});