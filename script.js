document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const menuButton = document.querySelector(
    ".menu-toggle, .mobile-menu-button, .hamburger"
  );
  const navigation = document.querySelector(
    "nav, .nav-links, .navigation"
  );
  const navigationLinks = document.querySelectorAll(
    'nav a[href^="#"], .nav-links a[href^="#"]'
  );
  const revealElements = document.querySelectorAll(
  ".service-card, .feature-card, .testimonial-card, .faq-item"
  );

  /*
  ========================================
  HEADER SCROLL EFFECT
  ========================================
  */

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader);

  /*
  ========================================
  MOBILE NAVIGATION
  ========================================
  */

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const menuIsOpen = navigation.classList.toggle("active");

      menuButton.classList.toggle("active", menuIsOpen);
      document.body.classList.toggle("menu-open", menuIsOpen);

      menuButton.setAttribute(
        "aria-expanded",
        menuIsOpen ? "true" : "false"
      );
    });
  }

  /*
  ========================================
  SMOOTH SCROLLING
  ========================================
  */

  navigationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetID = link.getAttribute("href");

      if (!targetID || targetID === "#") return;

      const targetSection = document.querySelector(targetID);

      if (!targetSection) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition =
        targetSection.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      if (navigation) {
        navigation.classList.remove("active");
      }

      if (menuButton) {
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
      }

      document.body.classList.remove("menu-open");
    });
  });

  /*
  ========================================
  SCROLL REVEAL ANIMATIONS
  ========================================
  if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px",
    }
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal", "reveal-ready");
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

  /*
  ========================================
  ACTIVE NAVIGATION LINK
  ========================================
  */

  const sections = document.querySelectorAll("section[id]");

  function updateActiveNavigation() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 160;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navigationLinks.forEach((link) => {
      link.classList.remove("active-link");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active-link");
      }
    });
  }

  updateActiveNavigation();
  window.addEventListener("scroll", updateActiveNavigation);

  /*
  ========================================
  BUTTON RIPPLE EFFECT
  ========================================
  */

  const buttons = document.querySelectorAll(
    ".btn, button, .primary-button, .secondary-button"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const existingRipple = button.querySelector(".button-ripple");

      if (existingRipple) {
        existingRipple.remove();
      }

      const ripple = document.createElement("span");
      const buttonBox = button.getBoundingClientRect();
      const rippleSize = Math.max(buttonBox.width, buttonBox.height);

      ripple.className = "button-ripple";
      ripple.style.width = `${rippleSize}px`;
      ripple.style.height = `${rippleSize}px`;
      ripple.style.left = `${
        event.clientX - buttonBox.left - rippleSize / 2
      }px`;
      ripple.style.top = `${
        event.clientY - buttonBox.top - rippleSize / 2
      }px`;

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 650);
    });
  });

  /*
  ========================================
  AUTOMATIC COPYRIGHT YEAR
  ========================================
  */

  const yearElement = document.querySelector(
    "#current-year, .current-year"
  );

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /*
  ========================================
  CONTACT FORM
  ========================================
  */

  const contactForm = document.querySelector(
    "#contact-form, .contact-form"
  );

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const submitButton = contactForm.querySelector(
        'button[type="submit"]'
      );

      if (!submitButton) return;

      const originalButtonText = submitButton.textContent;

      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      setTimeout(() => {
        submitButton.textContent = "Message sent successfully";

        contactForm.reset();

        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }, 2500);
      }, 1000);
    });
  }
});