import * as THREE from 'three';



// AUDIO LOGIC
const audioBtn = document.getElementById('audio-toggle');
const audioEl = document.getElementById('ambient-audio');
let isPlaying = false;

if (audioBtn && audioEl) {
  audioBtn.addEventListener('click', () => {
    if (isPlaying) {
      audioEl.pause();
      audioBtn.textContent = '🎵 Vibe: OFF';
      audioBtn.classList.remove('playing');
    } else {
      audioEl.play();
      audioBtn.textContent = '🎵 Vibe: ON';
      audioBtn.classList.add('playing');
    }
    isPlaying = !isPlaying;
  });
}


// THREE.JS LOGIC
const canvasContainer = document.getElementById('canvas-container');
if (canvasContainer) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  canvasContainer.appendChild(renderer.domElement);
  
  // Abstract Wireframe Object
  const geometry = new THREE.IcosahedronGeometry(2.5, 1);
  const material = new THREE.MeshBasicMaterial({ 
    color: 0xffffff, 
    wireframe: true,
    transparent: true,
    opacity: 0.1
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
  
  camera.position.z = 6;
  
  // Parallax Variables
  let targetX = 0;
  let targetY = 0;
  
  document.addEventListener('mousemove', (e) => {
    // Normalize coordinates from -1 to 1 for Three.js
    targetX = (e.clientX / window.innerWidth) * 2 - 1;
    targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  });
  
  const animateThree = () => {
    requestAnimationFrame(animateThree);
    
    // Auto rotation
    sphere.rotation.x += 0.001;
    sphere.rotation.y += 0.002;
    
    // Mouse Parallax effect (lazy follow)
    sphere.rotation.y += 0.05 * (targetX - sphere.rotation.y);
    sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
    
    renderer.render(scene, camera);
  };
  
  animateThree();
  
  window.addEventListener('resize', () => {
    if (canvasContainer.clientWidth > 0) {
      camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    }
  });
}

// Hover & Parallax effects for blobs (legacy if they existed)
document.addEventListener('mousemove', (e) => {
  const blob1 = document.querySelector('.blob-1');
  const blob2 = document.querySelector('.blob-2');
  
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  if(blob1) blob1.style.transform = `translate(${x * -50}px, ${y * -50}px)`;
  if(blob2) blob2.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const reveal = () => {
  for (let i = 0; i < revealElements.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = revealElements[i].getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      revealElements[i].classList.add('active');
    }
  }
};

window.addEventListener('scroll', reveal);
reveal();

// Initial fade in for hero content
setTimeout(() => {
  const nav = document.querySelector('.glass-nav');
  const hero = document.querySelector('.hero-section');
  if(nav) nav.classList.add('active');
  if(hero) hero.classList.add('active');
}, 100);

// Helper for touch devices
const isTouchDevice = () => {
  return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
};

// 3D Tilt Effect for Project Cards
const cards = document.querySelectorAll('.project-card');

if (!isTouchDevice()) {
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -15; 
      const rotateY = ((x - centerX) / centerX) * 15;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// MODAL SYSTEM LOGIC
const modalSystem = document.getElementById('modal-system');
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const modalPages = document.querySelectorAll('.modal-page');
const clickables = document.querySelectorAll('.clickable');

const closeModal = () => {
  document.body.classList.remove('modal-active');
  modalSystem.classList.remove('active');
  // Optional: small timeout before hiding pages to wait for fade out
  setTimeout(() => {
    modalPages.forEach(p => p.classList.remove('active'));
  }, 500);
};

if (modalSystem) {
  modalBackdrop.addEventListener('click', closeModal);
  modalCloseBtn.addEventListener('click', closeModal);

  clickables.forEach(card => {
    card.addEventListener('click', () => {
      const targetId = card.getAttribute('data-target');
      if (targetId) {
        // Hide all pages first
        modalPages.forEach(p => p.classList.remove('active'));
        
        // Show target page
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
          targetPage.classList.add('active');
          // Activate modal system
          document.body.classList.add('modal-active');
          modalSystem.classList.add('active');
        }
      }
    });
  });
}

// --- Custom Cursor Logic ---
if (!isTouchDevice()) {
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
}
