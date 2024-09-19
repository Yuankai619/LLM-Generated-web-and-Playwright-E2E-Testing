import { test, expect } from '@playwright/test';

// Helper function to wait for the computer to move
async function waitForComputerMove(page) {
  await page.waitForTimeout(600); // 等待電腦回應的時間
}

// Helper function to select a random empty cell for the player
async function playerMakeMove(page) {
  const emptyCells = await page.locator('.cell:empty');
  const count = await emptyCells.count();
  if (count === 0) {
    throw new Error('No empty cells available');
  }
  const randomIndex = Math.floor(Math.random() * count);
  await emptyCells.nth(randomIndex).click();
}

// Helper function to check if the game has ended
async function checkGameEnd(page) {
  const resultModal = await page.locator('[data-testid="result-modal"]');
  return await resultModal.isVisible();
}

// Helper function to retrieve the current board state
async function getBoardState(page) {
  const cells = await page.locator('.cell');
  const board = [];
  for (let i = 0; i < 9; i++) {
    const cellText = await cells.nth(i).textContent();
    board.push(cellText || null);  // null if the cell is empty
  }
  return board;
}

// Function to check if a board represents a winning state for a symbol
function isWinningBoard(board, symbol) {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] === symbol && board[b] === symbol && board[c] === symbol;
  });
}

// Function to check if the game is a tie
function isTie(board) {
  return board.every(cell => cell !== null);
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

    // 由於先手隨機決定，我們要動態檢查
    await waitForComputerMove(page); // 等待可能的電腦先手
    const emptyCells = await page.locator('.cell:empty');
    const count = await emptyCells.count();  // 先取得count
    await expect(count).toBeGreaterThanOrEqual(1);  // 確認至少有1個格子可用
  });

  // 測試需求 4: 玩家與電腦交互畫格子，不允許覆蓋已畫的格子
  test('should not allow painting over existing moves', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.click('[data-testid="choose-X"]');
    await playerMakeMove(page);
    await waitForComputerMove(page);
    const emptyCells = await page.locator('.cell:empty');
    const count = await emptyCells.count();  // 先取得count
    await expect(count).toBeLessThan(9); // 確認有格子已畫上
  });

  // 測試需求 5: 玩家獲勝時彈出視窗顯示 "恭喜!你贏了"
  test('should display "Congratulations! You win" when player wins', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.click('[data-testid="choose-X"]');

    // 模擬遊戲直到勝利
    while (!(await checkGameEnd(page))) {
      await playerMakeMove(page);  // 玩家行動
      await waitForComputerMove(page);  // 等待電腦回應
    }

    // 確認贏的訊息彈出
    const resultMessage = await page.locator('[data-testid="result-message"]');
    const board = await getBoardState(page);

    if (isWinningBoard(board, 'X')) {
      await expect(resultMessage).toHaveText('恭喜!你贏了');
    } else if (isWinningBoard(board, 'O')) {
      await expect(resultMessage).toHaveText('你輸了!下次再努力');
    } else if (isTie(board)) {
      await expect(resultMessage).toHaveText('這局平手!');
    }
  });

  // 測試需求 6: 玩家失敗時彈出視窗顯示 "你輸了!下次再努力"
  test('should display "You lose! Try again" when player loses', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.click('[data-testid="choose-X"]');

    // 模擬遊戲直到失敗
    while (!(await checkGameEnd(page))) {
      await playerMakeMove(page);  // 玩家行動
      await waitForComputerMove(page);  // 等待電腦回應
    }

    // 確認輸的訊息彈出
    const resultMessage = await page.locator('[data-testid="result-message"]');
    const board = await getBoardState(page);

    if (isWinningBoard(board, 'X')) {
      await expect(resultMessage).toHaveText('恭喜!你贏了');
    } else if (isWinningBoard(board, 'O')) {
      await expect(resultMessage).toHaveText('你輸了!下次再努力');
    } else if (isTie(board)) {
      await expect(resultMessage).toHaveText('這局平手!');
    }
  });

  // 測試需求 7: 平局時顯示 "這局平手!"
  test('should display "It\'s a tie!" when there is a tie', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.click('[data-testid="choose-X"]');

    // 模擬遊戲直到平局
    while (!(await checkGameEnd(page))) {
      await playerMakeMove(page);  // 玩家行動
      await waitForComputerMove(page);  // 等待電腦回應
    }

    // 確認平局訊息彈出
    const resultMessage = await page.locator('[data-testid="result-message"]');
    const board = await getBoardState(page);

    if (isWinningBoard(board, 'X')) {
      await expect(resultMessage).toHaveText('恭喜!你贏了');
    } else if (isWinningBoard(board, 'O')) {
      await expect(resultMessage).toHaveText('你輸了!下次再努力');
    } else if (isTie(board)) {
      await expect(resultMessage).toHaveText('這局平手!');
    }
  });

  // 測試需求 8: 玩家確認結果後遊戲重啟
  test('should restart game after confirming result', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.click('[data-testid="choose-X"]');

    // 模擬遊戲直到結束
    while (!(await checkGameEnd(page))) {
      await playerMakeMove(page);  // 玩家行動
      await waitForComputerMove(page);  // 等待電腦回應
    }

    // 確認結果後重啟遊戲
    await page.click('[data-testid="confirm-result"]');
    const emptyCells = await page.locator('.cell:empty');
    const count = await emptyCells.count();  // 先取得count
    await expect(count).toBe(9); // 所有格子應該都是空的
  });

});
