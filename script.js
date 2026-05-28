const slides = Array.from(document.querySelectorAll(".slide"));
const nav = document.getElementById("slideNav");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const notesBtn = document.getElementById("notesBtn");
const closeNotesBtn = document.getElementById("closeNotesBtn");
const notesPanel = document.getElementById("notesPanel");
const notesText = document.getElementById("notesText");
const progressFill = document.getElementById("progressFill");
const progressCount = document.getElementById("progressCount");
const progressDots = document.getElementById("progressDots");
const mobileSlideLabel = document.getElementById("mobileSlideLabel");

const totalSlides = slides.length;
const storageKey = "nanu-tech-disi-current-slide";
let currentSlide = getInitialSlide();

function getInitialSlide() {
  const hashMatch = window.location.hash.match(/^#slide-(\d+)$/);
  if (hashMatch) {
    return clampIndex(Number(hashMatch[1]) - 1);
  }

  const storedSlide = Number(readStoredSlide());
  if (Number.isInteger(storedSlide)) {
    return clampIndex(storedSlide);
  }

  return 0;
}

function readStoredSlide() {
  try {
    return window.localStorage.getItem(storageKey);
  } catch (error) {
    return null;
  }
}

function writeStoredSlide(index) {
  try {
    window.localStorage.setItem(storageKey, String(index));
  } catch (error) {
    // La presentacion sigue funcionando aunque el navegador bloquee localStorage.
  }
}

function clampIndex(index) {
  return Math.min(Math.max(index, 0), totalSlides - 1);
}

function buildNavigation() {
  slides.forEach((slide, index) => {
    const navButton = document.createElement("button");
    navButton.type = "button";
    navButton.className = "nav-item";
    navButton.dataset.index = String(index);
    navButton.setAttribute("aria-label", `Ir a diapositiva ${index + 1}: ${slide.dataset.title}`);
    navButton.innerHTML = `
      <span class="nav-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="nav-label">${slide.dataset.nav}</span>
    `;
    navButton.addEventListener("click", () => goToSlide(index));
    nav.appendChild(navButton);

    const dot = document.createElement("span");
    dot.className = "progress-dot";
    progressDots.appendChild(dot);
  });
}

function updateSlideClasses() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlide);
    slide.classList.toggle("previous", index < currentSlide);
    slide.classList.toggle("hidden", index > currentSlide);
    slide.setAttribute("aria-hidden", index === currentSlide ? "false" : "true");
  });
}

function updateNavigationState() {
  const navItems = Array.from(nav.querySelectorAll(".nav-item"));
  const dots = Array.from(progressDots.querySelectorAll(".progress-dot"));

  navItems.forEach((item, index) => {
    const isActive = index === currentSlide;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-current", isActive ? "step" : "false");
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === currentSlide);
  });
}

function updateProgress() {
  const progress = ((currentSlide + 1) / totalSlides) * 100;
  progressFill.style.width = `${progress}%`;
  progressCount.textContent = `${currentSlide + 1} / ${totalSlides}`;
  mobileSlideLabel.textContent = slides[currentSlide].dataset.nav;
}

function updateControls() {
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === totalSlides - 1;
}

function updateNotes() {
  const template = slides[currentSlide].querySelector(".speaker-note");
  notesText.textContent = template ? template.innerHTML.trim() : "";
}

function persistSlide() {
  writeStoredSlide(currentSlide);

  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, "", `#slide-${currentSlide + 1}`);
  }
}

function render() {
  updateSlideClasses();
  updateNavigationState();
  updateProgress();
  updateControls();
  updateNotes();
  persistSlide();
}

function goToSlide(index) {
  const nextIndex = clampIndex(index);
  if (nextIndex === currentSlide) {
    return;
  }

  currentSlide = nextIndex;
  render();
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function previousSlide() {
  goToSlide(currentSlide - 1);
}

function toggleNotes(forceState) {
  const shouldOpen = typeof forceState === "boolean" ? forceState : notesPanel.hidden;
  notesPanel.hidden = !shouldOpen;
  notesBtn.setAttribute("aria-expanded", String(shouldOpen));

  if (shouldOpen) {
    updateNotes();
  }
}

function handleKeydown(event) {
  const activeElement = document.activeElement;
  const isTyping = activeElement && ["INPUT", "TEXTAREA", "SELECT"].includes(activeElement.tagName);

  if (isTyping) {
    return;
  }

  switch (event.key) {
    case "ArrowRight":
    case "ArrowDown":
    case "PageDown":
      event.preventDefault();
      nextSlide();
      break;
    case "ArrowLeft":
    case "ArrowUp":
    case "PageUp":
      event.preventDefault();
      previousSlide();
      break;
    case "Home":
      event.preventDefault();
      goToSlide(0);
      break;
    case "End":
      event.preventDefault();
      goToSlide(totalSlides - 1);
      break;
    case "n":
    case "N":
      event.preventDefault();
      toggleNotes();
      break;
    case "Escape":
      if (!notesPanel.hidden) {
        event.preventDefault();
        toggleNotes(false);
      }
      break;
    default:
      break;
  }
}

function init() {
  buildNavigation();
  prevBtn.addEventListener("click", previousSlide);
  nextBtn.addEventListener("click", nextSlide);
  notesBtn.addEventListener("click", () => toggleNotes());
  closeNotesBtn.addEventListener("click", () => toggleNotes(false));
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("hashchange", () => {
    const hashMatch = window.location.hash.match(/^#slide-(\d+)$/);
    if (hashMatch) {
      currentSlide = clampIndex(Number(hashMatch[1]) - 1);
      render();
    }
  });

  render();
}

init();
