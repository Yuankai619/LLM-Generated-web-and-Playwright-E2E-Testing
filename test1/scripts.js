let board = Array(9).fill(null);
let currentPlayer = null;
let playerSymbol = null;
let computerSymbol = null;
let gameActive = true;

// 顯示選擇符號的彈跳視窗
document.getElementById('symbolChoice').style.display = 'flex';

// 確保結果視窗隱藏
document.getElementById('resultModal').style.display = 'none';

// 選擇 X or O
document.getElementById('chooseX').addEventListener('click', function() {
    playerSymbol = 'X';
    computerSymbol = 'O';
    startGame();
});

document.getElementById('chooseO').addEventListener('click', function() {
    playerSymbol = 'O';
    computerSymbol = 'X';
    startGame();
});

// 關閉選擇符號的彈跳視窗
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('symbolChoice').style.display = 'none';
});

// 開始遊戲
function startGame() {
    document.getElementById('symbolChoice').style.display = 'none';
    board = Array(9).fill(null);
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    currentPlayer = Math.random() < 0.5 ? playerSymbol : computerSymbol;
    gameActive = true;
    if (currentPlayer === computerSymbol) {
        setTimeout(computerMove, 500);
    }
}

// 玩家點擊格子
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', function() {
        if (!this.textContent && currentPlayer === playerSymbol && gameActive) {
            this.textContent = playerSymbol;
            board[this.getAttribute('data-index')] = playerSymbol;
            if (!checkWinner()) {
                currentPlayer = computerSymbol;
                setTimeout(computerMove, 500);
            }
        }
    });
});

// 電腦移動
function computerMove() {
    if (board.includes(null) && gameActive) {
        let emptyCells = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = computerSymbol;
        document.querySelector(`[data-index='${randomIndex}']`).textContent = computerSymbol;
        if (!checkWinner()) {
            currentPlayer = playerSymbol;
        }
    }
}

// 檢查勝負
function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            setTimeout(() => showResult(board[a] === playerSymbol ? '恭喜!你贏了' : '你輸了!下次再努力'), 100);
            return true;
        }
    }

    if (!board.includes(null)) {
        gameActive = false;
        setTimeout(() => showResult('這局平手!'), 100);
        return true;
    }

    return false;
}

// 顯示結果並開始新遊戲
function showResult(message) {
    document.getElementById('resultMessage').textContent = message;
    document.getElementById('resultModal').style.display = 'flex';
}

// 確認結果，開始新局
document.getElementById('confirmResult').addEventListener('click', function() {
    document.getElementById('resultModal').style.display = 'none';
    startGame();
});
