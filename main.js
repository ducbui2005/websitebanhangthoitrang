// Đảm bảo tất cả logic chạy sau khi HTML đã load xong
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupEventListeners();
});

// 1. Hàm khởi tạo ứng dụng
function initApp() {
    const categoryToFilter = localStorage.getItem('filterCategory');
    
    if (categoryToFilter) {
        // Lọc theo bộ sưu tập từ trang Collections gửi sang
        const filtered = products.filter(p => p.category === categoryToFilter);
        renderProducts(filtered);
        
        const title = document.querySelector('.container h3');
        if (title) title.innerText = "Bộ sưu tập: " + categoryToFilter.toUpperCase();
        
        localStorage.removeItem('filterCategory');
    } else {
        // Mặc định hiện tất cả
        renderProducts(products);
    }
    
    // Cập nhật các con số và danh sách mini
    updateCartBadge();
    updateWishlistCount();
    updateMiniLists();
}

// 2. Thiết lập tất cả sự kiện (Search, Filter, Modal)
function setupEventListeners() {
    // A. Sự kiện Tìm kiếm
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', filterAll);
    }

    // B. Sự kiện Click Danh mục (Sidebar)
    const categoryBtns = document.querySelectorAll('.filter-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            filterAll();
        });
    });

    // C. Sự kiện Lọc giá
    const priceSelect = document.getElementById('price-filter');
    if (priceSelect) {
        priceSelect.addEventListener('change', filterAll);
    }

    // D. Sự kiện Modal Đăng nhập
    const loginBtn = document.getElementById('login-btn');
    const modal = document.getElementById('login-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (loginBtn && modal) {
        loginBtn.onclick = () => modal.style.display = "block";
        if (closeBtn) closeBtn.onclick = () => modal.style.display = "none";
        window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };
    }
}

// 3. Hàm hiển thị sản phẩm
function renderProducts(data) {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    productList.innerHTML = data.map(item => {
        const isLiked = wishlist.includes(item.id);
        return `
        <div class="product-card" onclick="goToDetail(${item.id})">
            <div class="product-img">
                <img src="${item.img}" alt="${item.name}">
                <div class="wishlist-btn ${isLiked ? 'active' : ''}" 
                     onclick="event.stopPropagation(); toggleWishlist(${item.id})">
                    <i class="${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                </div>
            </div>
            <div class="product-info">
                <h4>${item.name}</h4>
                <p class="price">${item.price.toLocaleString('vi-VN')}đ</p>
                <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${item.id})">
                    <i class="fa-solid fa-cart-shopping"></i> Thêm vào giỏ
                </button>
            </div>
        </div>`;
    }).join('');
}

// 4. Logic Lọc tổng hợp
function filterAll() {
    const searchInput = document.querySelector('.search-box input');
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const activeBtn = document.querySelector('.filter-btn.active');
    const activeCategory = activeBtn ? activeBtn.dataset.category : 'all';
    const priceRange = document.getElementById('price-filter')?.value || 'all';

    const filteredResult = products.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(searchTerm);
        const matchCategory = (activeCategory === 'all' || item.category === activeCategory);
        let matchPrice = true;
        if (priceRange === 'low') matchPrice = item.price < 500000;
        else if (priceRange === 'high') matchPrice = item.price >= 500000;

        return matchSearch && matchCategory && matchPrice;
    });

    renderProducts(filteredResult);
}

// --- CÁC HÀM HỖ TRỢ (GIỮ NGUYÊN NHƯNG GỌN HƠN) ---

function toggleWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.includes(id) ? wishlist.filter(i => i !== id) : [...wishlist, id];
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    filterAll(); // Lọc lại để giữ trạng thái hiện tại
    updateWishlistCount();
    updateMiniLists();
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = products.find(p => p.id === id);
    if (item) {
        cart.push({...item, quantity: 1});
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        updateMiniLists();
        alert(`Đã thêm ${item.name} vào giỏ!`);
    }
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const badge = document.querySelector('#cart-icon span');
    if (badge) badge.innerText = cart.length;
}

function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const badge = document.querySelector('#wishlist-icon span');
    if (badge) badge.innerText = wishlist.length;
}

function updateMiniLists() {
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Đổ dữ liệu vào mini-wishlist
    const miniWishlist = document.getElementById('mini-wishlist');
    if (miniWishlist) {
        if (wishlistIds.length === 0) miniWishlist.innerHTML = '<p class="empty-msg">Trống</p>';
        else {
            const favs = products.filter(p => wishlistIds.includes(p.id)).slice(0, 4);
            miniWishlist.innerHTML = favs.map(i => `<div class="dropdown-item"><img src="${i.img}"><div><h5>${i.name}</h5><p>${i.price.toLocaleString()}đ</p></div></div>`).join('') + '<a href="wishlist.html" class="view-all">Xem tất cả</a>';
        }
    }

    // Đổ dữ liệu vào mini-cart
    const miniCart = document.getElementById('mini-cart');
    if (miniCart) {
        if (cart.length === 0) miniCart.innerHTML = '<p class="empty-msg">Trống</p>';
        else {
            const items = cart.slice(0, 4);
            miniCart.innerHTML = items.map(i => `<div class="dropdown-item"><img src="${i.img}"><div><h5>${i.name}</h5><p>${i.price.toLocaleString()}đ</p></div></div>`).join('') + '<a href="cart.html" class="view-all">Xem giỏ hàng</a>';
        }
    }
}

function goToDetail(id) {
    sessionStorage.setItem('selectedProductId', id);
    window.location.href = 'details.html';
}
const slider = document.getElementById('slider-wrapper');
const slides = document.querySelectorAll('.slide');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;

// Gán sự kiện
slides.forEach((slide, index) => {
    // Sự kiện chuột
    slide.addEventListener('mousedown', dragStart(index));
    slide.addEventListener('mouseup', dragEnd);
    slide.addEventListener('mouseleave', dragEnd);
    slide.addEventListener('mousemove', dragAction);

    // Sự kiện chạm (Mobile)
    slide.addEventListener('touchstart', dragStart(index));
    slide.addEventListener('touchend', dragEnd);
    slide.addEventListener('touchmove', dragAction);
});

function dragStart(index) {
    return function(event) {
        currentIndex = index;
        startPos = getPositionX(event);
        isDragging = true;
        
        // Tắt transition khi đang kéo để mượt hơn
        slider.style.transition = 'none';
        
        animationID = requestAnimationFrame(animation);
    }
}

function dragAction(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function dragEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    
    // Tính toán xem nên nhảy sang slide tiếp hay quay lại
    const movedBy = currentTranslate - prevTranslate;

    // Nếu kéo qua 100px thì chuyển slide
    if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;
    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

    setPositionByIndex();
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setSliderTransform();
    if (isDragging) requestAnimationFrame(animation);
}

function setSliderTransform() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth;
    prevTranslate = currentTranslate;
    slider.style.transition = 'transform 0.5s ease-out'; // Bật lại transition
    setSliderTransform();
}

// Xử lý khi thay đổi kích thước màn hình
window.onresize = setPositionByIndex;
window.addEventListener('load', function() {
    const loader = document.getElementById('loading-screen');
    
    // Thêm một khoảng trễ nhỏ (ví dụ 800ms) để khách kịp thấy hiệu ứng đẹp
    setTimeout(() => {
        loader.classList.add('fade-out');
        
        // Sau khi hiệu ứng fade hoàn tất thì xóa hẳn khỏi DOM để đỡ tốn tài nguyên
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 800);
});
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('main-search');
    const suggestionsBox = document.getElementById('search-suggestions');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query.length < 1) {
                suggestionsBox.style.display = 'none';
                return;
            }

            // Lọc sản phẩm dựa trên tên hoặc category
            const matches = products.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.category.toLowerCase().includes(query)
            ).slice(0, 6); // Chỉ lấy 6 kết quả đầu cho gọn

            renderSuggestions(matches);
        });

        // Đóng gợi ý khi click ra ngoài
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-box')) {
                suggestionsBox.style.display = 'none';
            }
        });
    }
});

// Hàm hiển thị kết quả nhanh
function renderSuggestions(matches) {
    const suggestionsBox = document.getElementById('search-suggestions');
    
    if (matches.length === 0) {
        suggestionsBox.innerHTML = '<p style="padding:15px; font-size:13px; color:#999; text-align:center;">Không tìm thấy sản phẩm...</p>';
    } else {
        suggestionsBox.innerHTML = matches.map(item => `
            <div class="suggestion-item" onclick="handleSuggestionClick(${item.id})">
                <img src="${item.img}" alt="${item.name}">
                <div class="info">
                    <h5>${item.name}</h5>
                    <p>${item.price.toLocaleString('vi-VN')}đ</p>
                </div>
            </div>
        `).join('');
    }
    suggestionsBox.style.display = 'block';
}

// Hàm bổ trợ để xử lý việc click
function handleSuggestionClick(id) {
    // 1. Chuyển hướng sang trang chi tiết (Sử dụng hàm của Đức đã có)
    goToDetail(id);
    
    // 2. Ẩn thanh gợi ý sau khi click
    document.getElementById('search-suggestions').style.display = 'none';
    
    // 3. Xóa nội dung trong ô input cho sạch sẽ
    document.getElementById('main-search').value = '';
}