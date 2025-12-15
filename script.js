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
  const modalContainer = document.getElementById('modal-overlay'); // Corrected ID usage
  const modalWrapper = document.querySelector('.modal-wrapper'); 
  const closeButtons = document.querySelectorAll('.modal-close');
  const triggers = document.querySelectorAll('[data-project-id]'); 
  const prevBtn = document.querySelector('#modal-prev'); 
  const nextBtn = document.querySelector('#modal-next');
  
  // Update Modal IDs to match index.html
  const modalIds = ['modal-kairs-v3', 'modal-igem-project', 'modal-sode-lab', 'modal-ewh-workshop'];
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
    modalContainer.classList.remove('active');
    document.body.style.overflow = '';
    
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
        const projectId = trigger.getAttribute('data-project-id');
        // Map project ID to modal index
        let index = -1;
        if (projectId === 'kairs-v3') index = 0;
        if (projectId === 'igem-project') index = 1;
        if (projectId === 'sode-lab') index = 2;
        if (projectId === 'ewh-workshop') index = 3;

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

  // --- 4. Scroll Spy Logic (FIXED) ---
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');

  function activeMenu() {
    let len = sections.length;
    let currentSectionId = 'hero'; // Default: top of the page

    // Iterate backward to find the highest section that is currently visible
    while (--len >= 0) {
        // Use an offset (150px) to make sure the link highlights before the section hits the very top
        if (sections[len].offsetTop <= window.scrollY + 150) {
            currentSectionId = sections[len].id;
            break;
        }
    }

    navLinks.forEach(link => {
        link.classList.remove("active");
        
        const linkHref = link.getAttribute('href');
        let targetId = null;

        // Check if it's an internal hash link (e.g., 'index.html#work' or '#work')
        if (linkHref.includes('#')) {
            // Extract the ID after the last '#'
            targetId = linkHref.substring(linkHref.lastIndexOf('#') + 1);
        }

        let shouldBeActive = false;

        // 1. If the section ID matches the link's target ID
        if (targetId === currentSectionId) {
            shouldBeActive = true;
        } 
        
        // 2. Special case: If we are in the 'hero' section (at the very top), highlight the 'Projects' link (#work)
        if (currentSectionId === 'hero' && targetId === 'work') {
            shouldBeActive = true;
        }
        
        // 3. Special case: If the link is the 'Gallery' link, do nothing (it's an external page)
        if (linkHref === 'gallery.html' || linkHref === 'index.html') {
             shouldBeActive = false; 
        }

        // Apply active class if match is found
        if (shouldBeActive) {
             link.classList.add("active");
        }
    });
  }
  
  // Run on scroll
  window.addEventListener("scroll", activeMenu);
  // Run once on load to set initial state
  activeMenu();
});