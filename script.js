(() => {
  "use strict";

  /*
    CHECKOUT CONFIGURATION
    Replace the placeholder below with your real payment/checkout URL.
    All sales CTA links on the page are wired to #checkout so you can
    later switch them to your checkout URL in one place if desired.
  */
  const WHATSAPP_MESSAGE = `Hello Doxaproz, my name is ______.

I am interested in the DOXAPROZ Early Childhood School Success System™.

My purpose: I want to purchase the complete system for my school.

Please send me the payment details and guide me on the next steps. Thank you.`;
  const CHECKOUT_URL = `https://wa.me/2348188005812?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const header = document.getElementById("site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("primary-navigation");
  const mobileCta = document.querySelector(".mobile-sticky-cta");
  const hero = document.querySelector(".hero");

  // Apply the WhatsApp payment/order destination to every primary sales CTA.
  document.querySelectorAll('a[href="#checkout"]').forEach((link) => {
    link.href = CHECKOUT_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  // Sticky header.
  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Mobile navigation.
  const closeMenu = () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  };

  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });

  // Scroll reveal.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -45px 0px" });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  // Number counters.
  const counters = document.querySelectorAll(".counter");
  const animateCounter = (el) => {
    const target = Number(el.dataset.target || 0);
    const suffix = el.dataset.suffix || "";
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach((counter) => {
      counter.textContent = Number(counter.dataset.target).toLocaleString() + (counter.dataset.suffix || "");
    });
  }

  // Accessible FAQ accordion.
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      faqItems.forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Mobile CTA appears after the hero.
  if (mobileCta && hero && "IntersectionObserver" in window) {
    const mobileCtaObserver = new IntersectionObserver(([entry]) => {
      const shouldShow = !entry.isIntersecting && window.innerWidth <= 700;
      mobileCta.classList.toggle("show", shouldShow);
      mobileCta.setAttribute("aria-hidden", String(!shouldShow));
    }, { threshold: 0.05 });

    mobileCtaObserver.observe(hero);
    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) {
        mobileCta.classList.remove("show");
        mobileCta.setAttribute("aria-hidden", "true");
      }
    });
  }

  // Keep the year current.
  document.getElementById("year").textContent = new Date().getFullYear();
})();

document.addEventListener("DOMContentLoaded", function () {

  const countdownElement = document.getElementById("mobile-countdown");

  if (!countdownElement) {
    console.log("Countdown element not found.");
    return;
  }

  // 48 hours in milliseconds
  const duration = 48 * 60 * 60 * 1000;

  // Use one fixed end time for this browser
  const storageKey = "doxaproz_offer_end_time";

  let endTime = localStorage.getItem(storageKey);

  // Start a new 48-hour countdown if one doesn't exist
  if (!endTime) {
    endTime = Date.now() + duration;
    localStorage.setItem(storageKey, endTime);
  }

  endTime = Number(endTime);

  function updateCountdown() {

    const now = Date.now();
    const difference = endTime - now;

    // Countdown finished
    if (difference <= 0) {
      countdownElement.textContent = "00:00:00";
      return;
    }

    const hours = Math.floor(
      difference / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (difference % (1000 * 60 * 60)) / (1000 * 60)
    );

    const seconds = Math.floor(
      (difference % (1000 * 60)) / 1000
    );

    const formattedTime =
      String(hours).padStart(2, "0") + ":" +
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0");

    countdownElement.textContent = formattedTime;
  }

  // Run immediately
  updateCountdown();

  // Update every second
  setInterval(updateCountdown, 1000);

});