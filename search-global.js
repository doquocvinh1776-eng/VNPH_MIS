function removeVN(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

function initGlobalSearch() {
  const searchInput = document.querySelector("input[placeholder*='Tìm']");
  if (!searchInput) return;

  const searchBox = searchInput.closest(".relative");
  if (!searchBox) return;

  const searchIcon = [
    ...document.querySelectorAll(".material-symbols-outlined"),
  ].find((icon) => icon.innerText.trim() === "search");

  let suggestBox = searchBox.querySelector(".global-suggest-box");

  if (!suggestBox) {
    suggestBox = document.createElement("div");
    suggestBox.className =
      "global-suggest-box absolute left-0 top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] hidden max-h-[320px] overflow-y-auto";
    searchBox.appendChild(suggestBox);
  }

  function doSearch() {
    const keyword = searchInput.value.trim();

    if (keyword !== "") {
      window.location.href =
        "category.html?search=" + encodeURIComponent(keyword);
    }
  }

  function showSuggestions() {
    if (typeof products === "undefined") return;

    const keyword = removeVN(searchInput.value.trim().toLowerCase());

    if (!keyword) {
      suggestBox.classList.add("hidden");
      suggestBox.innerHTML = "";
      return;
    }

    const results = products
      .filter((p) => removeVN((p.title || "").toLowerCase()).includes(keyword))
      .slice(0, 6);

    if (results.length === 0) {
      suggestBox.innerHTML = `
        <div class="px-4 py-3 text-xs text-gray-500">
          Không tìm thấy sản phẩm
        </div>
      `;
      suggestBox.classList.remove("hidden");
      return;
    }

    suggestBox.innerHTML = results
      .map(
        (p) => `
          <div
            class="suggest-item flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
            data-id="${p.id}"
          >
            <img
              src="images/${p.images[0]}"
              class="w-12 h-12 object-contain bg-gray-50 rounded"
            />

            <div class="flex-1">
              <p class="text-xs font-semibold text-[#2B427D] leading-snug">
                ${p.title}
              </p>

              <p class="text-xs text-[#d88900] font-bold mt-1">
                ${p.price.toLocaleString("vi-VN")}đ
              </p>
            </div>
          </div>
        `,
      )
      .join("");

    suggestBox.classList.remove("hidden");
  }

  searchInput.addEventListener("input", showSuggestions);

  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      doSearch();
    }
  });

  if (searchIcon) {
    searchIcon.addEventListener("click", doSearch);
  }

  suggestBox.addEventListener("click", function (e) {
    const item = e.target.closest(".suggest-item");
    if (!item) return;

    const product = products.find((p) => p.id === item.dataset.id);
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

setTimeout(initGlobalSearch, 300);
