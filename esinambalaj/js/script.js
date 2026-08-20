/* ==========================================
   ESIN AMBALAJ - Interactive Scripts
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  // Sticky Navbar Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Scroll To Top Button
  const floatTopBtn = document.querySelector('.float-top');
  if (floatTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        floatTopBtn.classList.add('visible');
      } else {
        floatTopBtn.classList.remove('visible');
      }
    });

    floatTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

  // Dynamic Portfolio Filtering (for Projeler page)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px) scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Interactive Form Submission with Formspree
  const quoteForm = document.getElementById('quoteForm');
  const formSuccessMessage = document.getElementById('formSuccess');

  if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'İşleniyor...';

      const formData = new FormData(quoteForm);

      try {
        const response = await fetch(quoteForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          quoteForm.reset();
          if (formSuccessMessage) {
            formSuccessMessage.style.display = 'block';
            setTimeout(() => {
              formSuccessMessage.style.display = 'none';
            }, 5000);
          } else {
            alert('Talebiniz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz!');
          }
        } else {
          const data = await response.json();
          if (data && data.errors) {
            alert('Hata: ' + data.errors.map(error => error.message).join(', '));
          } else {
            alert('Bir hata oluştu, lütfen tekrar deneyin.');
          }
        }
      } catch (error) {
        alert('Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edin.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
});