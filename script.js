document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Basic Site Features ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll Reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Ticker Logic
  const ticker = document.querySelector('.ticker');
  if (ticker) {
    ticker.innerHTML += ticker.innerHTML; 
  }

  // --- 2. Advanced Fluid Modal Logic ---
  const modalContainer = document.getElementById('modal-container'); 
  const modalWrapper = document.querySelector('.modal-wrapper'); 
  const closeButtons = document.querySelectorAll('.modal-close');
  const triggers = document.querySelectorAll('[data-modal]'); 

  // Define separate groups for your carousels
  const featuredModalIds = ['modal-kairs', 'modal-igem', 'modal-biocast', 'modal-ewh', 'modal-capstone'];
  const narrativeModalIds = ['modal-mission', 'modal-adventures']; 
  // Note: if you kept hardware as a modal, add 'modal-hardware' to the array above!

  let currentModalGroup = [];
  let currentIndex = 0;

  function openModal(modalId) {
    // 1. Reset state
    document.querySelectorAll('.modal-card').forEach(card => {
      card.classList.remove('active', 'rendering');
      card.style.display = 'none'; 
      // Reset scroll on the inner wrapper
      const scrollable = card.querySelector('.modal-scrollable');
      if (scrollable) scrollable.scrollTop = 0;
    });
    const targetModal = document.getElementById(modalId);
    
    if (targetModal && modalContainer) {
      modalContainer.classList.add('active');
      document.body.style.overflow = 'hidden'; 
      
      // Determine which carousel group we are currently in
      if (featuredModalIds.includes(modalId)) {
          currentModalGroup = featuredModalIds;
      } else if (narrativeModalIds.includes(modalId)) {
          currentModalGroup = narrativeModalIds;
      } else {
          // Fallback just in case a modal isn't in a list
          currentModalGroup = [modalId]; 
      }

      // Update current index for next/prev buttons based on the active group
      currentIndex = currentModalGroup.indexOf(modalId);

      // Hide arrows if there is only 1 item in the current group
      const prevBtn = document.querySelector('.nav-arrow.nav-prev');
      const nextBtn = document.querySelector('.nav-arrow.nav-next');
      if (prevBtn && nextBtn) {
          if (currentModalGroup.length <= 1) {
              prevBtn.style.display = 'none';
              nextBtn.style.display = 'none';
          } else {
              prevBtn.style.display = 'flex';
              nextBtn.style.display = 'flex';
          }
      }

      // 2. FLUID ANIMATION TRICK
      targetModal.style.display = 'block';
      targetModal.classList.add('rendering');
      void targetModal.offsetWidth; 
      setTimeout(() => {
        targetModal.classList.add('active');
      }, 10);
    }
  }

  function closeModal() {
    document.querySelectorAll('.modal-card.active').forEach(card => {
      card.classList.remove('active');
    });
    if (modalContainer) modalContainer.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
      document.querySelectorAll('.modal-card').forEach(card => {
        card.classList.remove('rendering');
        card.style.display = 'none';
      });
    }, 500);
  }

  // --- Event Listeners ---
  if (modalContainer) {
    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault(); 
        const targetId = trigger.getAttribute('data-modal');
        if (targetId) openModal(targetId);
      });
    });

    const prevBtn = document.querySelector('.nav-arrow.nav-prev'); 
    const nextBtn = document.querySelector('.nav-arrow.nav-next');

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentModalGroup.length <= 1) return; // Prevent cycling if only 1 item
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = currentModalGroup.length - 1;
        openModal(currentModalGroup[newIndex]);
      });

      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentModalGroup.length <= 1) return; // Prevent cycling if only 1 item
        let newIndex = currentIndex + 1;
        if (newIndex >= currentModalGroup.length) newIndex = 0;
        openModal(currentModalGroup[newIndex]);
      });
    }

    closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

    // [FIXED] Robust Background Click Handler
    modalContainer.addEventListener('click', (e) => {
      // Check if the click happened inside the card or on the nav arrows
      const isClickInsideCard = e.target.closest('.modal-card');
      const isClickOnArrow = e.target.closest('.nav-arrow');
      
      // If the click is NOT inside a card AND NOT on an arrow, it must be the background
      if (!isClickInsideCard && !isClickOnArrow) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!modalContainer.classList.contains('active')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevBtn?.click();
      if (e.key === 'ArrowRight') nextBtn?.click();
    });
  }

  // --- 3. Interactive Background Blobs ---
  const blobContainer = document.getElementById('blob-container');
  
  if (blobContainer) {
    const blobCount = 7; 
    const blobs = [];
    const colors = [
      'rgba(75, 156, 211, 0.7)',  
      'rgba(157, 78, 221, 0.6)', 
      'rgba(0, 255, 255, 0.5)',  
      'rgba(255, 100, 150, 0.5)' 
    ];

    const random = (min, max) => Math.random() * (max - min) + min;

    class Blob {
      constructor(id) {
        this.el = document.createElement('div');
        this.el.classList.add('blob');
        this.size = random(200, 400); 
        this.el.style.width = `${this.size}px`;
        this.el.style.height = `${this.size}px`;
        this.el.style.background = colors[id % colors.length];

        this.x = random(0, window.innerWidth - this.size);
        this.y = random(0, window.innerHeight - this.size);
        
        this.vx = random(-0.8, 0.8);
        this.vy = random(-0.8, 0.8);

        blobContainer.appendChild(this.el);
      }

      update(mouseX, mouseY, clicked) {
        this.vx *= 0.99; this.vy *= 0.99;
        this.x += this.vx; this.y += this.vy;

        if (this.x <= -100 || this.x >= window.innerWidth - this.size + 100) this.vx *= -1;
        if (this.y <= -100 || this.y >= window.innerHeight - this.size + 100) this.vy *= -1;

        const centerX = this.x + this.size / 2;
        const centerY = this.y + this.size / 2;
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const interactionRadius = 450;

        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          const angle = Math.atan2(dy, dx);
          const pushStrength = clicked ? 30.0 : 6.0; 
          this.x -= Math.cos(angle) * force * pushStrength;
          this.y -= Math.sin(angle) * force * pushStrength;
        }
        this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
      }
    }

    for (let i = 0; i < blobCount; i++) {
      blobs.push(new Blob(i));
    }

    let mouseX = -1000, mouseY = -1000;
    let isClicked = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    window.addEventListener('mousedown', (e) => {
      if (e.target === blobContainer || e.target === document.body) {
        isClicked = true;
        setTimeout(() => isClicked = false, 200); 
      }
    });

    function animate() {
      blobs.forEach(blob => blob.update(mouseX, mouseY, isClicked));
      requestAnimationFrame(animate);
    }
    animate();
  }

  // --- 4. Scroll Spy Logic ---
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');

  function activeMenu() {
    let len = sections.length;
    let currentSectionId = 'hero'; 

    while (--len >= 0) {
        if (sections[len].offsetTop <= window.scrollY + 150) {
            currentSectionId = sections[len].id;
            break;
        }
    }

    navLinks.forEach(link => {
        link.classList.remove("active");
        const linkHref = link.getAttribute('href');
        let targetId = null;

        if (linkHref.includes('#')) {
            targetId = linkHref.substring(linkHref.lastIndexOf('#') + 1);
        }

        let shouldBeActive = false;
        if (targetId === currentSectionId) shouldBeActive = true;
        if (currentSectionId === 'hero' && targetId === 'work') shouldBeActive = true;
        if (linkHref === 'gallery.html' || linkHref === 'index.html') shouldBeActive = false; 

        if (shouldBeActive) link.classList.add("active");
    });
  }
  
  window.addEventListener("scroll", activeMenu);
  activeMenu();

  // --- 5. Scroll Prompt Logic ---
  // Hides the "Scroll for details" text when the user scrolls down
  const scrollables = document.querySelectorAll('.modal-scrollable');
  
  scrollables.forEach(el => {
    el.addEventListener('scroll', () => {
      const prompt = el.parentElement.querySelector('.scroll-prompt');
      if (prompt) {
        // Hide if scrolled more than 50px
        if (el.scrollTop > 50) {
          prompt.classList.add('hidden');
        } else {
          prompt.classList.remove('hidden');
        }
      }
    });
  });
});

// Interactive Boot Sequence (Session Storage Enabled)
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    
    // 1. Check if the user has already seen the animation this session
    if (sessionStorage.getItem('bootSequencePlayed') === 'true') {
        // If yes, instantly hide the preloader and exit the function
        if (preloader) preloader.style.display = 'none';
        return; 
    }

    // 2. If they haven't seen it, set up the animation
    const initiateBtn = document.getElementById('initiate-btn');
    const bootSequence = document.getElementById('boot-sequence');
    const termLines = document.querySelectorAll('.term-line');
    const ekgLine = document.querySelector('.ekg-line');

    if (initiateBtn && preloader) {
        initiateBtn.addEventListener('click', () => {
            // Hide the button and show the terminal lines
            initiateBtn.style.display = 'none';
            bootSequence.style.display = 'flex';

            // Spike the EKG (switches to fast, red animation)
            ekgLine.classList.remove('ekg-slow');
            ekgLine.classList.add('ekg-fast');

            // Rapidly type out the terminal lines
            termLines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add('visible');
                }, index * 250); 
            });

            // Calculate total time to wait before dissolving the screen
            const totalTextTime = termLines.length * 250;
            
            setTimeout(() => {
                // Add the class that scales and blurs the screen away
                preloader.classList.add('system-active');
                
                // Completely remove it from the DOM
                setTimeout(() => {
                    preloader.style.display = 'none';
                    
                    // 3. Mark the animation as played in the browser's session storage
                    sessionStorage.setItem('bootSequencePlayed', 'true');
                    
                }, 800); 
                
            }, totalTextTime + 500); 
        });
    }
});

// --- HAMBURGER MENU LOGIC ---
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

if (hamburger) {
    // Toggle menu on click
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });
}