document.getElementById("year").textContent = new Date().getFullYear();

const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  })
);

const progress = document.querySelector(".progress");
const onScroll = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${(scrollY / max) * 100}%`;
  nav.classList.toggle("scrolled", scrollY > 40);
};
addEventListener("scroll", onScroll, { passive: true });
onScroll();

document.querySelectorAll(".glass").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

const revealTargets = document.querySelectorAll(
  ".section-head, .about-grid, .case, .job, .edu, .tile, .list-card, .vol, .passions, .contact > *"
);
revealTargets.forEach((el) => el.classList.add("reveal"));
const revealer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealer.unobserve(entry.target);
    }),
  { threshold: 0.12 }
);
revealTargets.forEach((el) => revealer.observe(el));

const counters = document.querySelectorAll("[data-count]");
const countUp = (el) => {
  const target = +el.dataset.count;
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / 1400, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const counterObserver = new IntersectionObserver((entries) =>
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    countUp(entry.target);
    counterObserver.unobserve(entry.target);
  })
);
counters.forEach((el) => counterObserver.observe(el));
