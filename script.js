document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.glide-slide');
  let currentIndex = 0;
  let isScrolling = false;

  slides.forEach((slide, i) => {
    slide.style.transform = `translateY(${i * 100}%)`;
    slide.style.zIndex = slides.length - i;
  });

  const glideTo = (index) => {
    if (index < 0 || index >= slides.length || isScrolling) return;
    isScrolling = true;
    currentIndex = index;

    slides.forEach((slide, i) => {
      slide.style.transform = `translateY(${(i - currentIndex) * 100}%)`;
    });

    setTimeout(() => {
      isScrolling = false;
    }, 1400);
  };

  window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) glideTo(currentIndex + 1);
    else if (e.deltaY < 0) glideTo(currentIndex - 1);
  }, { passive: false });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') glideTo(currentIndex + 1);
    else if (e.key === 'ArrowUp') glideTo(currentIndex - 1);
  });

  let touchStartY = 0;
  let touchEndY = 0;

  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].clientY;
    if (touchStartY - touchEndY > 50) glideTo(currentIndex + 1);
    else if (touchEndY - touchStartY > 50) glideTo(currentIndex - 1);
  }, { passive: true });
});

// Toggle Address Popup
function togglePopup() {
  const popup = document.getElementById('addressPopup');
  popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}
