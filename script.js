const slides = Array.from(document.querySelectorAll(".slide"));
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressFill = document.getElementById("progressFill");
const slideCounter = document.getElementById("slideCounter");
const currentTitle = document.getElementById("currentTitle");

const totalSlides = slides.length;
const storageKey = "nanu-tech-disi-final-current-slide";
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

function updateSlideClasses() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlide);
    slide.classList.toggle("previous", index < currentSlide);
    slide.classList.toggle("hidden", index > currentSlide);
    slide.setAttribute("aria-hidden", index === currentSlide ? "false" : "true");
  });
}

function updateProgress() {
  const progress = ((currentSlide + 1) / totalSlides) * 100;
  progressFill.style.width = `${progress}%`;
  slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
  currentTitle.textContent = slides[currentSlide].dataset.title || `Diapositiva ${currentSlide + 1}`;
}

function updateControls() {
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === totalSlides - 1;
}

function persistSlide() {
  writeStoredSlide(currentSlide);

  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, "", `#slide-${currentSlide + 1}`);
  }
}

function render() {
  updateSlideClasses();
  updateProgress();
  updateControls();
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
    case " ":
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
    default:
      break;
  }
}

function init() {
  prevBtn.addEventListener("click", previousSlide);
  nextBtn.addEventListener("click", nextSlide);
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
