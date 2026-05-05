const DB_PRODUCT_KEY = "vnph_products_db";
const DB_ORDER_KEY = "vnph_orders";

function initDatabase() {
  const oldData = localStorage.getItem(DB_PRODUCT_KEY);

  if (!oldData) {
    const dbProducts = products.map((p) => ({
      ...p,
      stock: p.stock || 10,
    }));

    localStorage.setItem(DB_PRODUCT_KEY, JSON.stringify(dbProducts));
  } else {
    const adminData = JSON.parse(localStorage.getItem("vnph_products") || "[]");
    if (adminData.length > 0) {
      const dbProducts = JSON.parse(oldData);
      let changed = false;

      dbProducts.forEach((dbP) => {
        const adminP = adminData.find((ap) => ap.sku === dbP.id);
        if (adminP && adminP.stock !== undefined) {
          const newStock = parseInt(adminP.stock) || 0;
          if (dbP.stock !== newStock) {
            dbP.stock = newStock;
            changed = true;
          }
        }
      });

      if (changed) {
        localStorage.setItem(DB_PRODUCT_KEY, JSON.stringify(dbProducts));
      }
    }
  }
}

function getProductsDB() {
  initDatabase();
  return JSON.parse(localStorage.getItem(DB_PRODUCT_KEY)) || [];
}

function saveProductsDB(data) {
  localStorage.setItem(DB_PRODUCT_KEY, JSON.stringify(data));
}

function getProductById(id) {
  const db = getProductsDB();
  return db.find((p) => p.id === id);
}

function updateStock(productId, quantity) {
  const db = getProductsDB();
  const product = db.find((p) => p.id === productId);

  if (!product) return false;

  if (product.stock < quantity) {
    return false;
  }

  product.stock -= quantity;

  saveProductsDB(db);
  return true;
}

function saveOrder(order) {
  const orders = JSON.parse(localStorage.getItem(DB_ORDER_KEY)) || [];
  orders.unshift(order);
  localStorage.setItem(DB_ORDER_KEY, JSON.stringify(orders));
}
