window.onload = function() {
    renderCart();
    updateBadges();
};

function renderCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContent = document.getElementById('cart-content');
    const emptyCart = document.getElementById('empty-cart');

    if (cart.length === 0) {
        cartContent.innerHTML = "";
        emptyCart.style.display = "block";
        return;
    }

    emptyCart.style.display = "none";
    
    let total = 0;
    let html = `
        <table class="cart-table" style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="border-bottom: 2px solid #eee; text-align: left;">
                    <th style="padding: 15px;">Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
    `;

    cart.forEach((item, index) => {
        let itemTotal = item.price * (item.quantity || 1);
        total += itemTotal;
        html += `
            <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 15px; display: flex; align-items: center; gap: 15px;">
                    <img src="${item.img}" width="60" style="border-radius: 5px;">
                    <span>${item.name}</span>
                </td>
                <td>${item.price.toLocaleString()}đ</td>
                <td>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${index}, -1)">-</button>
                        <span style="margin: 0 10px;">${item.quantity || 1}</span>
                        <button onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </td>
                <td>${itemTotal.toLocaleString()}đ</td>
                <td>
                    <button onclick="removeItem(${index})" style="background: none; border: none; color: #ff4757; cursor: pointer;">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
        <div style="text-align: right; margin-top: 30px;">
            <h3>Tổng cộng: <span style="color: #ee4d2d; font-size: 24px;">${total.toLocaleString()}đ</span></h3>
            <button class="btn-buy-now" onclick="window.location.href='checkout.html'" style="margin-top: 20px; padding: 15px 50px;">
    THANH TOÁN NGAY
</button>
        </div>
    `;

    cartContent.innerHTML = html;
}

// Hàm cập nhật số lượng (SỬA)
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart[index].quantity) cart[index].quantity = 1;
    
    cart[index].quantity += change;
    
    // Nếu số lượng nhỏ hơn 1 thì xóa luôn hoặc giữ là 1
    if (cart[index].quantity < 1) {
        removeItem(index);
    } else {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateBadges();
    }
}

// Hàm xóa sản phẩm (XÓA)
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateBadges();
}

function updateBadges() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    const cartBadge = document.querySelector('.cart-badge');
    const wishlistBadge = document.querySelector('.wishlist-badge');
    
    if (cartBadge) cartBadge.innerText = cart.length;
    if (wishlistBadge) wishlistBadge.innerText = wishlist.length;
}