document.addEventListener("DOMContentLoaded", () => {
  // === Slider automatique ===
  const images = document.querySelectorAll(".slider-img");
  let current = 0;

  function showSlide(index) {
    images.forEach((img, i) => {
      img.classList.remove("active");
      if (i === index) {
        img.classList.add("active");
      }
    });
  }

  function nextSlide() {
    current = (current + 1) % images.length;
    showSlide(current);
  }

  setInterval(nextSlide, 10000); // Changement toutes les 10 secondes

  // === Animation au scroll (fade-in) ===
  const fadeIns = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animation une seule fois
      }
    });
  }, {
    threshold: 0.1
  });

  fadeIns.forEach(el => observer.observe(el));
});
