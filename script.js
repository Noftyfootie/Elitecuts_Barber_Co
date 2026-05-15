const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeText = document.querySelector(".theme-toggle__text");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const progressBar = document.getElementById("progress");

body.classList.add("has-motion");

const setTheme = (theme) => {
  const isLight = theme === "light";
  body.classList.toggle("light-theme", isLight);

  if (themeIcon) {
    themeIcon.classList.toggle("fa-toggle-on", !isLight);
    themeIcon.classList.toggle("fa-toggle-off", isLight);
  }
  if (themeText) themeText.textContent = isLight ? "Dark" : "Light";

  window.localStorage.setItem("theme", theme);
};

const savedTheme = window.localStorage.getItem("theme");
if (savedTheme === "light" || savedTheme === "dark") {
  setTheme(savedTheme);
} else {
  setTheme("dark");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = body.classList.contains("light-theme") ? "dark" : "light";
    setTheme(nextTheme);
  });
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

window.addEventListener("scroll", () => {
  if (!progressBar) return;

  const scroll = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  progressBar.style.width = `${height > 0 ? (scroll / height) * 100 : 0}%`;
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("active"));
}

const counters = document.querySelectorAll(".counter");
if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.getAttribute("data-target"));
        let current = 0;
        const step = Math.ceil(target / 120);

        const updateCount = () => {
          current += step;
          if (current < target) {
            counter.textContent = current;
            window.requestAnimationFrame(updateCount);
          } else {
            counter.textContent = target;
          }
        };

        updateCount();
        counterObserver.unobserve(counter);
      });
    },
    { threshold: 0.4 },
  );

  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  counters.forEach((counter) => {
    counter.textContent = counter.getAttribute("data-target");
  });
}

const appointmentButton = document.getElementById("btn-primary");
if (appointmentButton) {
  appointmentButton.addEventListener("click", () => {
    window.alert(
      "Appointment request received.\n\nOur team will contact you shortly via WhatsApp.",
    );
  });
}

const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    event.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    navLinks?.classList.remove("open");
  });
});

const slider = () => {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
  const slideContainer = document.querySelector(".slides");

  if (
    !slides.length ||
    !btnLeft ||
    !btnRight ||
    !dotContainer ||
    !slideContainer
  ) {
    return;
  }

  let currentSlide = 0;
  const maxSlide = slides.length;

  const createDots = () => {
    dotContainer.innerHTML = "";
    slides.forEach((_, index) => {
      const button = document.createElement("button");
      button.className = "dots__dot";
      button.dataset.slide = index;
      button.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dotContainer.appendChild(button);
    });
  };

  const activateDot = (index) => {
    dotContainer
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    const activeDot = dotContainer.querySelector(
      `.dots__dot[data-slide="${index}"]`,
    );

    activeDot?.classList.add("dots__dot--active");
  };

  const goToSlide = (index) => {
    slideContainer.style.transform = `translateX(-${index * 100}%)`;
    activateDot(index);
  };

  const nextSlide = () => {
    currentSlide = currentSlide === maxSlide - 1 ? 0 : currentSlide + 1;
    goToSlide(currentSlide);
  };

  const prevSlide = () => {
    currentSlide = currentSlide === 0 ? maxSlide - 1 : currentSlide - 1;
    goToSlide(currentSlide);
  };

  createDots();
  goToSlide(0);

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") prevSlide();
    if (event.key === "ArrowRight") nextSlide();
  });

  dotContainer.addEventListener("click", (event) => {
    const dot = event.target.closest(".dots__dot");
    if (!dot) return;

    currentSlide = Number(dot.dataset.slide);
    goToSlide(currentSlide);
  });
};

slider();

console.log("what");
console.log("");
