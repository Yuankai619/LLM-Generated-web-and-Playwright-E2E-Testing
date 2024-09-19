import { test, expect } from '@playwright/test';

// Helper function to simulate player moves
async function makeMove(page, cellIndex) {
  const cell = page.locator(`[data-testid="cell-${cellIndex}"]`);
  const isCellEmpty = await cell.evaluate(node => node.textContent === '');

  if (isCellEmpty) {
    await cell.click();
    await page.waitForTimeout(600); // 等待電腦做出回應
  }
}

test.describe('Tic-Tac-Toe Game', () => {
  
  // 測試需求 1: 確認遊戲開始時會顯示選擇符號的彈跳視窗
  test('should display symbol choice modal at the beginning', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    
    const modalTitle = await page.locator('[data-testid="modal-title"]');
    await expect(modalTitle).toHaveText('選擇你的符號');
    await expect(page.locator('[data-testid="choose-X"]')).toBeVisible();
    await expect(page.locator('[data-testid="choose-O"]')).toBeVisible();
  });

  // 測試需求 2: 玩家選擇 X 或 O 並開始遊戲
  test('should start game after symbol selection', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.click('[data-testid="choose-X"]');

    await expect(page.locator('[data-testid="game-board"]')).toBeVisible();
    await expect(page.locator('[data-testid="symbol-choice-modal"]')).toBeHidden();
  });

  // 測試需求 3: 隨機決定玩家或電腦誰先畫格子
  test('should randomly decide who goes first', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.click('[data-testid="choose-X"]');

    await page.waitForTimeout(600); // 等待電腦可能的回應
    const emptyCells = await page.locator('.cell:empty');
    expect(emptyCells.count()).toBeLessThan(9);  // 確認有格子已被畫上
  });

  // 測試需求 4: 玩家與電腦交互畫格子，不允許覆蓋已畫的格子
  test('should not allow painting over existing moves', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.click('[data-testid="choose-X"]');

    await makeMove(page, 0);  // 玩家選擇格子 0

    const cell0 = page.locator('[data-testid="cell-0"]');
    await cell0.click(); // 試圖再次點擊已選的格子
    await expect(cell0).toHaveText('X');
  });

  // 測試需求 5: 玩家獲勝時顯示 "恭喜!你贏了"
  test('should display "Congratulations! You win" when player wins', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.click('[data-testid="choose-X"]');

    await makeMove(page, 0); // 玩家選擇格子 0
    await makeMove(page, 4); // 玩家選擇格子 4
    await makeMove(page, 8); // 玩家選擇格子 8

    // 檢查是否出現勝利訊息
    await expect(page.locator('[data-testid="result-message"]')).toHaveText('恭喜!你贏了');
  });

  // 測試需求 6: 玩家失敗時顯示 "你輸了!下次再努力"
  test('should display "You lose! Try again" when player loses', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.click('[data-testid="choose-X"]');

    // 玩家和電腦隨機下棋，這裡模擬輸局
    await makeMove(page, 0); // 玩家選擇格子 0
    await makeMove(page, 2); // 玩家選擇格子 2
    await makeMove(page, 8); // 玩家選擇格子 8

    // 確認失敗訊息
    await expect(page.locator('[data-testid="result-message"]')).toHaveText('你輸了!下次再努力');
  });

  // 測試需求 7: 平局時顯示 "這局平手!"
  test('should display "It\'s a tie!" when there is a tie', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.click('[data-testid="choose-X"]');

    await makeMove(page, 0); // 玩家選擇格子 0
    await makeMove(page, 1); // 玩家選擇格子 1
    await makeMove(page, 2); // 玩家選擇格子 2
    await makeMove(page, 4); // 玩家選擇格子 4
    await makeMove(page, 3); // 玩家選擇格子 3
    await makeMove(page, 5); // 玩家選擇格子 5
    await makeMove(page, 7); // 玩家選擇格子 7
    await makeMove(page, 6); // 玩家選擇格子 6
    await makeMove(page, 8); // 玩家選擇格子 8

    await expect(page.locator('[data-testid="result-message"]')).toHaveText('這局平手!');
  });

  // 測試需求 8: 確認遊戲結束後是否正確判斷輸贏是否合法
  test('should verify if the game ends with a correct legal win/loss condition', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.click('[data-testid="choose-X"]');

    // 模擬玩家獲勝局面
    await makeMove(page, 0); // 玩家選擇格子 0
    await makeMove(page, 4); // 玩家選擇格子 4
    await makeMove(page, 8); // 玩家選擇格子 8

    // 確認遊戲是否正確判斷贏局
    const resultMessage = await page.locator('[data-testid="result-message"]').innerText();
    expect(resultMessage === '恭喜!你贏了' || resultMessage === '你輸了!下次再努力').toBe(true);
  });

  // 測試需求 9: 玩家確認結果後遊戲重啟
  test('should restart game after confirming result', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.click('[data-testid="choose-X"]');

    await makeMove(page, 0); // 玩家選擇格子 0
    await makeMove(page, 4); // 玩家選擇格子 4
    await makeMove(page, 8); // 玩家選擇格子 8

    await expect(page.locator('[data-testid="result-message"]')).toHaveText('恭喜!你贏了');
    await page.click('[data-testid="confirm-result"]');

    // 確認遊戲重新開始，並且所有格子清空
    const emptyCells = await page.locator('.cell:empty');
    expect(emptyCells.count()).toBe(9); // 所有格子應該都為空
  });

});
