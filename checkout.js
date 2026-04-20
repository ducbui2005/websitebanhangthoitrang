window.onload = function() {
    renderCheckout();
    
    const form = document.getElementById('form-checkout');
    form.onsubmit = function(e) {
        e.preventDefault();
        
        // Hiện thông báo xanh góc phải
        showSuccessToast("Đặt hàng thành công! Cảm ơn Đức đã ủng hộ.");
        
        // Xóa giỏ hàng
        localStorage.removeItem('cart');
        
        // Chờ 2 giây để người dùng kịp nhìn thông báo rồi mới chuyển trang
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 2000);
    };
};
function renderCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    
    if (cart.length === 0) {
        window.location.href = 'main.html';
        return;
    }

    let total = 0;
    checkoutItems.innerHTML = cart.map(item => {
        let quantity = item.quantity || 1;
        total += item.price * quantity;
        return `
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 14px;">
                <span style="flex: 1;">${item.name} <b>x${quantity}</b></span>
                <span style="font-weight: 600;">${(item.price * quantity).toLocaleString()}đ</span>
            </div>
        `;
    }).join('');

    checkoutTotal.innerText = total.toLocaleString() + 'đ';
}
function showSuccessToast(message) {
    // 1. Tạo hoặc lấy container chứa toast
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    // 2. Tạo phần tử thông báo
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        <span>${message}</span>
    `;

    // 3. Thêm vào container
    container.appendChild(toast);

    // 4. Tự động xóa sau 3 giây (khớp với thời gian animation CSS)
    setTimeout(() => {
        toast.remove();
    }, 3000);
}