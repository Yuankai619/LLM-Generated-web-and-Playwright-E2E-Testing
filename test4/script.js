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
