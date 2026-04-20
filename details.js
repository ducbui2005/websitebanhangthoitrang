// DỮ LIỆU SẢN PHẨM (Chỉ để 1 lần duy nhất)

window.onload = function() {
    // 1. Lấy ID từ sessionStorage
    const productId = sessionStorage.getItem('selectedProductId');
    
    // 2. Tìm sản phẩm trong mảng (ép kiểu về Number để so sánh chính xác)
    const product = products.find(p => p.id === parseInt(productId));
    
    const content = document.getElementById('product-detail-content');

    if (product) {
        content.innerHTML = `
    <div class="detail-wrapper">
        <div class="detail-left">
            <img src="${product.img}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/500x600?text=Anh+San+Pham'">
        </div>
        <div class="detail-right">
            <h1>${product.name}</h1>
            
            <div class="rating" style="color: #ffce3d; font-size: 18px;">
                ${'<i class="fa-solid fa-star"></i>'.repeat(product.rating)}
                ${'<i class="fa-regular fa-star"></i>'.repeat(5 - product.rating)}
                <span style="color: #888; font-size: 14px; margin-left: 10px;">(120 đánh giá) | Đã bán 1.5k</span>
            </div>

            <div class="detail-price-box">
                ${product.price.toLocaleString('vi-VN')} <span style="font-size: 20px;">đ</span>
            </div>

            <div class="size-selector">
                <p style="font-weight: 600; margin-bottom: 10px;">Kích cỡ:</p>
                <button class="size-btn">S</button>
                <button class="size-btn active">M</button>
                <button class="size-btn">L</button>
                <button class="size-btn">XL</button>
            </div>

            <div class="action-btns">
    <button class="btn-cart-large" onclick="addToCart(${product.id})">
        <i class="fa-solid fa-cart-plus"></i> THÊM VÀO GIỎ HÀNG
    </button>
    <button class="btn-buy-now">MUA NGAY</button>
</div>

            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 14px;">
                    <b>Mô tả:</b> Sản phẩm thiết kế độc quyền, chất liệu 100% cotton co giãn 4 chiều, thấm hút mồ hôi cực tốt. 
                    Cam kết đổi trả trong vòng 7 ngày nếu có lỗi từ nhà sản xuất.
                </p>
            </div>
        </div>
    </div>
`;;

        // Logic chọn size (Đổi màu khi click)
        const sizeBtns = document.querySelectorAll('.size-btn');
        sizeBtns.forEach(btn => {
            btn.onclick = function() {
                sizeBtns.forEach(b => {
                    b.style.borderColor = '#ddd';
                    b.style.color = '#333';
                });
                this.style.borderColor = '#ee4d2d';
                this.style.color = '#ee4d2d';
            };
        });
    } else {
        content.innerHTML = "<h2>Rất tiếc, không tìm thấy sản phẩm!</h2>";
    }

    updateCartBadge();
};

// Hàm thêm vào giỏ hàng dùng LocalStorage
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === id);
    
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        alert("Đã thêm sản phẩm vào giỏ hàng!");
    }
}

// Cập nhật con số trên icon giỏ hàng
function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const badge = document.querySelector('.nav-icons span');
    if (badge) badge.innerText = cart.length;
}
