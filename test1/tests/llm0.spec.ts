import { test, expect } from '@playwright/test';

test.describe('Tic-Tac-Toe Game', () => {

  // 測試需求 1: 確認遊戲開始時會顯示選擇符號的彈跳視窗
  test('should display symbol choice modal at the beginning', async ({ page }) => {
    // Navigate to the game
    await page.goto('http://localhost:8080/');
    
    // 確認彈出視窗顯示，且標題正確
    const modalTitle = await page.locator('[data-testid="modal-title"]');
    await expect(modalTitle).toHaveText('選擇你的符號');

    // 確認按鈕 X 和 O 存在
    await expect(page.locator('[data-testid="choose-X"]')).toBeVisible();
    await expect(page.locator('[data-testid="choose-O"]')).toBeVisible();
  });

  // 測試需求 2: 玩家選擇 X 或 O 並開始遊戲
  test('should start game after symbol selection', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    
    // 點擊選擇 X 按鈕
    await page.click('[data-testid="choose-X"]');

    // 確認棋盤可見，並且沒有選擇彈出視窗
    await expect(page.locator('[data-testid="game-board"]')).toBeVisible();
    await expect(page.locator('[data-testid="symbol-choice-modal"]')).toBeHidden();
  });

  // 測試需求 3: 隨機決定玩家或電腦誰先畫格子
  test('should randomly decide who goes first', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    
    // 選擇 X 開始遊戲
    await page.click('[data-testid="choose-X"]');

    // 確認遊戲啟動後有至少一個棋格被選中（電腦可能會先行動）
    const emptyCells = await page.locator('.cell:empty');
    expect(emptyCells.count()).toBeLessThan(9);  // 確認有格子已被畫上
  });

  // 測試需求 4: 玩家與電腦交互畫格子，不允許覆蓋已畫的格子
  test('should not allow painting over existing moves', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    
    // 玩家選擇 X 開始遊戲
    await page.click('[data-testid="choose-X"]');

    // 玩家選擇格子 0
    const cell0 = page.locator('[data-testid="cell-0"]');
    await cell0.click();

    // 試圖再次點擊同一格子
    await cell0.click();

    // 確認內容未改變
    await expect(cell0).toHaveText('X');
  });

  // 測試需求 5: 玩家獲勝時彈出視窗顯示 "恭喜!你贏了"
  test('should display "Congratulations! You win" when player wins', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    
    // 選擇 X 開始遊戲
    await page.click('[data-testid="choose-X"]');

    // 模擬玩家贏局，依次選擇 0, 1, 2
    await page.click('[data-testid="cell-0"]'); // Player
    await page.click('[data-testid="cell-3"]'); // Computer (random)
    await page.click('[data-testid="cell-1"]'); // Player
    await page.click('[data-testid="cell-4"]'); // Computer (random)
    await page.click('[data-testid="cell-2"]'); // Player wins

    // 確認贏的訊息彈出
    await expect(page.locator('[data-testid="result-message"]')).toHaveText('恭喜!你贏了');
  });

  // 測試需求 6: 玩家失敗時彈出視窗顯示 "你輸了!下次再努力"
  test('should display "You lose! Try again" when player loses', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    
    // 選擇 X 開始遊戲
    await page.click('[data-testid="choose-X"]');

    // 模擬電腦贏局，依次選擇使電腦獲勝的步驟
    await page.click('[data-testid="cell-0"]'); // Player
    await page.click('[data-testid="cell-3"]'); // Computer
    await page.click('[data-testid="cell-1"]'); // Player
    await page.click('[data-testid="cell-4"]'); // Computer
    await page.click('[data-testid="cell-8"]'); // Player
    await page.click('[data-testid="cell-5"]'); // Computer wins

    // 確認輸的訊息彈出
    await expect(page.locator('[data-testid="result-message"]')).toHaveText('你輸了!下次再努力');
  });

  // 測試需求 7: 平局時顯示 "這局平手!"
  test('should display "It\'s a tie!" when there is a tie', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    
    // 選擇 X 開始遊戲
    await page.click('[data-testid="choose-X"]');

    // 模擬平局
    await page.click('[data-testid="cell-0"]'); // Player
    await page.click('[data-testid="cell-1"]'); // Computer
    await page.click('[data-testid="cell-2"]'); // Player
    await page.click('[data-testid="cell-4"]'); // Computer
    await page.click('[data-testid="cell-3"]'); // Player
    await page.click('[data-testid="cell-5"]'); // Computer
    await page.click('[data-testid="cell-7"]'); // Player
    await page.click('[data-testid="cell-6"]'); // Computer
    await page.click('[data-testid="cell-8"]'); // Player

    // 確認平局訊息彈出
    await expect(page.locator('[data-testid="result-message"]')).toHaveText('這局平手!');
  });

  // 測試需求 8: 玩家確認結果後遊戲重啟
  test('should restart game after confirming result', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    
    // 選擇 X 開始遊戲
    await page.click('[data-testid="choose-X"]');

    // 模擬玩家贏局
    await page.click('[data-testid="cell-0"]'); // Player
    await page.click('[data-testid="cell-3"]'); // Computer (random)
    await page.click('[data-testid="cell-1"]'); // Player
    await page.click('[data-testid="cell-4"]'); // Computer (random)
    await page.click('[data-testid="cell-2"]'); // Player wins

    // 確認贏的訊息彈出
    await expect(page.locator('[data-testid="result-message"]')).toHaveText('恭喜!你贏了');

    // 點擊確認按鈕重新開始遊戲
    await page.click('[data-testid="confirm-result"]');

    // 確認遊戲已重新開始
    await expect(page.locator('[data-testid="game-board"]')).toBeVisible();
    const emptyCells = await page.locator('.cell:empty');
    expect(emptyCells.count()).toBe(9); // 所有格子應該都是空的
  });

});
