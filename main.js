import * as THREE from 'three';



// AUDIO LOGIC
const audioBtn = document.getElementById('audio-toggle');
const audioEl = document.getElementById('ambient-audio');
let isPlaying = false;

if (audioBtn && audioEl) {
  const vibeText = audioBtn.querySelector('.vibe-text');
  audioBtn.addEventListener('click', () => {
    if (isPlaying) {
      audioEl.pause();
      if(vibeText) vibeText.textContent = 'Vibe: OFF';
      audioBtn.classList.remove('playing');
    } else {
      audioEl.play();
      if(vibeText) vibeText.textContent = 'Vibe: ON';
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

// --- GITHUB TICKER LOGIC ---
const fetchGitHubActivity = async () => {
  const tickerEl = document.getElementById('github-ticker');
  if (!tickerEl) return;
  
  try {
    const res = await fetch('https://api.github.com/users/difegp2-droid/events/public');
    const data = await res.json();
    
    // Buscar el último push event
    const pushEvent = data.find(event => event.type === 'PushEvent' || event.type === 'CreateEvent');
    
    if (pushEvent) {
      const repoName = pushEvent.repo.name.split('/')[1] || pushEvent.repo.name;
      const date = new Date(pushEvent.created_at);
      const now = new Date();
      const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);
      
      let timeAgo = '';
      if (diffHours === 0) timeAgo = 'hace menos de una hora';
      else if (diffHours < 24) timeAgo = `hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
      else timeAgo = `hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
      
      tickerEl.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        <span>Último commit: ${timeAgo} en <strong>${repoName}</strong></span>
        <span class="activity-dot"></span>
      `;
      tickerEl.style.display = 'flex';
    }
  } catch (err) {
    console.error('Error fetching GitHub activity:', err);
  }
};
fetchGitHubActivity();

// --- EASTER EGG LOGIC ---
const logo = document.querySelector('.logo');
let logoClicks = 0;
let clickTimeout;

if (logo) {
  logo.addEventListener('click', () => {
    logoClicks++;
    clearTimeout(clickTimeout);
    
    if (logoClicks >= 5) {
      document.body.classList.toggle('wireframe-mode');
      logoClicks = 0;
      console.log('%c [Modo Wireframe] ' + (document.body.classList.contains('wireframe-mode') ? 'Activado' : 'Desactivado'), 'color: #00ff88; font-weight: bold;');
    } else {
      clickTimeout = setTimeout(() => {
        logoClicks = 0;
      }, 1000); // Reset after 1 second of inactivity
    }
  });
}

// --- CONSOLE GREETING ---
console.log(
  "%c J.A - Web Developer %c\\n\\n¿Inspeccionando el código? ¡Me gusta tu curiosidad!\\nTodo está diseñado desde cero con mucho detalle.\\n\\n🚀 Disponible para nuevos retos.\\n📞 Contacto: wa.me/51912453016", 
  "background: #00ff88; color: #000; font-size: 20px; font-weight: bold; padding: 5px 10px; border-radius: 4px;", 
  "color: #00ff88; font-size: 14px;"
);
