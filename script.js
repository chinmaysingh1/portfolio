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
  const prevBtn = document.querySelector('.nav-prev');
  const nextBtn = document.querySelector('.nav-next');
  
  const modalIds = ['modal-kairs', 'modal-igem', 'modal-biocast', 'modal-ewh'];
  let currentIndex = 0;

  function openModal(index) {
    // 1. Reset state
    document.querySelectorAll('.modal-card').forEach(card => {
      card.classList.remove('active', 'rendering');
      card.style.display = 'none'; 
      card.scrollTop = 0; 
    });

    const targetId = modalIds[index];
    const targetModal = document.getElementById(targetId);
    
    if (targetModal) {
      modalContainer.classList.add('active');
      document.body.style.overflow = 'hidden'; 
      currentIndex = index;

      // 2. FLUID ANIMATION TRICK
      // Step A: Make it exist but invisible
      targetModal.style.display = 'block';
      targetModal.classList.add('rendering');
      
      // Step B: Force browser to paint
      void targetModal.offsetWidth; 

      // Step C: Trigger transition
      setTimeout(() => {
        targetModal.classList.add('active');
      }, 10);
    }
  }

  function closeModal() {
    // Fade out active card
    document.querySelectorAll('.modal-card.active').forEach(card => {
      card.classList.remove('active');
    });

    // Fade out overlay
    modalContainer.classList.remove('active');
    document.body.style.overflow = '';
    
    // Cleanup after animation (0.5s matches CSS)
    setTimeout(() => {
      document.querySelectorAll('.modal-card').forEach(card => {
        card.classList.remove('rendering');
        card.style.display = 'none';
      });
    }, 500);
  }

  // Event Listeners
  if (modalContainer) {
    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault(); 
        const modalId = trigger.getAttribute('data-modal');
        const index = modalIds.indexOf(modalId);
        if (index !== -1) openModal(index);
      });
    });

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = modalIds.length - 1;
        openModal(newIndex);
      });

      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let newIndex = currentIndex + 1;
        if (newIndex >= modalIds.length) newIndex = 0;
        openModal(newIndex);
      });
    }

    closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

    if (modalWrapper) {
      modalWrapper.addEventListener('click', (e) => {
        if (e.target === modalWrapper) closeModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!modalContainer.classList.contains('active')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevBtn?.click();
      if (e.key === 'ArrowRight') nextBtn?.click();
    });
  }

  // --- 3. Interactive Background Blobs (Dynamic & Playful) ---
  const blobContainer = document.getElementById('blob-container');
  
  if (blobContainer) {
    const blobCount = 7; 
    const blobs = [];
    const colors = [
      'rgba(75, 156, 211, 0.7)',  // Blue
      'rgba(157, 78, 221, 0.6)', // Purple
      'rgba(0, 255, 255, 0.5)',  // Cyan
      'rgba(255, 100, 150, 0.5)' // Pink accent
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
        // 1. Natural Drift & Friction
        this.vx *= 0.99; // Apply friction
        this.vy *= 0.99;
        this.x += this.vx;
        this.y += this.vy;

        // 2. Wall Bouncing
        if (this.x <= -100 || this.x >= window.innerWidth - this.size + 100) this.vx *= -1;
        if (this.y <= -100 || this.y >= window.innerHeight - this.size + 100) this.vy *= -1;

        // 3. Mouse Interaction (Magnetic Repulsion)
        const centerX = this.x + this.size / 2;
        const centerY = this.y + this.size / 2;
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const interactionRadius = 450;

        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          const angle = Math.atan2(dy, dx);
          
          // Click force is much stronger
          const pushStrength = clicked ? 30.0 : 6.0; 

          // Apply force by adjusting velocity/position
          this.x -= Math.cos(angle) * force * pushStrength;
          this.y -= Math.sin(angle) * force * pushStrength;
        }

        // 4. Update DOM
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
      // Ensure we don't interfere with links/buttons
      if (e.target === blobContainer || e.target === document.body) {
        isClicked = true;
        setTimeout(() => isClicked = false, 200); // Reset click burst
      }
    });

    function animate() {
      blobs.forEach(blob => blob.update(mouseX, mouseY, isClicked));
      requestAnimationFrame(animate);
    }
    animate();
  }
});