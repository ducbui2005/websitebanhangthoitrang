window.onload = function() {
    renderWishlist();
    updateBadges();
};

function renderWishlist() {
    // 1. Lấy danh sách ID từ localStorage
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistContainer = document.getElementById('wishlist-list');
    const emptyMsg = document.getElementById('empty-wishlist');

    // 2. Kiểm tra nếu trống
    if (wishlistIds.length === 0) {
        wishlistContainer.innerHTML = "";
        emptyMsg.style.display = "block";
        return;
    }

    emptyMsg.style.display = "none";

    // 3. Lọc sản phẩm từ data.js
    const favoriteProducts = products.filter(p => wishlistIds.includes(p.id));

    // 4. Render ra màn hình
    wishlistContainer.innerHTML = favoriteProducts.map(item => `
        <div class="product-card">
            <div class="product-img" style="position: relative;">
                <img src="${item.img}" alt="${item.name}" onclick="goToDetail(${item.id})">
                <div class="wishlist-btn active" onclick="removeFromWishlist(${item.id})" 
                     style="position: absolute; top: 10px; right: 10px; background: #fff; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #ff4757; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <i class="fa-solid fa-trash-can"></i>
                </div>
            </div>
            <div class="product-info" style="padding: 15px; text-align: center;">
                <h4 style="margin-bottom: 10px; font-size: 16px;">${item.name}</h4>
                <p style="color: #ee4d2d; font-weight: bold; margin-bottom: 15px;">${item.price.toLocaleString()}đ</p>
                <button class="btn-add-cart" onclick="addToCart(${item.id})" 
                        style="width: 100%; padding: 10px; background: #222; color: #fff; border: none; border-radius: 5px; cursor: pointer;">
                    Thêm vào giỏ hàng
                </button>
            </div>
        </div>
    `).join('');
}

// Hàm xóa khỏi yêu thích
function removeFromWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(itemId => itemId !== id);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    renderWishlist(); // Vẽ lại trang
    updateBadges();   // Cập nhật số trên Navbar
}

// Hàm thêm vào giỏ hàng (giữ nguyên logic quantity)
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(p => p.id === id);

    if (productIndex > -1) {
        cart[productIndex].quantity = (cart[productIndex].quantity || 1) + 1;
    } else {
        const product = products.find(p => p.id === id);
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateBadges();
    alert("Đã thêm sản phẩm vào giỏ hàng!");
}

function updateBadges() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) cartBadge.innerText = cart.length;
}

function goToDetail(id) {
    sessionStorage.setItem('selectedProductId', id);
    window.location.href = 'details.html';
}