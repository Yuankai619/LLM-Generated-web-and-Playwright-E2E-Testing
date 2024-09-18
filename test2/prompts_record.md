## Prompt 1
請幫我製作一個線上測驗網頁，並完成以下功能，需要附上完成程式碼。(包括 html, css, js)
具體功能如下：
1. 畫面最上方有"線上測驗"標題，請以黑底白字呈現。
2. 畫面副標題為現在題數，總題數有三題。
3. 接下來有四個選項(a~d)，分別顯示"((a~d)：答案(a~d){現在題號})"，所有題目皆為單選題，只有一個答案正確，每個選項各佔一行。
4. 最後，畫面最下方有兩個按鈕。分別為"前一個問題"、"下一個問題"(如果沒有則不顯示)。
   如果為最後一題，則顯示"送出測驗"按鈕。
5. 輸入答案之後，可按下"下一個問題"按鈕，進入下一題。
6. 如果按"前一個問題"按鈕，可以回到上一題，並更改答案。
7. 如果到第二題之後，按下"下一個問題"，則會到第三題，但是答案的選項還是黑色的，而且還沒有顯示答對題數與總題數。
8. 最後，按下"送出測驗"，則會在最下面顯示「答對題數」與「總題數」。
9. 送出測驗後，可以檢視之前的回答。
   答錯的題目與選項呈現紅字；答對的題目與選項則會呈現綠字。
10. 所有內容皆為置中對齊

### 成果
![alt text](image-1.png)
bug: 答對的題目應該全部變為綠色

![alt text](image-2.png)
bug: 送出測驗後題目沒有變色，並且無法回到下一題

## Prompt 2
在送出測驗後，需要可以多次往返上一題與下一題。並且答對的題目整題選項變成綠色，答錯的題目整題變成紅色。

### 成果
順利完成所有需求
![alt text](image.png)
![alt text](image-3.png)
![alt text](image-4.png)

## Prompt 3
我現在要做自動化測試，需要在html tag中加入"aria-label"與"data-testid"屬性，請幫我完成並給我全部的程式碼

### 成果
順利完成所有需求
```html
<body>
    <div class="header">
        <h1 aria-label="線上測驗標題" data-testid="quiz-title">線上測驗</h1>
    </div>
    <div class="question-count" aria-label="題目計數" data-testid="question-count"></div>
    <div class="options" aria-label="答案選項" data-testid="answer-options"></div>
    <div class="buttons">
        <button id="prevBtn" aria-label="前一個問題" data-testid="prev-button" style="display: none;">前一個問題</button>
        <button id="nextBtn" aria-label="下一個問題" data-testid="next-button">下一個問題</button>
    </div>
    <div class="result" aria-label="測驗結果" data-testid="quiz-result" style="display: none;"></div>

    <script src="script.js"></script>
</body>
```