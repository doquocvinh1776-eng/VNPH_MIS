// stock-sync.js — Đồng bộ tồn kho từ admin (vnph_products) sang products.js cho trang khách hàng
// Load file này SAU products.js trên mọi trang khách hàng (home, category, product-detail)

(function syncStockFromAdmin() {
  if (typeof products === "undefined") return;

  const adminData = JSON.parse(localStorage.getItem("vnph_products") || "[]");
  if (adminData.length === 0) return;

  products.forEach(function (p) {
    // Tìm sản phẩm admin khớp theo SKU (admin dùng field "sku", products.js dùng "id")
    const adminProduct = adminData.find(function (ap) {
      return ap.sku === p.id;
    });

    if (adminProduct && adminProduct.stock !== undefined) {
      p.stock = parseInt(adminProduct.stock) || 0;
    }
  });
})();
