# prompts_record
## Prompt1 
```
請製作一個網頁，使用者可以輸入項目名稱，並且列出在網頁上面。以下述方式給分。 
注意事項如下:  
① 本題須使用JavaScript、HTML5及CSS3，以其它方式完成者不計分。 
② JavaScript，HTML5 及CSS3 必須分別存檔，上傳後置於同一目錄，檔案路徑請設定成相對
路徑。 
③ 做答完畢，請上傳繳交完整開啟此網站所需的所有檔案(請設定成相對路徑)至網路檔案伺
服器之存入p2-ans檔案夾中。 
④ 如您有完成此題，請在解題自評表上勾選已完成作答。 
本題目功能要求如下： 
1. (8分) 初始頁面： 
網頁開啟後顯示(如圖2-1所示)。共有1個Label、1個Input(含輸入提示訊息，例如:
買早餐)，以及1個Button。其網頁顏色及字型自訂。 
圖2-1 初始頁面 
2. (16分) 新增三筆資料： 
在輸入欄位中填入資料後送出，將其結果顯示在網頁中；網頁中輸入多筆資料，則輸入資
料會依序顯示在畫面中(如圖2-2所示)。 
注意：每一筆顯示資料後面會有兩個按鈕，分別是編輯(圖2-2綠色圖示)與刪除(圖2-2
紅色圖示)，以及資料下方會有"清除所有項目"之按鈕。  
圖2-2 新增三筆資料 
4 
2021 年ITSA 全國大專校院程式設計極客挑戰賽(資訊系統與網頁設計應用組) 初賽試題 
3. (8分)更新資料： 
a. 點擊網頁綠色圖示會將資料帶入到網頁輸入欄位中，並且送出按鈕之文字會變成"編
輯"，畫面如圖2-3所示。 
圖2-3 更新前 
b. 輸入新資料點擊編輯按鈕後，網頁顯示如圖2-4所示。 
圖2-4 更新後 
4. (4分)刪除資料：點擊網頁紅色圖示，則會刪除此筆資料。網頁顯示如圖2-5所示。 
圖2-5 刪除"買牛奶" 
5 
2021 年ITSA 全國大專校院程式設計極客挑戰賽(資訊系統與網頁設計應用組) 初賽試題 
5. (4分)清除資料：點擊網頁下方"清除所有項目"之按鈕，則會清除網頁所有項目資料。網
頁顯示如圖2-6所示。 
```
## Response1
![image](./images/image%20(2).png)
![image](./images/image%20(5).png)

## Conclusion1

在一次提問後 成品已符合題目規定
題目的網頁顏色及字型自訂 與範例圖片配色不同是正常的

- 1. (8分) 初始頁面： 
網頁開啟後顯示(如圖2-1所示)。共有1個Label、1個Input(含輸入提示訊息，例如:
買早餐)，以及1個Button。其網頁顏色及字型自訂。 
圖2-1 初始頁面 
![image](./images/image%20(3).png)


- 2. (16分) 新增三筆資料： 
在輸入欄位中填入資料後送出，將其結果顯示在網頁中；網頁中輸入多筆資料，則輸入資
料會依序顯示在畫面中(如圖2-2所示)。 
注意：每一筆顯示資料後面會有兩個按鈕，分別是編輯(圖2-2綠色圖示)與刪除(圖2-2
紅色圖示)，以及資料下方會有"清除所有項目"之按鈕。  
![image](./images/image%20(7).png)

 
- 3. (8分)更新資料： 
a. 點擊網頁綠色圖示會將資料帶入到網頁輸入欄位中，並且送出按鈕之文字會變成"編
輯"，畫面如圖2-3所示。 
![image](./images/image%20(1).png)


- 4. (4分)刪除資料：點擊網頁紅色圖示，則會刪除此筆資料。網頁顯示如圖2-5所示。 
圖2-5 刪除"買牛奶" 
![image](./images/image%20(8).png)


- 5. (4分)清除資料：點擊網頁下方"清除所有項目"之按鈕，則會清除網頁所有項目資料。網
頁顯示如圖2-6所示。 
![image](./images/image%20(4).png)



## Prompt2
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>待辦事項清單</h1>
        <label for="itemInput">新增項目：</label>
        <input type="text" id="itemInput" placeholder="輸入項目名稱">
        <button id="addButton">新增</button>

        <ul id="itemList"></ul>
        <button id="clearAllButton">清除所有項目</button>
    </div>
    <script src="script.js"></script>
</body>
</html>

let editIndex = null;

document.getElementById('addButton').addEventListener('click', function() {
    const input = document.getElementById('itemInput');
    const inputValue = input.value.trim();

    if (inputValue === "") {
        alert("請輸入項目名稱！");
        return;
    }

    if (editIndex === null) {
        addItem(inputValue);
    } else {
        updateItem(inputValue);
    }

    input.value = "";
});

document.getElementById('clearAllButton').addEventListener('click', clearAllItems);

function addItem(value) {
    const itemList = document.getElementById('itemList');
    const li = document.createElement('li');
    li.innerHTML = 
        ${value}
        <div class="actions">
            <button class="edit" onclick="editItem(this)">✏️</button>
            <button class="delete" onclick="deleteItem(this)">🗑️</button>
        </div>
    ;
    itemList.appendChild(li);
}

function editItem(button) {
    const li = button.parentNode.parentNode;
    const itemValue = li.firstChild.textContent.trim();
    document.getElementById('itemInput').value = itemValue;
    document.getElementById('addButton').textContent = "編輯";
    editIndex = Array.from(li.parentNode.children).indexOf(li);
}

function updateItem(value) {
    const itemList = document.getElementById('itemList');
    const li = itemList.children[editIndex];
    li.firstChild.textContent = value;
    document.getElementById('addButton').textContent = "新增";
    editIndex = null;
}

function deleteItem(button) {
    const li = button.parentNode.parentNode;
    li.remove();
}

function clearAllItems() {
    document.getElementById('itemList').innerHTML = "";
}

加上aria-label 和 data-testid
```

## Response2
外觀跟第一題一樣
### html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>待辦事項清單</h1>
        <label for="itemInput">新增項目：</label>
        <input type="text" id="itemInput" placeholder="輸入項目名稱" aria-label="項目輸入框">
        <button id="addButton" aria-label="新增項目" data-testid="add-button">新增</button>

        <ul id="itemList" aria-label="待辦事項清單"></ul>
        <button id="clearAllButton" aria-label="清除所有項目" data-testid="clear-all-button">清除所有項目</button>
    </div>
    <script src="script.js"></script>
</body>
</html>
```
### js:
```js
let editIndex = null;

document.getElementById('addButton').addEventListener('click', function() {
    const input = document.getElementById('itemInput');
    const inputValue = input.value.trim();

    if (inputValue === "") {
        alert("請輸入項目名稱！");
        return;
    }

    if (editIndex === null) {
        addItem(inputValue);
    } else {
        updateItem(inputValue);
    }

    input.value = "";
});

document.getElementById('clearAllButton').addEventListener('click', clearAllItems);

function addItem(value) {
    const itemList = document.getElementById('itemList');
    const li = document.createElement('li');
    li.innerHTML = `
        ${value}
        <div class="actions">
            <button class="edit" onclick="editItem(this)" aria-label="編輯項目" data-testid="edit-button">✏️</button>
            <button class="delete" onclick="deleteItem(this)" aria-label="刪除項目" data-testid="delete-button">🗑️</button>
        </div>
    `;
    itemList.appendChild(li);
}

function editItem(button) {
    const li = button.parentNode.parentNode;
    const itemValue = li.firstChild.textContent.trim();
    document.getElementById('itemInput').value = itemValue;
    document.getElementById('addButton').textContent = "編輯";
    editIndex = Array.from(li.parentNode.children).indexOf(li);
}

function updateItem(value) {
    const itemList = document.getElementById('itemList');
    const li = itemList.children[editIndex];
    li.firstChild.textContent = value;
    document.getElementById('addButton').textContent = "新增";
    editIndex = null;
}

function deleteItem(button) {
    const li = button.parentNode.parentNode;
    li.remove();
}

function clearAllItems() {
    document.getElementById('itemList').innerHTML = "";
}

```

## Conclusion2
加上aria-label 跟 data-testid 基本沒有影響


# Generate test script with Chatgpt

## Prompt1
(網頁的程式碼html )(省略文字)
寫一個playwright測試，測試所有的功能是否正常運作。

## Response1
```
const { test, expect } = require('@playwright/test');

test.describe('To-Do List functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');  // 修改為你應用程式的本地網址
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
```
## Conclusion1
已測試
- 新增項目
- 編輯項目
- 刪除單項
- 刪除全部
符合題目要求 可以接受
