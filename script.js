const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const buttons = document.querySelectorAll(".magnetic");
let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  cursorRing.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

buttons.forEach((button) => {
  button.addEventListener("mousemove", (event) => {
    const rect = button.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${offsetX * 0.12}px, ${offsetY * 0.08}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0, 0)";
  });
});

const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    faqItems.forEach((other) => {
      if (other !== item) other.classList.remove("active");
    });
    item.classList.toggle("active");
  });
});

const progressItems = document.querySelectorAll(".stat-card span");
const animateStats = () => {
  progressItems.forEach((item, index) => {
    const target =
      parseFloat(item.textContent.replace("%", "")) ||
      parseInt(item.textContent, 10);
    let current = 0;
    const duration = 1400;
    const step = Math.max(target / (duration / 16), 0.5);
    const update = () => {
      current += step;
      if (current < target) {
        item.textContent = `${target % 1 === 0 ? Math.round(current) : current.toFixed(1)}${item.textContent.includes("%") ? "%" : ""}`;
        requestAnimationFrame(update);
      } else {
        item.textContent = `${target}${item.textContent.includes("%") ? "%" : ""}`;
      }
    };
    update();
  });
};

const statsSection = document.querySelector(".stats-section");
if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats();
          statsObserver.disconnect();
        }
      });
    },
    { threshold: 0.5 },
  );
  statsObserver.observe(statsSection);
}

const navLinks = document.querySelectorAll(".site-nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (href.startsWith("#")) {
      event.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  });
});
