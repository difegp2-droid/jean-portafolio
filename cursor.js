// --- Custom Cursor Logic ---
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  if (cursorDot) {
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  }
});

const animateCursor = () => {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  
  if (cursorRing) {
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
  }
  
  requestAnimationFrame(animateCursor);
};
animateCursor();

// Add hover effect
const clickablesElements = document.querySelectorAll('a, button, .clickable');
clickablesElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursorRing) cursorRing.classList.add('hovering');
  });
  el.addEventListener('mouseleave', () => {
    if (cursorRing) cursorRing.classList.remove('hovering');
  });
});
