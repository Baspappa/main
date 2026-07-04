document.addEventListener("DOMContentLoaded", function () {
  const year = document.getElementById("y");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el) => io.observe(el));

  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentElement.classList.toggle("active");
    });
  });

  const slider = document.getElementById("reviewsSlider");
  const prevBtn = document.getElementById("revPrev");
  const nextBtn = document.getElementById("revNext");
  const dotsWrap = document.getElementById("reviewsDots");

  if (slider && prevBtn && nextBtn && dotsWrap) {
    function getCardWidth() {
      const first = slider.querySelector(".review");
      if (!first) return 300;
      const gap = parseFloat(getComputedStyle(slider).gap) || 16;
      return first.getBoundingClientRect().width + gap;
    }

    function scrollByCard(dir) {
      slider.scrollBy({ left: dir * getCardWidth(), behavior: "smooth" });
    }

    prevBtn.addEventListener("click", () => scrollByCard(-1));
    nextBtn.addEventListener("click", () => scrollByCard(1));

    dotsWrap.innerHTML = "";
    const cards = [...slider.querySelectorAll(".review")];
    const dots = cards.map((_, i) => {
      const button = document.createElement("button");
      button.type = "button";
      button.addEventListener("click", () => {
        slider.scrollTo({ left: i * getCardWidth(), behavior: "smooth" });
      });
      dotsWrap.appendChild(button);
      return button;
    });

    function setActiveDot() {
      const width = getCardWidth();
      const index = Math.round(slider.scrollLeft / width);
      dots.forEach((dot, idx) => dot.classList.toggle("active", idx === index));
    }

    slider.addEventListener("scroll", () => requestAnimationFrame(setActiveDot));
    setActiveDot();
    slider.setAttribute("tabindex", "0");
    slider.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") scrollByCard(-1);
      if (e.key === "ArrowRight") scrollByCard(1);
    });

    let autoSlide = null;
    let resumeTimeout = null;

    function stopAutoSlide() {
      if (autoSlide) clearInterval(autoSlide);
      autoSlide = null;
    }

    function startAutoSlide() {
      stopAutoSlide();
      autoSlide = setInterval(() => {
        scrollByCard(1);
      }, 4000);
    }

    function pauseThenResume() {
      stopAutoSlide();
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        startAutoSlide();
      }, 6000);
    }

    slider.addEventListener("mouseenter", stopAutoSlide);
    slider.addEventListener("mouseleave", startAutoSlide);
    slider.addEventListener("pointerdown", pauseThenResume, { passive: true });
    slider.addEventListener("touchstart", pauseThenResume, { passive: true });
    slider.addEventListener("wheel", pauseThenResume, { passive: true });

    prevBtn.addEventListener("click", pauseThenResume);
    nextBtn.addEventListener("click", pauseThenResume);
    dots.forEach((dot) => dot.addEventListener("click", pauseThenResume));

    startAutoSlide();
  }

  const hamburger = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
      });
    });
  }

  const pkgSlider = document.getElementById("packagesSlider");
  const pkgPrev = document.getElementById("pkgPrev");
  const pkgNext = document.getElementById("pkgNext");
  const pkgDotsWrap = document.getElementById("packagesDots");

  if (pkgSlider && pkgPrev && pkgNext && pkgDotsWrap) {
    const getPkgCardWidth = () => {
      const first = pkgSlider.querySelector(".package");
      if (!first) return 300;
      const gap = parseFloat(getComputedStyle(pkgSlider).gap) || 16;
      return first.getBoundingClientRect().width + gap;
    };

    const pkgScrollBy = (dir) => {
      pkgSlider.scrollBy({ left: dir * getPkgCardWidth(), behavior: "smooth" });
    };

    pkgPrev.addEventListener("click", () => pkgScrollBy(-1));
    pkgNext.addEventListener("click", () => pkgScrollBy(1));

    pkgDotsWrap.innerHTML = "";
    const pkgCards = [...pkgSlider.querySelectorAll(".package")];
    const pkgDots = pkgCards.map((_, i) => {
      const button = document.createElement("button");
      button.type = "button";
      button.addEventListener("click", () => {
        pkgSlider.scrollTo({ left: i * getPkgCardWidth(), behavior: "smooth" });
      });
      pkgDotsWrap.appendChild(button);
      return button;
    });

    const setPkgActiveDot = () => {
      const width = getPkgCardWidth();
      const index = Math.round(pkgSlider.scrollLeft / width);
      pkgDots.forEach((dot, idx) => dot.classList.toggle("active", idx === index));
    };

    pkgSlider.addEventListener("scroll", () => requestAnimationFrame(setPkgActiveDot));
    setPkgActiveDot();
  }

  const lessonBox = document.getElementById("lessonBox");
  if (lessonBox) {
    const tabs = lessonBox.querySelectorAll(".tab");
    const panels = lessonBox.querySelectorAll(".tab-panel");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetId = tab.getAttribute("data-target");
        const targetPanel = lessonBox.querySelector("#" + targetId);

        tabs.forEach((item) => item.classList.remove("active"));
        panels.forEach((panel) => panel.classList.remove("active"));

        tab.classList.add("active");
        if (targetPanel) targetPanel.classList.add("active");
      });
    });
  }
});
