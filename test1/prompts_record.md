## Prompt 1
使用javascript, html5, css 設計一個玩家與程式互動的網頁井字遊戲。
以下為行為需求：
執行網頁井字遊戲後、立即以彈跳視窗及按鈕方式讓玩家選擇X or O 作為代表符號，彈跳視窗的需要有"選擇你的符號" 內容的標頭和一個取消的X 按鈕，下方會有兩個選擇按鈕 X 和 O 為選擇的符號
每一局開始時，玩家或電腦畫第一個格子的先後順序(亦即那一位先畫格子)為隨機決定，不可固定。
玩家與電腦必須以交互方式畫格子，以畫過的格子，不得重複畫。遊戲過程的畫面需要有九宮格，格子顏色為淺藍色，且框線顏色和背景一樣，選擇的格子上面要顯示符號，符號是實心線條，顏色要和背景一樣
每次玩家級電腦畫完格子後，程式需立即判斷玩家贏、玩家輸或遊戲尚未結束。若是玩家贏，則利用彈跳視窗輸出 "恭喜!你贏了"的訊息，並立即進入下一局遊戲; 若是玩家輸了，則利用彈跳視窗輸出 " 你輸了!下次再努力" 的訊息，並立即進入下一局遊戲; 若是輸贏尚未決定，並且尚有格子沒畫完，則繼續遊戲。
若是所有格子皆被玩家或電腦所畫，且不分輸贏，則利用彈跳視窗輸出" 這局平手!" 的訊息，並開始下一局遊戲， 給我符合以上需求的所有程式碼
### 成果
![image](./images/prompt1-1.jpeg )

bug: 彈出視窗太寬且沒置中，應該要讓他置中，並且讓他不要太寬

![image](./images/prompt1-2.png)

bug: 贏的瞬間電腦還是會繼續畫下一步才跳出視窗，應該要讓他在贏的瞬間就跳出視窗。還有贏的通知訊息不是要使用alert，而是要使用自訂義的彈跳視窗，還有畫格子的時候符號應該要和背景一樣是白色的，且符號要在粗一點點

![image](./images/prompt1-3.png)

bug: 如果這局贏了，按下彈出的視窗確認後，會馬上跳出我輸了的視窗

## Prompt 2
有幾個bug：
彈出視窗太寬且沒置中，應該要讓他置中，並且讓他不要太寬。
贏的瞬間電腦還是會繼續畫下一步才跳出視窗，應該要讓他在贏的瞬間就跳出視窗。還有贏的通知訊息不是要使用alert，而是要使用自訂義的彈跳視窗，還有畫格子的時候符號應該要和背景一樣是白色的，且符號要在粗一點點。
如果這局贏了，按下彈出的視窗確認後，會馬上跳出我輸了的視窗。
修正以上bug並重新給我所有的程式碼
### 成果
![image](./images/prompt2-1.png)

bug: 一開始談出的選擇視窗樣式錯誤，看不到任何的文字和符號按鈕還有取消的叉叉按鈕，只有中間的確認字樣的按鈕

## Prompt 3
一開始彈出的符號選擇視窗樣式錯誤，看不到任何的文字和符號按鈕還有取消的叉叉按鈕，會有另一個彈出視窗擋在前面上面顯示確認的按鈕，按下去後所有彈出視窗都消失，並無法做任何操作了，修正此錯誤並給我完整的程式碼
### 成果
完成所有需求
![image](./images/prompt3-1.png)
![image](./images/prompt3-3.png)
![image](./images/prompt3-2.png)
![image](./images/prompt3-4.png)


---
## Prompt 4
以上的程式碼是正確的，但是我現在要做自動化測試，所以需要在所有需要的html tag中加上data-testid和aria-label方便我的測試程式碼抓到元素，給我完整的程式碼

有完成所有需求
### 成果
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>井字遊戲</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="game-container">
        <h1>井字遊戲</h1>
        <div id="board" class="board" data-testid="game-board" aria-label="井字遊戲棋盤">
            <div class="cell" data-index="0" data-testid="cell-0" aria-label="棋格 0"></div>
            <div class="cell" data-index="1" data-testid="cell-1" aria-label="棋格 1"></div>
            <div class="cell" data-index="2" data-testid="cell-2" aria-label="棋格 2"></div>
            <div class="cell" data-index="3" data-testid="cell-3" aria-label="棋格 3"></div>
            <div class="cell" data-index="4" data-testid="cell-4" aria-label="棋格 4"></div>
            <div class="cell" data-index="5" data-testid="cell-5" aria-label="棋格 5"></div>
            <div class="cell" data-index="6" data-testid="cell-6" aria-label="棋格 6"></div>
            <div class="cell" data-index="7" data-testid="cell-7" aria-label="棋格 7"></div>
            <div class="cell" data-index="8" data-testid="cell-8" aria-label="棋格 8"></div>
        </div>
    </div>

    <!-- 選擇符號的彈跳視窗 -->
    <div id="symbolChoice" class="modal" data-testid="symbol-choice-modal" aria-label="選擇符號視窗">
        <div class="modal-content" data-testid="symbol-choice-content" aria-label="選擇符號內容">
            <span id="closeModal" class="close" data-testid="close-modal" aria-label="關閉視窗">&times;</span>
            <h2 data-testid="modal-title" aria-label="選擇你的符號">選擇你的符號</h2>
            <button id="chooseX" data-testid="choose-X" aria-label="選擇 X">X</button>
            <button id="chooseO" data-testid="choose-O" aria-label="選擇 O">O</button>
        </div>
    </div>

    <!-- 贏/輸/平局通知的彈跳視窗 -->
    <div id="resultModal" class="modal" data-testid="result-modal" aria-label="結果通知視窗">
        <div class="modal-content" data-testid="result-content" aria-label="結果通知內容">
            <h2 id="resultMessage" data-testid="result-message" aria-label="結果訊息"></h2>
            <button id="confirmResult" data-testid="confirm-result" aria-label="確認結果">確定</button>
        </div>
    </div>

    <script src="scripts.js"></script>
</body>
</html>
```