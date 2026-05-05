
/**
 * Tạo HTML khung section chứa sản phẩm.
 * @param {string} sectionId - ID của section (ví dụ: "section-viewed")
 * @param {string} title - Tiêu đề hiển thị (ví dụ: "Sản phẩm đã xem")
 * @returns {string} HTML string
 */
function sectionFrameHTML(sectionId, title) {
  return `
    <section id="${sectionId}">
      <div class="flex items-center mb-6">
        <div class="flex-1"></div>
        <h2 class="text-base font-semibold text-[#2B427D] text-center whitespace-nowrap">${title}</h2>
        <div class="flex-1 text-right">
          <a href="category.html" class="text-sm text-gray-500 hover:text-[#2B427D] transition-colors inline-flex items-center gap-1">
            Xem tất cả <span class="material-symbols-outlined text-[16px]">chevron_right</span>
          </a>
        </div>
      </div>
      <div class="bg-[#F2F5F9] p-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        </div>
      </div>
    </section>
  `;
}

/**
 * Render tất cả các khung section vào container.
 * @param {string} containerSelector - CSS selector của container chứa các section
 * @param {Array} sections - Mảng config, mỗi item { id, title }
 */
function renderSectionFrames(containerSelector, sections) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = sections
    .map((s) => sectionFrameHTML(s.id, s.title))
    .join("");
}
