
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const backToTop = document.getElementById("back-to-top");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close mobile navigation when a link is clicked
navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Highlight the active navigation section
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => {
          const active =
            link.getAttribute("href") === `#${entry.target.id}`;

          link.classList.toggle("active", active);
        });
      }
    });
  },
  {
    rootMargin: "-20% 0px -65% 0px"
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// Animate content as it enters the viewport
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  // Show all content in older browsers
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// Back-to-top button
function updateBackToTop() {
  backToTop.classList.toggle("visible", window.scrollY > 350);
}

window.addEventListener("scroll", updateBackToTop, {
  passive: true
});

updateBackToTop();

// Current copyright year
document.getElementById("year").textContent =
  new Date().getFullYear();

