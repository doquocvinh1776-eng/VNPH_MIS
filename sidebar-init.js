// sidebar-init.js — Khởi tạo sidebar dùng chung cho profile.html & orders.html
// Đồng bộ tên, avatar từ localStorage, highlight trang hiện tại, xử lý đăng xuất.

function initSidebar() {
  const currentPage = window.location.pathname.split("/").pop() || "profile.html";

  // --- Highlight active link ---
  const linkMap = {
    "profile.html": "sidebar-link-profile",
    "orders.html": "sidebar-link-orders",
  };

  const activeId = linkMap[currentPage];
  if (activeId) {
    const activeLink = document.getElementById(activeId);
    if (activeLink) {
      activeLink.classList.remove("text-slate-800");
      activeLink.classList.add("text-[#2B427D]", "font-bold", "bg-slate-100");
      const icon = activeLink.querySelector(".material-symbols-outlined");
      if (icon) {
        icon.style.fontVariationSettings = '"FILL" 1';
      }
    }
  }

  // --- Đồng bộ tên khách hàng từ localStorage ---
  const profileData = JSON.parse(localStorage.getItem("profileObj") || "{}");
  const sidebarName = document.getElementById("sidebar-user-name");

  if (sidebarName && profileData["Tên khách hàng"]) {
    sidebarName.innerText = profileData["Tên khách hàng"];
  }

  // --- Đồng bộ avatar từ localStorage ---
  const avatarData = localStorage.getItem("avatar");
  const avatarContainer = document.getElementById("sidebar-avatar");

  if (avatarData && avatarContainer) {
    avatarContainer.innerHTML = `<img src="${avatarData}" class="w-full h-full object-cover rounded-full" alt="Avatar">`;
  }

  // --- Xử lý Đăng xuất ---
  const logoutLink = document.getElementById("sidebar-link-logout");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });
  }
}
