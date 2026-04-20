const products = [
    // NHÓM ÁO (SHIRT) - 8 items
    { id: 1, name: "Áo Sơ Mi Oxford", category: "shirt", price: 450000, img: "https://media.routine.vn/1600x1200/prod/media/7024e84a-6737-4add-849b-ba14bd386821.webp", isNew: true, rating: 5 },
    { id: 2, name: "Áo Thun Cotton Basic", category: "shirt", price: 199000, img: "https://cf.shopee.vn/file/1f743b76ff4b5a842409d9a04fd3de92", isNew: false, rating: 4 },
    { id: 3, name: "Áo Polo Pro-Max", category: "shirt", price: 320000, img: "https://mcdn.coolmate.me/image/December2024/ao-polo-the-thao-pro-active-1595-thoang-khi-ex-dry-phoi-mau_(5).jpg", isNew: true, rating: 5 },
    { id: 4, name: "Áo Hoodie Streetwear", category: "shirt", price: 550000, img: "https://www.acfc.com.vn/acfc_wp/wp-content/uploads/2023/09/ao-hoodie-2.webp", isNew: false, rating: 4 },
    { id: 5, name: "Áo Khoác Gió", category: "shirt", price: 750000, img: "https://www.chapi.vn/img/product/2020/10/3/ao-khoac-gio-nam-kpb-sport-23-new.jpg", isNew: true, rating: 5 },
    { id: 6, name: "Áo Len Cardigan", category: "shirt", price: 420000, img: "https://5sfashion.vn/storage/upload/images/ckeditor/RsDwUll4vFt344eJIpIWGhefADmD8ULy8qkQDpju.jpg", isNew: false, rating: 4 },
    { id: 7, name: "Áo Tanktop Thể Thao", category: "shirt", price: 150000, img: "https://product.hstatic.net/200000472743/product/untitled_session4731__1__0d2945c183e8482fa3545b0bf66ac3ce_master.jpg", isNew: false, rating: 3 },
    { id: 8, name: "Áo Sơ Mi Họa Tiết", category: "shirt", price: 380000, img: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lz1cod585k5p06", isNew: true, rating: 4 },

    // NHÓM QUẦN (PANTS) - 7 items
    { id: 9, name: "Quần Jean Slimfit", category: "pants", price: 650000, img: "https://buggy.yodycdn.com/images/product/9e7a2a71d8302025b98646a2bf46621a.webp", isNew: false, rating: 5 },
    { id: 10, name: "Quần Kaki Chino", category: "pants", price: 420000, img: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lvq26ld9h56h68", isNew: true, rating: 4 },
    { id: 11, name: "Quần Short Kaki", category: "pants", price: 280000, img: "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgdm2xpsp1brfb", isNew: false, rating: 4 },
    { id: 12, name: "Quần Jogger Nỉ", category: "pants", price: 350000, img: "https://pos.nvncdn.com/be3159-662/ps/20220922_rxEZc6eS78hK8ambfrzbTUwZ.jpg", isNew: true, rating: 5 },
    { id: 13, name: "Quần Âu Hàn Quốc", category: "pants", price: 520000, img: "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgmjbmodmxo31c", isNew: false, rating: 5 },
    { id: 14, name: "Quần Cargo Pants", category: "pants", price: 480000, img: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lvyhdbgzjeftfa", isNew: true, rating: 4 },
    { id: 15, name: "Quần Đùi Tập Gym", category: "pants", price: 180000, img: "https://cf.shopee.vn/file/e5e588a21d0d414296ff31d61a915bf2", isNew: false, rating: 3 },

    // NHÓM PHỤ KIỆN (ACCESS) - 5 items
    { id: 16, name: "Thắt Lưng Da", category: "access", price: 850000, img: "https://lh4.googleusercontent.com/n6g1hX2jMqfCirizMT5tBNsLhkdP9FjjNMX851fyxNmm8S-6gCRwhqxfx6XNpIeFJy6uStQnZjjBTqupqV-4TjmTJlAhVBKWKLB1aDWYVGDgCHyVt9_0kd_ovBCLXdW9X5PaRpJYhlSxHUpHkiB3Z7w", isNew: true, rating: 5 },
    { id: 17, name: "Mũ Beanie Len", category: "access", price: 120000, img: "https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lq1uyv0r3n0750", isNew: false, rating: 4 },
    { id: 18, name: "Ví Da Cầm Tay", category: "access", price: 950000, img: "https://tuida.com.vn/wp-content/uploads/2020/11/Vi-Da-Nam-Cam-Tay-SVB12-Brown.jpg", isNew: true, rating: 5 },
    { id: 19, name: "Vớ (Tất) Khử Mùi", category: "access", price: 50000, img: "https://tse2.mm.bing.net/th/id/OIP.wRCoNjHWHJAAL1KxjzFGoAHaHa?pid=Api&P=0&h=180", isNew: false, rating: 5 },
    { id: 20, name: "Kính Mát Phi Công", category: "access", price: 1250000, img: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lo1clsxtylm551", isNew: true, rating: 5 },
];