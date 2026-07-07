// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// Contact form
const form = document.querySelector(".contact-form");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    alert("Thank you for your enquiry! We will contact you shortly.");

    form.reset();
  });
}

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");

  if(window.scrollY > 50){
    header.style.boxShadow = "0 10px 30px rgba(0,0,0,.15)";
  } else {
    header.style.boxShadow = "none";
  }
});