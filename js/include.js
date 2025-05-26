document.addEventListener("DOMContentLoaded", () => {
  // Détecter la profondeur pour ajuster le préfixe des chemins relatifs
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const prefix = pathParts.length <= 1 ? "" : "../";

  // --- Charger la navbar ---
  fetch(prefix + "nav/navbar.html")
    .then(response => {
      if (!response.ok) throw new Error(`Erreur chargement navbar: ${response.status}`);
      return response.text();
    })
    .then(data => {
      const navbarContainer = document.getElementById("navbar-container");
      if (navbarContainer) {
        navbarContainer.innerHTML = data;

        // Menu responsive
        const menuToggle = document.getElementById("menu-toggle");
        const navLinks = document.getElementById("nav-links");

        if (menuToggle && navLinks) {
          menuToggle.addEventListener("click", () => {
            const isActive = navLinks.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", isActive);
          });

          // Fermer menu après clic sur un lien
          navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
              if (navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
              }
            });
          });
        }
      }
    })
    .catch(err => console.error(err));

  // --- Charger le footer ---
  fetch(prefix + "footer/footer.html")
    .then(response => {
      if (!response.ok) throw new Error(`Erreur chargement footer: ${response.status}`);
      return response.text();
    })
    .then(data => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = data;

      // Corriger les chemins relatifs dans le footer
      tempDiv.querySelectorAll("[src]").forEach(el => {
        const src = el.getAttribute("src");
        if (src && src.startsWith("../")) {
          el.setAttribute("src", prefix + src.slice(3));
        }
      });

      tempDiv.querySelectorAll("a").forEach(el => {
        const href = el.getAttribute("href");
        if (href && href.startsWith("../")) {
          el.setAttribute("href", prefix + href.slice(3));
        }
      });

      const footerContainer = document.getElementById("footer-container");
      if (footerContainer) {
        footerContainer.innerHTML = tempDiv.innerHTML;
      }

      // Charger Font Awesome si nécessaire
      const faScript = document.createElement("script");
      faScript.src = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/js/all.min.js";
      faScript.crossOrigin = "anonymous";
      document.body.appendChild(faScript);
    })
    .catch(err => console.error(err));
});
