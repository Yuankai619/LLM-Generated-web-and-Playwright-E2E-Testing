// 模擬從CSV文件讀取數據
const itemPriceData = `
綠茶,中杯,30
綠茶,大杯,35
珍珠奶茶,中杯,50
珍珠奶茶,大杯,60
`.trim().split('\n').map(line => line.split(','));

// 初始化頁面
document.addEventListener('DOMContentLoaded', () => {
    const itemSelect = document.getElementById('item');
    const sizeSelect = document.getElementById('size');
    const quantityInput = document.getElementById('quantity');
    const customerInput = document.getElementById('customer');
    const priceSpan = document.getElementById('price');
    const totalSpan = document.getElementById('total');
    const confirmButton = document.getElementById('confirm');
    const deleteSelectedButton = document.getElementById('delete-selected');
    const checkoutButton = document.getElementById('checkout');
    const orderTableBody = document.querySelector('#orders tbody');
    const orderSummarySpan = document.getElementById('order-summary');

    // 填充品名下拉選單
    const uniqueItems = [...new Set(itemPriceData.map(item => item[0]))];
    uniqueItems.forEach(item => {
        const option = document.createElement('option');
        option.value = option.textContent = item;
        itemSelect.appendChild(option);
    });

    // 當品名改變時更新容量選項
    itemSelect.addEventListener('change', updateSizeOptions);

    function updateSizeOptions() {
        const selectedItem = itemSelect.value;
        const sizes = itemPriceData.filter(item => item[0] === selectedItem).map(item => item[1]);
        sizeSelect.innerHTML = '';
        sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = option.textContent = size;
            sizeSelect.appendChild(option);
        });
        updatePrice();
    }

    // 更新價格和總金額
    function updatePrice() {
        const selectedItem = itemSelect.value;
        const selectedSize = sizeSelect.value;
        const quantity = parseInt(quantityInput.value);
        const priceData = itemPriceData.find(item => item[0] === selectedItem && item[1] === selectedSize);
        if (priceData) {
            const price = parseInt(priceData[2]);
            priceSpan.textContent = price;
            totalSpan.textContent = price * quantity;
        }
    }

    itemSelect.addEventListener('change', updatePrice);
    sizeSelect.addEventListener('change', updatePrice);
    quantityInput.addEventListener('input', updatePrice);

    // 確認訂單
    confirmButton.addEventListener('click', () => {
        const item = itemSelect.value;
        const size = sizeSelect.value;
        const price = priceSpan.textContent;
        const quantity = quantityInput.value;
        const total = totalSpan.textContent;
        const temperature = document.getElementById('temperature').value;
        const sweetness = document.getElementById('sweetness').value;
        const customer = customerInput.value;

        if (!customer) {
            alert('請輸入訂購人姓名');
            return;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${item}</td>
            <td>${size}</td>
            <td>${price}</td>
            <td>${quantity}</td>
            <td>${total}</td>
            <td>${temperature}</td>
            <td>${sweetness}</td>
            <td>${customer}</td>
        `;
        orderTableBody.appendChild(tr);

        updateOrderSummary();
    });

    // 刪除勾選的訂單
    deleteSelectedButton.addEventListener('click', () => {
        const checkedBoxes = orderTableBody.querySelectorAll('input[type="checkbox"]:checked');
        checkedBoxes.forEach(box => box.closest('tr').remove());
        updateOrderSummary();
    });

    // 更新訂單摘要
    function updateOrderSummary() {
        const rows = orderTableBody.querySelectorAll('tr');
        let totalQuantity = 0;
        let totalAmount = 0;
        rows.forEach(row => {
            totalQuantity += parseInt(row.cells[4].textContent);
            totalAmount += parseInt(row.cells[5].textContent);
        });
        orderSummarySpan.textContent = `總數量: ${totalQuantity}, 總金額: ${totalAmount}`;
    }

    // 結帳
    checkoutButton.addEventListener('click', () => {
        const rows = orderTableBody.querySelectorAll('tr');
        if (rows.length === 0) {
            alert('訂單清單為空');
            return;
        }

        let orderSummary = '訂單摘要:\n\n';
        rows.forEach(row => {
            orderSummary += `${row.cells[1].textContent} ${row.cells[2].textContent} x ${row.cells[4].textContent} = ${row.cells[5].textContent}\n`;
        });
        orderSummary += `\n總金額: ${orderSummarySpan.textContent.split(':')[2].trim()}`;

        alert(orderSummary);
        orderTableBody.innerHTML = '';
        updateOrderSummary();
    });

    // 初始化
    updateSizeOptions();
    updatePrice();
});