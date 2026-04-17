// ENSA Clothing Ltd. — Shared JS

// Scroll reveal
const ro = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        ro.unobserve(e.target);
      }
    });
  },
  { threshold: 0 },
);
document.querySelectorAll(".reveal").forEach((el) => {
  const r = el.getBoundingClientRect();
  // If already in viewport on load, make visible immediately
  if (r.top < window.innerHeight && r.bottom > 0) {
    el.classList.add("visible");
  } else {
    ro.observe(el);
  }
});

// Navbar scroll
const nav = document.getElementById("mainNav");
if (nav) {
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", scrollY > 60);
  });
}

// Counter animation
const cSection =
  document.getElementById("counters") ||
  document.querySelector("[data-counters]");
if (cSection) {
  let counted = false;
  new IntersectionObserver(
    (e) => {
      if (e[0].isIntersecting && !counted) {
        counted = true;
        document.querySelectorAll(".cnt-num[data-target]").forEach((el) => {
          const t = +el.dataset.target,
            step = t / 55;
          let c = 0;
          const iv = setInterval(() => {
            c += step;
            if (c >= t) {
              el.textContent = t + (t >= 10 ? "+" : "");
              clearInterval(iv);
            } else el.textContent = Math.floor(c);
          }, 22);
        });
      }
    },
    { threshold: 0.5 },
  ).observe(cSection);
}

// Mobile nav close
function closeMob() {
  const el = document.getElementById("mobNav");
  if (el) {
    const c = bootstrap.Collapse.getInstance(el);
    if (c) c.hide();
  }
}

// Toast
function showToast(msg) {
  let t = document.getElementById("toastEl");
  if (!t) {
    t = document.createElement("div");
    t.id = "toastEl";
    t.className = "toast-pop";
    document.body.appendChild(t);
  }
  t.textContent = msg || "✔ Sent!";
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 4200);
}
