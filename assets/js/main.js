Fancybox.bind("[data-fancybox='gallery']", {
  Carousel: {
    Toolbar: {
      display: {
        left: ["infobar"],
        middle: [],
        right: ["thumbs"],
      },
      items: {
        thumbs: {
          tpl: `<button data-thumbs-action="toggle" class="f-button" title="Toggle thumbnails"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none"><path d="M15.9844 21.0078V16.9766H20.0156V21.0078H15.9844ZM15.9844 15.0078V10.9766H20.0156V15.0078H15.9844ZM9.98438 9.00781V4.97656H14.0156V9.00781H9.98438ZM15.9844 4.97656H20.0156V9.00781H15.9844V4.97656ZM9.98438 15.0078V10.9766H14.0156V15.0078H9.98438ZM3.98438 15.0078V10.9766H8.01562V15.0078H3.98438ZM3.98438 21.0078V16.9766H8.01562V21.0078H3.98438ZM9.98438 21.0078V16.9766H14.0156V21.0078H9.98438ZM3.98438 9.00781V4.97656H8.01562V9.00781H3.98438Z" fill="#999999"/></svg></button>`,
        },
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
        },
      },
    });
  });
}

function initRelatedNewsSlider() {
  const swiperContainers = document.querySelectorAll(".related-news-swiper");
  if (!swiperContainers.length) return;

  swiperContainers.forEach((container) => {
    new Swiper(container, {
      slidesPerView: 1.2,
      spaceBetween: 16,
      grabCursor: true,
      breakpoints: {
        480: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
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
          const otherList = other.querySelector(
            ".section-header__dropdown-list",
          );
          if (otherBtn && otherList) {
            otherList.classList.add("hidden");
            otherList.classList.remove("flex");
            otherBtn.querySelector("svg").classList.remove("rotate-180");
          }
        }
      });

      const isHidden = list.classList.contains("hidden") || !list.classList.contains("flex");
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

function initHistoryTimeline() {
  const wheelItems = document.querySelectorAll(
    ".history-wheel__year-item[data-year]",
  );
  const mobileButtons = document.querySelectorAll("[data-mobile-year]");
  const panels = document.querySelectorAll(".history-content-panel");

  if (!wheelItems.length && !mobileButtons.length) return;

  function setActiveYear(year) {
    const activeItem = Array.from(wheelItems).find(
      (item) => item.dataset.year === year,
    );
    if (!activeItem) return;

    // 1. Update active states on desktop wheel items
    wheelItems.forEach((item) => {
      item.classList.toggle("is-active", item.dataset.year === year);
    });

    // 2. Update active states on mobile slider buttons
    mobileButtons.forEach((btn) => {
      const isActive = btn.dataset.mobileYear === year;
      btn.classList.toggle("border-b-2", isActive);
      btn.classList.toggle("border-primary", isActive);
      btn.classList.toggle("text-primary", isActive);
      btn.classList.toggle("text-gray-300", !isActive);
      // Scroll active button into view on mobile
      if (isActive)
        btn.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
    });

    // 3. Update active panel for event content
    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.id === `panel-${year}`);
    });
  }

  // Bind click event to desktop wheel items
  wheelItems.forEach((item) => {
    item.addEventListener("click", () => {
      const year = item.dataset.year;
      setActiveYear(year);
    });
  });

  // Bind click event to mobile slider buttons
  mobileButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const year = btn.dataset.mobileYear;
      setActiveYear(year);
    });
  });

  // Initialize active year on load
  // Lấy năm đầu tiên từ danh sách phần tử thực tế trong HTML
  const firstYear =
    wheelItems[0]?.dataset.year || mobileButtons[0]?.dataset.mobileYear;
  if (firstYear) {
    setActiveYear(firstYear);
  }
}

function initGoalsToggle() {
  const toggleBtn = document.getElementById("goalsToggleBtn");
  const shortList = document.getElementById("goalsShortList");
  const detailedList = document.getElementById("goalsDetailedList");
  if (!toggleBtn || !shortList || !detailedList) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = detailedList.classList.contains("is-open");
    const spanText = toggleBtn.querySelector("span");

    if (isOpen) {
      detailedList.classList.remove("is-open");
      shortList.classList.remove("is-hidden");
      toggleBtn.classList.remove("is-active");
      toggleBtn.setAttribute("aria-expanded", "false");
      if (spanText) spanText.textContent = "Xem thêm";
    } else {
      detailedList.classList.add("is-open");
      shortList.classList.add("is-hidden");
      toggleBtn.classList.add("is-active");
      toggleBtn.setAttribute("aria-expanded", "true");
      if (spanText) spanText.textContent = "Thu gọn";
    }
  });
}

function initDynamicGalleryOverlay() {
  const hiddenContainer = document.getElementById("gallery-hidden");
  const thumbnailsRow = document.getElementById("gallery-thumbnails");
  if (!hiddenContainer || !thumbnailsRow) return;

  const hiddenCount = hiddenContainer.querySelectorAll(
    'a[data-fancybox="gallery"]',
  ).length;
  if (thumbnailsRow.children.length < 5) return;

  const fifthThumb = thumbnailsRow.children[4];
  const overlay = fifthThumb.querySelector(".absolute");
  const img = fifthThumb.querySelector("img");

  if (hiddenCount > 0) {
    if (overlay) {
      overlay.textContent = `+${hiddenCount}`;
      overlay.style.setProperty("display", "flex", "important");
    }
    if (img) {
      img.classList.add("opacity-0");
    }
  } else {
    if (overlay) {
      overlay.style.setProperty("display", "none", "important");
    }
    if (img) {
      img.classList.remove("opacity-0");
    }
  }
}

function initProductGallery() {
  const mainCoverLink = document.getElementById("main-cover-link");
  const mainCoverImg = mainCoverLink
    ? mainCoverLink.querySelector("img")
    : null;
  const thumbnailsRow = document.getElementById("gallery-thumbnails");
  if (!thumbnailsRow) return;

  const thumbs = thumbnailsRow.querySelectorAll(".w-20.h-20");

  thumbs.forEach((thumb, index) => {
    // The 5th thumbnail is the +28 overflow overlay. Clicking it should trigger Fancybox immediately.
    if (index === 4) return;

    const anchor = thumb.querySelector("a");
    if (!anchor) return;

    anchor.addEventListener("click", (e) => {
      // If programmatically clicked (from the main cover click redirect), let it bubble up to Fancybox
      if (!e.isTrusted) return;

      // Manual user click: intercept to update main image on the page instead of opening Fancybox
      e.preventDefault();
      e.stopPropagation();

      const imgSrc = anchor.getAttribute("href");
      const imgAlt = anchor.querySelector("img")
        ? anchor.querySelector("img").getAttribute("alt")
        : "";

      // Update main cover src, href, and alt
      if (mainCoverLink && mainCoverImg) {
        mainCoverLink.setAttribute("href", imgSrc);
        mainCoverImg.setAttribute("src", imgSrc);
        mainCoverImg.setAttribute("alt", imgAlt);
      }

      // Update active border styles
      thumbs.forEach((t) => {
        t.classList.remove("border-primary");
        t.classList.add("border-gray-eee");
      });
      thumb.classList.remove("border-gray-eee");
      thumb.classList.add("border-primary");
    });
  });

  // Clicking the main cover image triggers Fancybox on the currently active thumbnail link
  if (mainCoverLink) {
    mainCoverLink.addEventListener("click", (e) => {
      e.preventDefault();
      const activeThumb = thumbnailsRow.querySelector(".border-primary a");
      if (activeThumb) {
        activeThumb.click();
      } else {
        const firstThumb = thumbnailsRow.querySelector(
          'a[data-fancybox="gallery"]',
        );
        if (firstThumb) firstThumb.click();
      }
    });
  }
}

function initLibraryTabsAndGallery() {
  // 1. Dynamically hide images in grid when there are more than 3 images
  const albumGrids = document.querySelectorAll("#panel-images .grid");
  if (albumGrids.length > 0) {
    albumGrids.forEach((grid) => {
      const links = grid.querySelectorAll("a[data-fancybox]");
      links.forEach((link, index) => {
        if (index >= 3) {
          link.classList.add("hidden");
          link.style.display = "none"; // Force hide to override Tailwind's block utility class
        }
      });
    });
  }

  // 2. Initialize Fancybox globally for data-fancybox elements on this page
  if (typeof Fancybox !== "undefined") {
    Fancybox.bind("[data-fancybox]");
  }

  // 3. Click handler for See More buttons to trigger Fancybox popup for that album
  const seeMoreBtns = document.querySelectorAll("[data-fancybox-trigger]");
  seeMoreBtns.forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const targetGallery = trigger.getAttribute("data-fancybox-trigger");
      const firstImg = document.querySelector(`[data-fancybox="${targetGallery}"]`);
      if (firstImg) {
        firstImg.click();
      }
    });
  });

  // 4. Tab switching logic for Library page
  const tabBtns = document.querySelectorAll(".library-tab-btn");
  const tabPanels = document.querySelectorAll(".library-tab-panel");

  if (tabBtns.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");

        // Deactivate all buttons
        tabBtns.forEach((otherBtn) => {
          otherBtn.className = "library-tab-btn px-6 py-2.5 rounded-full font-bold text-sm bg-white text-gray-300 border border-gray-150 hover:text-primary-blue hover:border-primary-blue cursor-pointer transition-all duration-300 outline-none select-none";
        });

        // Activate current button
        btn.className = "library-tab-btn px-6 py-2.5 rounded-full font-bold text-sm bg-primary-blue text-white shadow-sm cursor-pointer transition-all duration-300 outline-none select-none";

        // Toggle panels
        tabPanels.forEach((panel) => {
          const panelId = panel.getAttribute("id");
          if (panelId === `panel-${targetTab.replace("tab-", "")}`) {
            panel.classList.remove("hidden");
          } else {
            panel.classList.add("hidden");
          }
        });
      });
    });
  }

  // 5. Playlist video switching logic
  const playlistItems = document.querySelectorAll(".video-playlist-item");
  const mainVideoCover = document.getElementById("main-video-cover");

  if (playlistItems.length > 0) {
    playlistItems.forEach((item) => {
      item.addEventListener("click", () => {
        // Update active state in playlist sidebar
        playlistItems.forEach((other) => {
          other.classList.remove("bg-[#EEF3FF]", "border-primary-xanh/20");
          other.classList.add("border-transparent", "hover:bg-gray-50");
          const title = other.querySelector("h4");
          if (title) {
            title.classList.remove("text-primary-xanh");
            title.classList.add("text-heading");
          }
          const iconWrapper = other.querySelector(
            ".shrink-0 .absolute div",
          );
          if (iconWrapper) {
            iconWrapper.className =
              "flex w-7 h-7 justify-center items-center shrink-0 rounded-full bg-white/80";
            const path = iconWrapper.querySelector("path");
            if (path) path.setAttribute("stroke", "#828282");
          }
          const overlay = other.querySelector(".playlist-overlay");
          if (overlay) {
            overlay.style.background = "rgba(0, 0, 0, 0.20)";
          }
        });

        // Activate clicked item
        item.classList.add("bg-[#EEF3FF]", "border-primary-xanh/20");
        item.classList.remove("border-transparent", "hover:bg-gray-50");
        const title = item.querySelector("h4");
        if (title) {
          title.classList.add("text-primary-xanh");
          title.classList.remove("text-heading");
        }
        const iconWrapper = item.querySelector(".shrink-0 .absolute div");
        if (iconWrapper) {
          iconWrapper.className =
            "flex w-7 h-7 justify-center items-center shrink-0 rounded-full bg-primary-xanh";
          const path = iconWrapper.querySelector("path");
          if (path) path.setAttribute("stroke", "white");
        }
        const overlay = item.querySelector(".playlist-overlay");
        if (overlay) {
          overlay.style.background = "rgba(0, 83, 255, 0.40)";
        }

        // Update main player cover image source
        const newSrc = item.getAttribute("data-video-src");
        if (newSrc && mainVideoCover) {
          mainVideoCover.src = newSrc;
        }

        // Update main video play link url
        const newVideoUrl = item.getAttribute("data-video-url");
        const mainVideoPlayLink = document.getElementById(
          "main-video-play-link",
        );
        if (newVideoUrl && mainVideoPlayLink) {
          mainVideoPlayLink.setAttribute("href", newVideoUrl);
        }
      });
    });
  }
}

function initDigitalResourcesTabsAndGallery() {
  // 1. Initialize Fancybox globally for data-fancybox elements on this page
  if (typeof Fancybox !== "undefined") {
    Fancybox.bind("[data-fancybox]");
  }

  // 2. Tab switching logic for Digital Resources Detail page
  const tabBtns = document.querySelectorAll("#tab-headers .tab-btn");
  const tabPanels = document.querySelectorAll("#tab-panels .tab-panel");

  if (tabBtns.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-tab");

        // Deactivate all buttons
        tabBtns.forEach((otherBtn) => {
          otherBtn.classList.remove("border-primary", "text-primary");
          otherBtn.classList.add("border-transparent", "text-gray-300");
        });

        // Activate current button
        btn.classList.add("border-primary", "text-primary");
        btn.classList.remove("border-transparent", "text-gray-300");

        // Toggle panels
        tabPanels.forEach((panel) => {
          const panelId = panel.getAttribute("id");
          if (panelId === `panel-${targetId.replace("tab-", "")}`) {
            panel.classList.remove("hidden");
          } else {
            panel.classList.add("hidden");
          }
        });
      });
    });
  }

  // 3. Playlist video switching logic
  const playlistItems = document.querySelectorAll(".video-playlist-item");
  const mainVideoCover = document.getElementById("main-video-cover");

  if (playlistItems.length > 0) {
    playlistItems.forEach((item) => {
      item.addEventListener("click", () => {
        // Update active state in playlist sidebar
        playlistItems.forEach((other) => {
          other.classList.remove("bg-[#EEF3FF]", "border-primary-xanh/20");
          other.classList.add("border-transparent", "hover:bg-gray-50");
          const title = other.querySelector("h4");
          if (title) {
            title.classList.remove("text-primary-xanh");
            title.classList.add("text-heading");
          }
          const iconWrapper = other.querySelector(
            ".shrink-0 .absolute div",
          );
          if (iconWrapper) {
            iconWrapper.className =
              "flex w-7 h-7 justify-center items-center shrink-0 rounded-full bg-white/80";
            const path = iconWrapper.querySelector("path");
            if (path) path.setAttribute("stroke", "#828282");
          }
          const overlay = other.querySelector(".playlist-overlay");
          if (overlay) {
            overlay.style.background = "rgba(0, 0, 0, 0.20)";
          }
        });

        // Activate clicked item
        item.classList.add("bg-[#EEF3FF]", "border-primary-xanh/20");
        item.classList.remove("border-transparent", "hover:bg-gray-50");
        const title = item.querySelector("h4");
        if (title) {
          title.classList.add("text-primary-xanh");
          title.classList.remove("text-heading");
        }
        const iconWrapper = item.querySelector(".shrink-0 .absolute div");
        if (iconWrapper) {
          iconWrapper.className =
            "flex w-7 h-7 justify-center items-center shrink-0 rounded-full bg-primary-xanh";
          const path = iconWrapper.querySelector("path");
          if (path) path.setAttribute("stroke", "white");
        }
        const overlay = item.querySelector(".playlist-overlay");
        if (overlay) {
          overlay.style.background = "rgba(0, 83, 255, 0.40)";
        }

        // Update main player cover image source
        const newSrc = item.getAttribute("data-video-src");
        if (newSrc && mainVideoCover) {
          mainVideoCover.src = newSrc;
        }

        // Update main video play link url
        const newVideoUrl = item.getAttribute("data-video-url");
        const mainVideoPlayLink = document.getElementById(
          "main-video-play-link",
        );
        if (newVideoUrl && mainVideoPlayLink) {
          mainVideoPlayLink.setAttribute("href", newVideoUrl);
        }
      });
    });
  }
}

function initShareholder() {
  // Tab switching logic for Shareholder page
  const tabBtns = document.querySelectorAll(".shareholder-tab-btn");
  const tabPanels = document.querySelectorAll(".shareholder-tab-panel");

  if (tabBtns.length && tabPanels.length) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");

        // Deactivate all buttons
        tabBtns.forEach((otherBtn) => {
          otherBtn.classList.remove("border-primary-xanh", "bg-primary-xanh/20", "text-[#3F3D48]");
          otherBtn.classList.add("border-transparent", "text-heading", "hover:bg-primary-xanh/10", "hover:text-[#3F3D48]");
        });

        // Activate current button
        btn.classList.add("border-primary-xanh", "bg-primary-xanh/20", "text-[#3F3D48]");
        btn.classList.remove("border-transparent", "text-heading", "hover:bg-primary-xanh/10", "hover:text-[#3F3D48]");

        // Toggle panels
        tabPanels.forEach((panel) => {
          const panelId = panel.getAttribute("id");
          if (panelId === `panel-${targetTab.replace("tab-", "")}`) {
            panel.classList.remove("hidden");
          } else {
            panel.classList.add("hidden");
          }
        });
      });
    });
  }

  // Dropdown selection functionality
  const dropdowns = document.querySelectorAll(".section-header__dropdown");
  dropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector(".section-header__dropdown-btn");
    if (!btn) return;
    const span = btn.querySelector("span");
    const items = dropdown.querySelectorAll(".section-header__dropdown-item");

    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        if (span) {
          span.textContent = item.textContent;
        }
        const list = dropdown.querySelector(".section-header__dropdown-list");
        if (list) {
          list.classList.add("hidden");
          list.classList.remove("flex");
        }
        const svg = btn.querySelector("svg");
        if (svg) {
          svg.classList.remove("rotate-180");
        }
      });
    });
  });
}

function initResourceCategoriesSlider() {
  const swiperContainers = document.querySelectorAll(".resource-categories-swiper");
  if (!swiperContainers.length) return;

  swiperContainers.forEach((container) => {
    new Swiper(container, {
      slidesPerView: 1.15,
      spaceBetween: 16,
      grabCursor: true,
      breakpoints: {
        640: {
          slidesPerView: 1.5,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
      },
    });
  });
}

function initCountUp() {
  const elements = document.querySelectorAll("[data-countup]");
  if (!elements.length || typeof countUp === "undefined") return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        const targetVal = parseFloat(el.getAttribute("data-target"));
        const suffix = el.getAttribute("data-suffix") || "";
        const separator = el.getAttribute("data-separator") || ",";

        if (entry.isIntersecting) {
          const instance = new countUp.CountUp(el, targetVal, {
            startVal: 0,
            duration: 2,
            separator: separator,
            suffix: suffix,
          });

          if (!instance.error) {
            instance.start();
          } else {
            console.error(instance.error);
          }
        } else {
          // Reset về 0 khi cuộn ra ngoài màn hình để sẵn sàng đếm lại lần sau
          el.textContent = "0" + suffix;
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initSearchPopup();
  initMobileMenu();
  initHeroSlider();
  initProductsSlider();
  initRelatedNewsSlider();
  initResourceCategoriesSlider();
  initProductFilterDropdown();
  initHistoryTimeline();
  initGoalsToggle();
  initDynamicGalleryOverlay();
  initProductGallery();
  initLibraryTabsAndGallery();
  initDigitalResourcesTabsAndGallery();
  initShareholder();
  initCountUp();
});
