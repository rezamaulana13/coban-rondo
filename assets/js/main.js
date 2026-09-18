/* ==========================================================================
   COBAN RONDO OUTBOUND & CAMPING — MAIN INTERACTIVE JAVASCRIPT
   Navbar scroll, Package & Gallery Filter, Interactive Cost Calculator,
   WhatsApp Booking Generator, Lightbox Modal, Article Reader, & Stats Counter
   ========================================================================== */

(function () {
  "use strict";

  // Global Config
  const CR_CONFIG = {
    WA_NUMBER: "6281234567890",
    BRAND_NAME: "Coban Rondo Outbound & Camping",
    LOCATION: "Kawasan Wisata Coban Rondo, Pandesari, Pujon, Malang, Jawa Timur"
  };

  window.CR_CONFIG = CR_CONFIG;

  // Helper: WhatsApp URL Generator
  function buildWaUrl(text) {
    return `https://wa.me/${CR_CONFIG.WA_NUMBER}?text=${encodeURIComponent(text)}`;
  }
  window.buildWaUrl = buildWaUrl;

  // Helper: Currency Formatter
  function formatRupiah(num) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(num);
  }
  window.formatRupiah = formatRupiah;

  document.addEventListener("DOMContentLoaded", function () {
    initNavbarScroll();
    initStatsCounter();
    initPackageFilter();
    initGalleryFilter();
    initGalleryLightbox();
    initCostCalculator();
    initBookingModal();
    initQuickWaTriggers();
    initArticleFeatures();
    initBackToTop();
    initTestimonialSlider();
    initHeroVideo();
  });

  /* --------------------------------------------------------------------------
     1. NAVBAR SCROLL EFFECT
     -------------------------------------------------------------------------- */
  function initNavbarScroll() {
    const navbar = document.querySelector(".navbar-cr");
    const progressBar = document.getElementById("navScrollProgress");
    if (!navbar) return;

    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 30) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      if (progressBar) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
        progressBar.style.width = Math.min(100, Math.max(0, progress)) + "%";
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  /* --------------------------------------------------------------------------
     2. ANIMATED STATS COUNTER
     -------------------------------------------------------------------------- */
  function initStatsCounter() {
    const counters = document.querySelectorAll(".stat-number[data-target]");
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-target"), 10);
          const prefix = counter.getAttribute("data-prefix") || "";
          const suffix = counter.getAttribute("data-suffix") || "";
          const duration = 1800;
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = `${prefix}${target.toLocaleString("id-ID")}${suffix}`;
              clearInterval(timer);
            } else {
              counter.textContent = `${prefix}${Math.floor(current).toLocaleString("id-ID")}${suffix}`;
            }
          }, stepTime);

          obs.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  /* --------------------------------------------------------------------------
     3. PACKAGE FILTER TABS + URL HASH AUTO-FILTER
     -------------------------------------------------------------------------- */
  function initPackageFilter() {
    const filterContainer = document.querySelector("[data-filter-target='paket']");
    if (!filterContainer) return;

    const filterBtns = filterContainer.querySelectorAll(".btn-filter");
    const packageItems = document.querySelectorAll(".package-item");

    // Core filter function — reusable
    function applyFilter(filterValue) {
      filterBtns.forEach(b => b.classList.remove("active"));
      const matchBtn = filterContainer.querySelector(`[data-filter="${filterValue}"]`);
      if (matchBtn) matchBtn.classList.add("active");
      else filterContainer.querySelector("[data-filter='all']").classList.add("active");

      packageItems.forEach(item => {
        const category = item.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue || category.includes(filterValue)) {
          item.style.display = "block";
          item.style.animation = "fadeInUp 0.4s ease forwards";
        } else {
          item.style.display = "none";
        }
      });
    }

    // Button click handler
    filterBtns.forEach(btn => {
      btn.addEventListener("click", function () {
        const filterValue = this.getAttribute("data-filter");
        applyFilter(filterValue);
        // Update URL hash without page jump
        if (filterValue !== "all") {
          history.replaceState(null, "", "#" + filterValue);
        } else {
          history.replaceState(null, "", window.location.pathname);
        }
      });
    });

    // Auto-filter from URL hash on page load or hash change
    function handleHashFilter() {
      const hash = window.location.hash.replace("#", "");
      if (hash && hash !== "") {
        applyFilter(hash);
        const catalogSection = filterContainer.closest("section");
        if (catalogSection) {
          catalogSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        applyFilter("all");
      }
    }

    // On initial load
    if (window.location.hash) {
      setTimeout(handleHashFilter, 350);
    }

    // On hash change (e.g. clicking dropdown when already on /paket)
    window.addEventListener("hashchange", handleHashFilter);
  }

  /* --------------------------------------------------------------------------
     4. GALLERY FILTER
     -------------------------------------------------------------------------- */
  function initGalleryFilter() {
    const filterContainer = document.querySelector("[data-filter-target='galeri']");
    if (!filterContainer) return;

    const filterBtns = filterContainer.querySelectorAll(".btn-filter");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterBtns.forEach(btn => {
      btn.addEventListener("click", function () {
        filterBtns.forEach(b => b.classList.remove("active"));
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        galleryItems.forEach(item => {
          const category = item.getAttribute("data-category");
          if (filterValue === "all" || category === filterValue || category.includes(filterValue)) {
            item.style.display = "block";
            item.style.animation = "fadeInUp 0.4s ease forwards";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     5. LIGHTBOX MODAL PREVIEW
     -------------------------------------------------------------------------- */
  function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll(".gallery-grid-item");
    if (!galleryItems.length) return;

    let lightboxModal = document.getElementById("galleryLightboxModal");
    if (!lightboxModal) {
      const modalHtml = `
        <div class="modal fade modal-glass" id="galleryLightboxModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content border-0">
              <div class="modal-header">
                <h5 class="modal-title font-heading text-white" id="lightboxTitle">Preview Foto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body p-0 text-center bg-dark">
                <img id="lightboxImage" src="" class="img-fluid w-100" style="max-height: 75vh; object-fit: contain;" alt="Preview">
                <div class="p-3 text-white-50 text-start bg-dark" id="lightboxCaption"></div>
              </div>
            </div>
          </div>
        </div>`;
      document.body.insertAdjacentHTML("beforeend", modalHtml);
      lightboxModal = document.getElementById("galleryLightboxModal");
    }

    const bsModal = new bootstrap.Modal(lightboxModal);
    const imgElem = document.getElementById("lightboxImage");
    const titleElem = document.getElementById("lightboxTitle");
    const captionElem = document.getElementById("lightboxCaption");

    galleryItems.forEach(item => {
      item.addEventListener("click", function () {
        const img = this.querySelector("img");
        const title = this.getAttribute("data-title") || (img ? img.alt : "Dokumentasi Coban Rondo");
        const desc = this.getAttribute("data-desc") || "Kegiatan seru di Kawasan Wisata Coban Rondo, Malang.";

        if (img) {
          imgElem.src = img.src;
          titleElem.textContent = title;
          captionElem.textContent = desc;
          bsModal.show();
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. INTERACTIVE COST CALCULATOR
     -------------------------------------------------------------------------- */
  function initCostCalculator() {
    const calcForm = document.getElementById("calcForm");
    if (!calcForm) return;

    const packageSelect = document.getElementById("calcPackage");
    const paxInput = document.getElementById("calcPax");
    const paxDisplay = document.getElementById("calcPaxDisplay");
    const addonCheckboxes = document.querySelectorAll(".calc-addon");

    const resultTotal = document.getElementById("calcTotalDisplay");
    const resultPerPax = document.getElementById("calcPerPaxDisplay");
    const btnBookCalc = document.getElementById("btnCalcBooking");

    function calculate() {
      const selectedOption = packageSelect.options[packageSelect.selectedIndex];
      const basePrice = parseInt(selectedOption.getAttribute("data-price") || 0, 10);
      const pax = parseInt(paxInput.value || 1, 10);

      if (paxDisplay) {
        paxDisplay.textContent = `${pax} Orang`;
      }

      let addonTotal = 0;
      let selectedAddonsList = [];

      addonCheckboxes.forEach(cb => {
        if (cb.checked) {
          const addonPrice = parseInt(cb.getAttribute("data-price") || 0, 10);
          const addonType = cb.getAttribute("data-type"); // 'per_pax' or 'flat'
          const addonName = cb.getAttribute("data-name");

          if (addonType === "flat") {
            addonTotal += addonPrice;
          } else {
            addonTotal += (addonPrice * pax);
          }
          selectedAddonsList.push(addonName);
        }
      });

      const grandTotal = (basePrice * pax) + addonTotal;
      const perPaxEstimate = pax > 0 ? Math.round(grandTotal / pax) : 0;

      if (resultTotal) resultTotal.textContent = formatRupiah(grandTotal);
      if (resultPerPax) resultPerPax.textContent = formatRupiah(perPaxEstimate);

      // Update button WhatsApp target
      if (btnBookCalc) {
        const packageName = selectedOption.text.split("—")[0].trim();
        const addonText = selectedAddonsList.length > 0 ? `\n• Add-on Tambahan: ${selectedAddonsList.join(", ")}` : "";
        const waMsg = `Halo Admin ${CR_CONFIG.BRAND_NAME}, saya ingin konsultasi simulasi kegiatan:\n\n` +
          `• Pilihan Paket: ${packageName}\n` +
          `• Estimasi Peserta: ${pax} Orang\n` +
          `${addonText}\n` +
          `• Estimasi Total: ${formatRupiah(grandTotal)}\n\n` +
          `Mohon info ketersediaan tanggal dan penawaran resminya. Terima kasih!`;

        btnBookCalc.onclick = function (e) {
          e.preventDefault();
          window.open(buildWaUrl(waMsg), "_blank");
        };
      }
    }

    if (packageSelect) packageSelect.addEventListener("change", calculate);
    if (paxInput) {
      paxInput.addEventListener("input", calculate);
      paxInput.addEventListener("change", calculate);
    }
    addonCheckboxes.forEach(cb => cb.addEventListener("change", calculate));

    calculate();
  }

  /* --------------------------------------------------------------------------
     7. INSTANT BOOKING MODAL (WA ROUTER)
     -------------------------------------------------------------------------- */
  function initBookingModal() {
    let bookingModalElem = document.getElementById("bookingModal");
    if (!bookingModalElem) {
      const modalHtml = `
        <div class="modal fade modal-glass" id="bookingModal" tabindex="-1" aria-labelledby="bookingModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <div>
                  <h5 class="modal-title font-heading text-white mb-0" id="bookingModalLabel">Form Reservasi & Konsultasi</h5>
                  <small class="text-white-50">Terkoneksi langsung ke WhatsApp Fast-Response Admin</small>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="bookingFormQuick">
                  <div class="mb-3">
                    <label class="form-label fw-bold small text-slate-700">Nama Lengkap / Instansi</label>
                    <input type="text" class="form-control form-control-lg fs-6" id="bmName" placeholder="Contoh: Bpk. Hendra / PT Telkom" required>
                  </div>
                  <div class="mb-3">
                    <label class="form-label fw-bold small text-slate-700">Pilihan Paket / Wahana</label>
                    <select class="form-select form-select-lg fs-6" id="bmPackage">
                      <option value="Corporate Gathering & Team Building">Corporate Gathering & Team Building (Rp 185.000/pax)</option>
                      <option value="Outbound Leadership & Edukasi Pelajar">Outbound Edukasi & LDKS Pelajar (Rp 135.000/pax)</option>
                      <option value="Family Outing & Fun Games Adventure">Family Outing & Fun Games (Rp 120.000/pax)</option>
                      <option value="Pinus Forest Camping Ground">Pinus Forest Camping Ground (Rp 95.000/pax)</option>
                      <option value="Glamping Luxury Riverside">Glamping Luxury Riverside (Rp 350.000/pax)</option>
                      <option value="Paket Paintball Battle Wargame">Paket Paintball War Game (Rp 110.000/pax)</option>
                      <option value="Wahana Flying Fox & Taman Labirin">Wahana Flying Fox & Labirin (Rp 55.000/pax)</option>
                      <option value="Custom Outbound & Rafting Kasembon">Custom Package / Rafting Kasembon</option>
                    </select>
                  </div>
                  <div class="row g-2 mb-3">
                    <div class="col-6">
                      <label class="form-label fw-bold small text-slate-700">Estimasi Peserta</label>
                      <input type="number" class="form-control" id="bmPax" min="5" value="30" placeholder="Pax">
                    </div>
                    <div class="col-6">
                      <label class="form-label fw-bold small text-slate-700">Rencana Tanggal</label>
                      <input type="date" class="form-control" id="bmDate">
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label fw-bold small text-slate-700">Catatan / Kebutuhan Khusus</label>
                    <textarea class="form-control" id="bmNotes" rows="2" placeholder="Contoh: Butuh banner, sound system aula, dokumentasi drone..."></textarea>
                  </div>
                  <button type="submit" class="btn btn-aqua w-100 py-3 mt-2">
                    <i class="fa-brands fa-whatsapp me-2 fs-5"></i> Kirim Permintaan via WhatsApp
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>`;
      document.body.insertAdjacentHTML("beforeend", modalHtml);
      bookingModalElem = document.getElementById("bookingModal");
    }

    const bookingForm = document.getElementById("bookingFormQuick");
    if (bookingForm) {
      bookingForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("bmName").value.trim();
        const selectedPkg = document.getElementById("bmPackage").value;
        const pax = document.getElementById("bmPax").value;
        const date = document.getElementById("bmDate").value || "Fleksibel / Diskusi";
        const notes = document.getElementById("bmNotes").value.trim() || "-";

        const waText = `Halo Admin ${CR_CONFIG.BRAND_NAME},\n` +
          `Saya ingin mengajukan reservasi / penawaran proposal outbound:\n\n` +
          `👤 *Nama/Instansi*: ${name}\n` +
          `📦 *Paket Dipilih*: ${selectedPkg}\n` +
          `👥 *Jumlah Peserta*: ${pax} Orang\n` +
          `📅 *Rencana Tanggal*: ${date}\n` +
          `📝 *Catatan Khusus*: ${notes}\n\n` +
          `Mohon informasi ketersediaan jadwal dan invoice penawarannya. Terima kasih!`;

        window.open(buildWaUrl(waText), "_blank");
      });
    }

    // Trigger buttons that open booking modal with preset package
    document.querySelectorAll("[data-book-package]").forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const pkgName = this.getAttribute("data-book-package");
        const selectElem = document.getElementById("bmPackage");
        if (selectElem && pkgName) {
          for (let i = 0; i < selectElem.options.length; i++) {
            if (selectElem.options[i].value.toLowerCase().includes(pkgName.toLowerCase())) {
              selectElem.selectedIndex = i;
              break;
            }
          }
        }
        const modalInstance = bootstrap.Modal.getOrCreateInstance(bookingModalElem);
        modalInstance.show();
      });
    });
  }

  /* --------------------------------------------------------------------------
     8. QUICK WA BUTTONS & FLOATING WA
     -------------------------------------------------------------------------- */
  function initQuickWaTriggers() {
    // Floating WA button target
    const floatingWa = document.querySelector("[data-wa-float]");
    if (floatingWa) {
      const pageTitle = document.title.split("|")[0].trim();
      const defaultMsg = `Halo Admin ${CR_CONFIG.BRAND_NAME}, saya sedang mengunjungi website (${pageTitle}) dan ingin konsultasi seputar kegiatan outbound & camping di Coban Rondo.`;
      floatingWa.href = buildWaUrl(defaultMsg);
      floatingWa.setAttribute("target", "_blank");
      floatingWa.setAttribute("rel", "noopener noreferrer");
    }

    // Quick WA links with custom attributes
    document.querySelectorAll("[data-wa-quick]").forEach(el => {
      const msg = el.getAttribute("data-wa-quick") || `Halo Admin ${CR_CONFIG.BRAND_NAME}, saya ingin informasi paket outbound Coban Rondo.`;
      el.href = buildWaUrl(msg);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });
  }

  /* --------------------------------------------------------------------------
     9. ARTICLE LIVE SEARCH & QUICK READER
     -------------------------------------------------------------------------- */
  function initArticleFeatures() {
    const searchInput = document.getElementById("articleSearchInput");
    const articleCards = document.querySelectorAll(".article-card-item");

    if (searchInput && articleCards.length) {
      searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();
        articleCards.forEach(card => {
          const title = (card.querySelector(".article-title")?.textContent || "").toLowerCase();
          const desc = (card.querySelector(".article-excerpt")?.textContent || "").toLowerCase();
          const category = (card.getAttribute("data-category") || "").toLowerCase();

          if (title.includes(query) || desc.includes(query) || category.includes(query)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    }

    // Article Category Filter
    const articleCategoryBtns = document.querySelectorAll("[data-article-filter]");
    if (articleCategoryBtns.length && articleCards.length) {
      articleCategoryBtns.forEach(btn => {
        btn.addEventListener("click", function () {
          articleCategoryBtns.forEach(b => b.classList.remove("active"));
          this.classList.add("active");

          const filter = this.getAttribute("data-article-filter");
          articleCards.forEach(card => {
            const cat = card.getAttribute("data-category");
            if (filter === "all" || cat === filter) {
              card.style.display = "block";
            } else {
              card.style.display = "none";
            }
          });
        });
      });
    }
  }

  /* --------------------------------------------------------------------------
     10. BACK TO TOP BUTTON
     -------------------------------------------------------------------------- */
  function initBackToTop() {
    const btn = document.querySelector(".back-to-top");
    if (!btn) return;

    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }
    });

    btn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* --------------------------------------------------------------------------
     11. TESTIMONIAL RESPONSIVE SLIDER (DESKTOP & MOBILE SWIPE)
     -------------------------------------------------------------------------- */
  function initTestimonialSlider() {
    const track = document.getElementById("testiTrack");
    const viewport = document.getElementById("testiViewport");
    if (!track || !viewport) return;

    const btnPrev = document.getElementById("btnTestiPrev");
    const btnNext = document.getElementById("btnTestiNext");
    const dotsWrap = document.getElementById("testiDots");
    const slides = track.querySelectorAll(".testi-card-slide");
    const totalSlides = slides.length;
    if (totalSlides === 0) return;

    let currentIndex = 0;
    let visibleCount = getVisibleCount();
    let maxIndex = Math.max(0, totalSlides - visibleCount);

    function getVisibleCount() {
      const width = window.innerWidth;
      if (width >= 992) return 3;
      if (width >= 768) return 2;
      return 1;
    }

    // Render pagination dots based on max reachable slides
    function renderDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      const dotCount = maxIndex + 1;
      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement("button");
        dot.className = `testi-dot ${i === currentIndex ? "active" : ""}`;
        dot.setAttribute("aria-label", `Ke testimoni slide ${i + 1}`);
        dot.dataset.index = i;
        dot.addEventListener("click", () => goToSlide(i));
        dotsWrap.appendChild(dot);
      }
    }

    // Update active dot and button states
    function updateControls() {
      if (dotsWrap) {
        const dots = dotsWrap.querySelectorAll(".testi-dot");
        dots.forEach((dot, idx) => {
          dot.classList.toggle("active", idx === currentIndex);
        });
      }

      if (btnPrev) {
        btnPrev.disabled = (currentIndex === 0);
      }
      if (btnNext) {
        btnNext.disabled = (currentIndex === maxIndex);
      }
    }

    // Translate track to target index
    function goToSlide(index) {
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      const percentage = (currentIndex * (100 / visibleCount));
      track.style.transform = `translateX(-${percentage}%)`;
      updateControls();
    }

    function nextSlide() {
      if (currentIndex < maxIndex) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(0); // loop around smoothly
      }
    }

    function prevSlide() {
      if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
      } else {
        goToSlide(maxIndex);
      }
    }

    if (btnNext) btnNext.addEventListener("click", nextSlide);
    if (btnPrev) btnPrev.addEventListener("click", prevSlide);

    // Responsive window resize
    let resizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newVisible = getVisibleCount();
        if (newVisible !== visibleCount) {
          visibleCount = newVisible;
          maxIndex = Math.max(0, totalSlides - visibleCount);
          currentIndex = Math.min(currentIndex, maxIndex);
          renderDots();
          goToSlide(currentIndex);
        }
      }, 100);
    });

    // Touch swipe support on mobile/tablet
    let touchStartX = 0;
    let touchStartY = 0;
    let touchDiffX = 0;
    let isTouching = false;

    viewport.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchDiffX = 0;
      isTouching = true;
      track.classList.add("is-dragging");
    }, { passive: true });

    viewport.addEventListener("touchmove", function (e) {
      if (!isTouching || e.touches.length !== 1) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      touchDiffX = currentX - touchStartX;
      const diffY = currentY - touchStartY;

      // Only handle horizontal swipes
      if (Math.abs(touchDiffX) > Math.abs(diffY)) {
        const currentPercentage = (currentIndex * (100 / visibleCount));
        const dragOffsetPercent = (touchDiffX / viewport.offsetWidth) * (100 / visibleCount);
        track.style.transform = `translateX(-${currentPercentage - dragOffsetPercent}%)`;
      }
    }, { passive: true });

    viewport.addEventListener("touchend", function () {
      if (!isTouching) return;
      isTouching = false;
      track.classList.remove("is-dragging");

      const threshold = 40; // min px to trigger slide
      if (touchDiffX < -threshold) {
        nextSlide();
      } else if (touchDiffX > threshold) {
        prevSlide();
      } else {
        goToSlide(currentIndex); // snap back
      }
    });

    // Mouse drag support for desktop
    let isMouseDown = false;
    let mouseStartX = 0;
    let mouseDiffX = 0;

    viewport.addEventListener("mousedown", function (e) {
      isMouseDown = true;
      mouseStartX = e.clientX;
      mouseDiffX = 0;
      track.classList.add("is-dragging");
      e.preventDefault();
    });

    window.addEventListener("mousemove", function (e) {
      if (!isMouseDown) return;
      mouseDiffX = e.clientX - mouseStartX;
      const currentPercentage = (currentIndex * (100 / visibleCount));
      const dragOffsetPercent = (mouseDiffX / viewport.offsetWidth) * (100 / visibleCount);
      track.style.transform = `translateX(-${currentPercentage - dragOffsetPercent}%)`;
    });

    window.addEventListener("mouseup", function () {
      if (!isMouseDown) return;
      isMouseDown = false;
      track.classList.remove("is-dragging");

      const threshold = 50;
      if (mouseDiffX < -threshold) {
        nextSlide();
      } else if (mouseDiffX > threshold) {
        prevSlide();
      } else {
        goToSlide(currentIndex);
      }
      mouseDiffX = 0;
    });

    // Initial setup
    renderDots();
    goToSlide(0);
  }

  /* --------------------------------------------------------------------------
     12. HERO BACKGROUND VIDEO CONTROLS
     -------------------------------------------------------------------------- */
  function initHeroVideo() {
    const video = document.getElementById("heroBgVideo");
    const toggleBtn = document.getElementById("btnHeroVideoToggle");
    if (!video || !toggleBtn) return;

    toggleBtn.addEventListener("click", function () {
      const icon = toggleBtn.querySelector("i");
      if (video.paused) {
        video.play();
        if (icon) icon.className = "fa-solid fa-pause";
        toggleBtn.setAttribute("aria-label", "Jeda video latar");
      } else {
        video.pause();
        if (icon) icon.className = "fa-solid fa-play";
        toggleBtn.setAttribute("aria-label", "Putar video latar");
      }
    });
  }

})();
