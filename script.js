(() => {
  "use strict";

  const root = document.documentElement;
  root.classList.add("js-ready");

  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  const mobileBreakpoint = 960;

  const setMenuState = (open) => {
    if (!menuToggle || !nav) return;

    menuToggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);

    const label = menuToggle.querySelector(".sr-only");
    if (label) label.textContent = open ? "メニューを閉じる" : "メニューを開く";
  };

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
      setMenuState(willOpen);
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenuState(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenuState(false);
        menuToggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        menuToggle.getAttribute("aria-expanded") === "true" &&
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        setMenuState(false);
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > mobileBreakpoint) setMenuState(false);
    });
  }

  const updateHeader = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const revealItems = [...document.querySelectorAll(".reveal")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9%", threshold: 0.08 },
    );

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min((index % 4) * 55, 165)}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const faqItems = [...document.querySelectorAll(".faq-item")];
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) otherItem.removeAttribute("open");
      });
    });
  });

  const categorySelect = document.querySelector("[data-category]");
  const messageField = document.querySelector('textarea[name="message"]');

  document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", () => {
      const service = link.dataset.service;
      if (!categorySelect || !service) return;

      const option = [...categorySelect.options].find((item) => item.value === service);
      categorySelect.value = option ? service : "その他";

      window.setTimeout(() => {
        (messageField || categorySelect).focus({ preventScroll: true });
      }, 650);
    });
  });

  const contactForm = document.querySelector("[data-contact-form]");
  const formStatus = document.querySelector("[data-form-status]");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const data = new FormData(contactForm);
      const name = String(data.get("name") || "").trim();
      const tel = String(data.get("tel") || "").trim();
      const email = String(data.get("email") || "").trim();
      const category = String(data.get("category") || "その他").trim() || "その他";
      const message = String(data.get("message") || "").trim();
      const subject = `【ウェブサイトからのご相談】${category}`;
      const body = [
        "便利屋 いますぐ365 ご担当者様",
        "",
        "ウェブサイトからお問い合わせします。",
        "",
        `■ お名前：${name}`,
        `■ 電話番号：${tel}`,
        `■ メールアドレス：${email}`,
        `■ ご相談の種類：${category}`,
        "",
        "■ お問い合わせ内容",
        message,
        "",
        "--------------------",
        "このメールは www.imasugu365.site のお問い合わせ画面で作成されました。",
      ].join("\n");

      const mailto = `mailto:info@imasugu365.site?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      if (formStatus) {
        formStatus.textContent =
          "メールアプリを開いています。開かない場合は info@imasugu365.site へ直接お送りください。";
      }

      window.location.href = mailto;
    });
  }

  document.querySelectorAll("[data-year]").forEach((item) => {
    item.textContent = String(new Date().getFullYear());
  });

  window.addEventListener("load", () => {
    window.setTimeout(() => {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.05) item.classList.add("is-visible");
      });
    }, 100);
  });
})();
