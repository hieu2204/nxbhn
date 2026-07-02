Fancybox.bind("[data-fancybox='gallery']", {
  Carousel: {
    Toolbar: {
      display: {
        left: ["infobar"],
        middle: [],
        right: ["thumbs"],
      },
    },
    Thumbs: {
      type: "classic",
      showOnStart: true,
    },
  },
});

const swiper = new Swiper(".test-swiper", {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

// Tab trên desktop, accordion trên mobile
function initTabs() {
  const tabGroups = document.querySelectorAll(".tabs");
  if (!tabGroups.length) return;

  tabGroups.forEach((group) => {
    const btns = group.querySelectorAll(".tabs__btn");
    const panels = group.querySelectorAll(".tabs__panel");

    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const isMobile = window.innerWidth < 768;
        const targetPanel = group.querySelector(`#${btn.dataset.tab}`);
        const isActive = btn.classList.contains("is-active");

        if (isMobile) {
          // Mobile — accordion: toggle cái đang click
          const alreadyOpen = isActive;
          btns.forEach((b) => b.classList.remove("is-active"));
          panels.forEach((p) => p.classList.remove("is-active"));
          if (!alreadyOpen) {
            btn.classList.add("is-active");
            targetPanel.classList.add("is-active");
          }
        } else {
          // Desktop — tab thường
          btns.forEach((b) => b.classList.remove("is-active"));
          panels.forEach((p) => p.classList.remove("is-active"));
          btn.classList.add("is-active");
          targetPanel.classList.add("is-active");
        }
      });
    });
  });
  // Mobile menu toggle
  function initMobileMenu() {
    const toggleBtn = document.getElementById("menu-toggle");
    const closeBtn = document.getElementById("menu-close");
    const mobileMenu = document.getElementById("mobile-menu");

    if (!toggleBtn || !mobileMenu) return;

    toggleBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("hidden");
      mobileMenu.classList.add("flex");
      document.body.style.overflow = "hidden"; // disable scroll
    });

    const closeMenu = () => {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
      document.body.style.overflow = ""; // enable scroll
    };

    if (closeBtn) {
      closeBtn.addEventListener("click", closeMenu);
    }

    // Close menu on click link
    const links = mobileMenu.querySelectorAll("a");
    links.forEach((link) => link.addEventListener("click", closeMenu));
  }
}

function initSearchPopup() {
  const popup = document.getElementById("search-popup");
  const backdrop = document.getElementById("search-popup-backdrop");
  const content = document.getElementById("search-popup-content");
  const closeBtn = document.getElementById("search-popup-close");
  const input = document.getElementById("search-popup-input");

  const triggerInput = document.getElementById("search-trigger-input");
  const triggerBtn = document.getElementById("search-trigger-btn");

  if (!popup || !backdrop || !content) return;

  const openPopup = (e) => {
    if (e) e.preventDefault();
    popup.classList.remove("hidden");
    popup.classList.add("flex");
    document.body.style.overflow = "hidden"; // disable scroll

    // Trigger reflow/animation
    setTimeout(() => {
      backdrop.classList.remove("opacity-0");
      backdrop.classList.add("opacity-100");
      content.classList.remove("scale-95", "opacity-0");
      content.classList.add("scale-100", "opacity-100");
      if (input) input.focus();
    }, 50);
  };

  const closePopup = (e) => {
    if (e) e.preventDefault();
    backdrop.classList.add("opacity-0");
    backdrop.classList.remove("opacity-100");
    content.classList.add("scale-95", "opacity-0");
    content.classList.remove("scale-100", "opacity-100");
    document.body.style.overflow = ""; // enable scroll

    setTimeout(() => {
      popup.classList.remove("flex");
      popup.classList.add("hidden");
    }, 300); // match transition duration
  };

  if (triggerInput) triggerInput.addEventListener("click", openPopup);
  if (triggerBtn) triggerBtn.addEventListener("click", openPopup);
  if (closeBtn) closeBtn.addEventListener("click", closePopup);
  if (backdrop) backdrop.addEventListener("click", closePopup);

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !popup.classList.contains("hidden")) {
      closePopup();
    }
  });
}

function initMobileMenu() {
  const toggleBtn = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("mobile-menu-close");
  const mobileMenu = document.getElementById("mobile-menu");
  const backdrop = document.getElementById("mobile-menu-backdrop");
  const content = document.getElementById("mobile-menu-content");

  if (!toggleBtn || !mobileMenu || !backdrop || !content) return;

  const openMenu = () => {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("block");
    document.body.style.overflow = "hidden"; // disable scroll

    // Trigger reflow/animation
    setTimeout(() => {
      backdrop.classList.remove("opacity-0");
      backdrop.classList.add("opacity-100");
      content.classList.remove("-translate-x-full");
      content.classList.add("translate-x-0");
    }, 50);
  };

  const closeMenu = () => {
    backdrop.classList.add("opacity-0");
    backdrop.classList.remove("opacity-100");
    content.classList.add("-translate-x-full");
    content.classList.remove("translate-x-0");
    document.body.style.overflow = ""; // enable scroll

    setTimeout(() => {
      mobileMenu.classList.remove("block");
      mobileMenu.classList.add("hidden");
    }, 300); // match transition duration
  };

  toggleBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (backdrop) backdrop.addEventListener("click", closeMenu);

  // Mobile navigation accordions
  const dropdownParents = mobileMenu.querySelectorAll(
    ".mobile-dropdown-parent",
  );
  dropdownParents.forEach((parent) => {
    const header = parent.querySelector("div");
    const subList = parent.querySelector("ul");
    const arrow = parent.querySelector("svg");

    if (header && subList) {
      header.addEventListener("click", () => {
        const isHidden = subList.classList.contains("hidden");
        if (isHidden) {
          subList.classList.remove("hidden");
          subList.classList.add("flex");
          if (arrow) arrow.classList.add("rotate-180");
        } else {
          subList.classList.add("hidden");
          subList.classList.remove("flex");
          if (arrow) arrow.classList.remove("rotate-180");
        }
      });
    }
  });

  // Link mobile search trigger to open search popup modal
  const mobileSearchTrigger = document.getElementById("mobile-search-trigger");
  if (mobileSearchTrigger) {
    mobileSearchTrigger.addEventListener("click", (e) => {
      closeMenu();

      // Delay opening search popup so transitions don't clash
      setTimeout(() => {
        const triggerBtn = document.getElementById("search-trigger-btn");
        if (triggerBtn) triggerBtn.click();
      }, 350);
    });
  }
}

function initHeroSlider() {
  const heroSwiperElement = document.querySelector(".swiper.hero");
  if (!heroSwiperElement) return;

  const heroSwiper = new Swiper(".swiper.hero", {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper.hero .swiper-pagination",
      clickable: true,
      bulletClass: "swiper-pagination-bullet",
      bulletActiveClass: "swiper-pagination-bullet-active",
    },
  });
}

function initProductsSlider() {
  const swiperContainers = document.querySelectorAll(".products-swiper");
  if (!swiperContainers.length) return;

  swiperContainers.forEach((container) => {
    const prevEl = container.querySelector(".products-swiper-prev");
    const nextEl = container.querySelector(".products-swiper-next");

    new Swiper(container, {
      slidesPerView: 1.2,
      spaceBetween: 16,
      grabCursor: true,
      navigation: {
        nextEl: nextEl,
        prevEl: prevEl,
      },
      breakpoints: {
        480: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 24,
        }
      }
    });
  });
}

function initProductFilterDropdown() {
  const dropdowns = document.querySelectorAll(".section-header__dropdown");
  if (!dropdowns.length) return;

  dropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector(".section-header__dropdown-btn");
    const list = dropdown.querySelector(".section-header__dropdown-list");
    if (!btn || !list) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      // Close other open filter dropdowns
      dropdowns.forEach((other) => {
        if (other !== dropdown) {
          const otherBtn = other.querySelector(".section-header__dropdown-btn");
          const otherList = other.querySelector(".section-header__dropdown-list");
          if (otherBtn && otherList) {
            otherList.classList.add("hidden");
            otherList.classList.remove("flex");
            otherBtn.querySelector("svg").classList.remove("rotate-180");
          }
        }
      });

      const isHidden = list.classList.contains("hidden");
      if (isHidden) {
        list.classList.remove("hidden");
        list.classList.add("flex");
        btn.querySelector("svg").classList.add("rotate-180");
      } else {
        list.classList.add("hidden");
        list.classList.remove("flex");
        btn.querySelector("svg").classList.remove("rotate-180");
      }
    });
  });

  document.addEventListener("click", () => {
    dropdowns.forEach((dropdown) => {
      const btn = dropdown.querySelector(".section-header__dropdown-btn");
      const list = dropdown.querySelector(".section-header__dropdown-list");
      if (btn && list) {
        list.classList.add("hidden");
        list.classList.remove("flex");
        btn.querySelector("svg").classList.remove("rotate-180");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initSearchPopup();
  initMobileMenu();
  initHeroSlider();
  initProductsSlider();
  initProductFilterDropdown();
});
