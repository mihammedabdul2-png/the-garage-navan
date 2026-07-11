const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");
const bookingForm = document.getElementById("bookingForm");
const faqItems = document.querySelectorAll(".faq-item");
const revealElements = document.querySelectorAll(".reveal");
const currentYear = document.getElementById("currentYear");

/* Header effect when scrolling */

function updateHeader() {
  if (!siteHeader) return;

  siteHeader.classList.toggle("scrolled", window.scrollY > 30);
}

updateHeader();
window.addEventListener("scroll", updateHeader);

/* Mobile navigation */

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);

    menuButton.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      mobileNav.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  });
}

/* Reveal animations */

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(element => {
    element.classList.add("visible");
  });
}

/* FAQ accordion */

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");

  if (!question) return;

  question.addEventListener("click", () => {
    const wasOpen = item.classList.contains("open");

    faqItems.forEach(otherItem => {
      otherItem.classList.remove("open");
    });

    if (!wasOpen) {
      item.classList.add("open");
    }
  });
});

/* Booking form */

if (bookingForm) {
  bookingForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = bookingForm.elements.name.value.trim();
    const phone = bookingForm.elements.phone.value.trim();
    const vehicle = bookingForm.elements.vehicle.value.trim();

    if (!name || !phone) {
      alert("Please enter your name and phone number.");
      return;
    }

    const message =
      `Hello, I would like to request a service appointment.%0A%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Phone: ${encodeURIComponent(phone)}%0A` +
      `Vehicle: ${encodeURIComponent(vehicle || "Not provided")}`;

    const whatsappNumber = "353469028548";

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    bookingForm.reset();
  });
}

/* Current year */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}