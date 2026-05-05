
function productCardHTML(product, options = {}) {
  const p = product;
  const keyword = options.highlightKeyword || "";
  const isBest = options.isBest || false;

  let titleHTML = p.title;
  if (keyword) {
    const regex = new RegExp(`(${keyword})`, "gi");
    titleHTML = p.title.replace(regex, "<span style='color:#a33629;font-weight:bold'>$1</span>");
  }

  const priceFormatted = p.price.toLocaleString("vi-VN") + "đ";

  return `
    <div
      class="product-card bg-white rounded-xl cursor-pointer transition-all px-5 py-6 min-h-[310px] shadow-sm flex flex-col hover:shadow-md"
      data-id="${p.id}"
      style="transform: translateY(0); transition: transform 0.2s, box-shadow 0.2s;"
      onmouseenter="this.style.transform='translateY(-2px)'"
      onmouseleave="this.style.transform='translateY(0)'"
    >
      ${isBest ? `<div class="absolute top-3 right-3 bg-[#fed65b] text-[#745c00] text-[8px] font-black px-2 py-0.5 rounded z-10">BEST SELLER</div>` : ""}

      <div class="h-[190px] flex items-center justify-center mb-4 overflow-hidden rounded-lg">
        <img
          src="images/${p.images[0]}"
          class="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-500"
          alt="${p.title}"
        />
      </div>

      <div class="text-center text-sm font-semibold text-[#2B427D] min-h-[40px] leading-snug mb-2">
        ${titleHTML}
      </div>

      <div class="text-center text-[#d88900] font-bold text-base mt-auto">
        ${priceFormatted}
      </div>
    </div>
  `;
}

function renderProductCards(list, container, options = {}) {
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="col-span-4 text-center py-20 text-gray-500">
        ${options.emptyMessage || "Không tìm thấy sản phẩm phù hợp."}
      </div>
    `;
    return;
  }

  container.innerHTML = list
    .map((p) => productCardHTML(p, options))
    .join("");
}
