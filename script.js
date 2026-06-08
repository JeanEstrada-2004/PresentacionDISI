const slides = Array.from(document.querySelectorAll(".slide"));
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressFill = document.getElementById("progressFill");
const slideCounter = document.getElementById("slideCounter");
const currentTitle = document.getElementById("currentTitle");
const evidenceImages = Array.from(document.querySelectorAll(".evidence-image"));
const imageLightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxClose = document.getElementById("lightboxClose");

const totalSlides = slides.length;
const storageKey = "nanu-tech-disi-final-current-slide";
let currentSlide = getInitialSlide();
let lastLightboxTrigger = null;

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

    slide.querySelectorAll(".evidence-image[role='button']").forEach((image) => {
      image.tabIndex = index === currentSlide ? 0 : -1;
    });
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

function getImageCaption(image) {
  const figure = image.closest("figure");
  const caption = figure ? figure.querySelector("figcaption") : null;
  const captionText = caption ? caption.textContent.trim() : "";

  return captionText || image.alt || "Imagen ampliada";
}

function isLightboxOpen() {
  return imageLightbox && imageLightbox.classList.contains("is-open");
}

function openLightbox(image) {
  if (!imageLightbox || !lightboxImage || !lightboxTitle) {
    return;
  }

  lastLightboxTrigger = image;
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt || "";
  lightboxTitle.textContent = getImageCaption(image);
  imageLightbox.classList.add("is-open");
  imageLightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");

  if (lightboxClose) {
    lightboxClose.focus();
  }
}

function closeLightbox() {
  if (!imageLightbox || !lightboxImage || !lightboxTitle || !isLightboxOpen()) {
    return;
  }

  imageLightbox.classList.remove("is-open");
  imageLightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  lightboxImage.removeAttribute("src");
  lightboxImage.alt = "";
  lightboxTitle.textContent = "";

  if (lastLightboxTrigger) {
    lastLightboxTrigger.focus();
    lastLightboxTrigger = null;
  }
}

function initImageLightbox() {
  if (!imageLightbox || !lightboxImage || !lightboxTitle) {
    return;
  }

  evidenceImages.forEach((image) => {
    const figure = image.closest(".evidence-figure");
    const caption = getImageCaption(image);

    if (figure) {
      figure.classList.add("is-zoomable");
    }

    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `Ampliar imagen: ${caption}`);
    image.tabIndex = -1;

    image.addEventListener("click", () => openLightbox(image));
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  imageLightbox.addEventListener("click", (event) => {
    if (event.target === imageLightbox) {
      closeLightbox();
    }
  });
}

function handleKeydown(event) {
  if (isLightboxOpen()) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
    }

    return;
  }

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
  initImageLightbox();
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
