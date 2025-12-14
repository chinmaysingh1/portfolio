document.addEventListener('DOMContentLoaded', () => {
  // Update Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll Reveal
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Ticker Logic
  const ticker = document.querySelector('.ticker');
  if (ticker) {
    const clone1 = ticker.innerHTML;
    const clone2 = ticker.innerHTML;
    ticker.innerHTML += clone1 + clone2;
  }

  // === Modal Logic ===
  const modalContainer = document.getElementById('modal-container');
  const triggers = document.querySelectorAll('[data-modal]');
  const closeButtons = document.querySelectorAll('.modal-close');

  if (modalContainer && triggers.length > 0) {
    // Open Modal
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const modalId = trigger.getAttribute('data-modal');
        const targetModal = document.getElementById(modalId);
        
        if(targetModal) {
          // Hide any other active modals inside
          document.querySelectorAll('.modal-card').forEach(card => card.classList.remove('active'));
          
          modalContainer.classList.add('active');
          targetModal.classList.add('active');
          document.body.style.overflow = 'hidden'; // Stop scroll
        }
      });
    });

    // Close Function
    const closeModal = () => {
      modalContainer.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        document.querySelectorAll('.modal-card').forEach(card => card.classList.remove('active'));
      }, 300);
    };

    closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('active')) closeModal();
    });
  }
});