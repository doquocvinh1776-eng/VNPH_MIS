// header-init.js — Khởi tạo toàn bộ logic nút bấm Header sau khi fetch("header2.html")

function removeVN(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

function initHeader() {
  const searchInput = document.querySelector("#header2 input[placeholder*='Tìm']");
  const searchIcon = [...document.querySelectorAll("#header2 .material-symbols-outlined")].find(
    (icon) => icon.innerText.trim() === "search"
  );

  // --- Search & Autocomplete ---
  if (searchInput && searchIcon) {
    const searchBox = searchInput.closest(".relative");
    let suggestBox = searchBox.querySelector(".suggestion-box");
    
    if (!suggestBox) {
      suggestBox = document.createElement("div");
      suggestBox.className = "suggestion-box absolute left-0 top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] hidden max-h-[320px] overflow-y-auto";
      searchBox.appendChild(suggestBox);
    }

    function doSearch() {
      const keyword = searchInput.value.trim();
      if (keyword !== "") {
        window.location.href = "category.html?search=" + encodeURIComponent(keyword);
      }
    }

    function showSuggestions() {
      const keyword = removeVN(searchInput.value.trim().toLowerCase());
      if (!keyword) {
        suggestBox.classList.add("hidden");
        suggestBox.innerHTML = "";
        return;
      }

      const allProducts = typeof products !== "undefined" ? products : [];
      const results = allProducts
        .filter((p) => removeVN((p.title || "").toLowerCase()).includes(keyword))
        .slice(0, 6);

      if (results.length === 0) {
        suggestBox.innerHTML = `<div class="px-4 py-3 text-xs text-gray-500">Không tìm thấy sản phẩm</div>`;
        suggestBox.classList.remove("hidden");
        return;
      }

      suggestBox.innerHTML = results
        .map(
          (p) => `
          <div class="suggest-item flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer" data-id="${p.id}">
            <img src="images/${(p.images || [])[0] || ""}" class="w-12 h-12 object-contain bg-gray-50 rounded" />
            <div class="flex-1">
              <p class="text-xs font-semibold text-[#2B427D] leading-snug">${p.title}</p>
              <p class="text-xs text-[#d88900] font-bold mt-1">${(p.price || 0).toLocaleString("vi-VN")}đ</p>
            </div>
          </div>`
        )
        .join("");

      suggestBox.classList.remove("hidden");
    }

    searchInput.addEventListener("input", showSuggestions);
    searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") doSearch(); });
    searchIcon.addEventListener("click", doSearch);

    suggestBox.addEventListener("click", function (e) {
      const item = e.target.closest(".suggest-item");
      if (!item) return;
      const allProducts = typeof products !== "undefined" ? products : [];
      const product = allProducts.find((p) => p.id === item.dataset.id);
      if (!product) return;
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "product-detail.html";
    });

    document.addEventListener("click", function (e) {
      if (!searchBox.contains(e.target)) {
        suggestBox.classList.add("hidden");
      }
    });
  }

  // --- Nút Tài khoản -> profile.html ---
  const personIcon = [...document.querySelectorAll("#header2 .material-symbols-outlined")].find(
    (icon) => icon.innerText.trim() === "person"
  );
  if (personIcon) {
    const accountBtn = personIcon.closest("a") || personIcon.closest(".group") || personIcon.closest(".flex.flex-col.items-center");
    if (accountBtn && !accountBtn.href) {
      accountBtn.style.cursor = "pointer";
      accountBtn.onclick = () => { window.location.href = "profile.html"; };
    }
  }

  // --- Nút Giỏ hàng -> cart.html ---
  const cartIcon = [...document.querySelectorAll("#header2 .material-symbols-outlined")].find(
    (icon) => icon.innerText.trim() === "shopping_bag"
  );
  if (cartIcon) {
    const cartBtn = cartIcon.closest("a") || cartIcon.closest(".group") || cartIcon.closest(".flex.flex-col.items-center");
    if (cartBtn && (!cartBtn.href || cartBtn.href.includes("#"))) {
      cartBtn.style.cursor = "pointer";
      cartBtn.onclick = () => { window.location.href = "cart.html"; };
    }
  }

  // --- Sub-nav active state ---
  const currentPage = window.location.pathname.split("/").pop() || "home.html";
  const currentHash = window.location.hash;

  document.querySelectorAll("#header2 .subnav-link").forEach((link) => {
    const linkPage = link.dataset.page || link.getAttribute("href") || "";
    const linkHref = link.getAttribute("href") || "";
    
    // Xác định trang đang active
    let isActive = false;
    
    if (linkPage === currentPage && !linkHref.includes("#")) {
      isActive = true;
    }
    // Nếu link có hash (ví dụ: home.html#section-bestseller), chỉ active khi cả page + hash khớp
    if (linkHref.includes("#") && linkPage === currentPage && currentHash && linkHref.includes(currentHash)) {
      isActive = true;
    }

    if (isActive) {
      link.style.borderBottom = "3px solid #2b427d";
      link.style.paddingBottom = "4px";
      link.style.color = "#1a2f5a";
      link.classList.remove("hover:text-pnj-brown");
    }
  });
}
