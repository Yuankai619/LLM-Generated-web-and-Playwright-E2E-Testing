import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/井字遊戲/);
});

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await expect(page.getByTestId('symbol-choice-content')).toBeVisible();
  await expect(page.getByTestId('modal-title')).toBeVisible();
  await expect(page.getByTestId('choose-X')).toBeVisible();
  await expect(page.getByTestId('choose-O')).toBeVisible();
  await expect(page.getByTestId('choose-X')).toContainText('X');
  await expect(page.getByTestId('choose-O')).toContainText('O');
  await expect(page.getByTestId('close-modal')).toBeVisible();
  await page.getByTestId('choose-X').click();
  await expect(page.getByRole('heading', { name: '井字遊戲' })).toBeVisible();
  await expect(page.getByRole('heading')).toContainText('井字遊戲');
  await expect(page.getByTestId('game-board')).toBeVisible();
  await expect(page.getByTestId('cell-0')).toBeVisible();
  await expect(page.getByTestId('cell-1')).toBeVisible();
  await expect(page.getByTestId('cell-2')).toBeVisible();
  await expect(page.getByTestId('cell-3')).toBeVisible();
  await expect(page.getByTestId('cell-4')).toBeVisible();
  await expect(page.getByTestId('cell-5')).toBeVisible();
  await expect(page.getByTestId('cell-6')).toBeVisible();
  await expect(page.getByTestId('cell-7')).toBeVisible();
  await expect(page.getByTestId('cell-8')).toBeVisible();
});