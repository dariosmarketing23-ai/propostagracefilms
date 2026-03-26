/* ============================================
   GRACE FILMS — CINEMATIC LANDING PAGE JS
   ============================================ */

(function () {
  'use strict';

  // ============================================
  // LOADING SCREEN
  // ============================================
  const loadingScreen = document.getElementById('loading-screen');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hide');
      // After loading animation, trigger hero
      setTimeout(() => {
        initHeroAnimation();
        initRevealAnimations();
      }, 600);
    }, 2500);
  });

  // ============================================
  // CUSTOM CURSOR
  // ============================================
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (!isMobile && cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .service-card, .portfolio-card, .method-step');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // ============================================
  // NAVBAR SCROLL
  // ============================================
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ============================================
  // MOBILE MENU
  // ============================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================================
  // SMOOTH SCROLL FOR NAV LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });

  // ============================================
  // HERO ANIMATION
  // ============================================
  function initHeroAnimation() {
    const heroLogo = document.getElementById('hero-logo');
    if (heroLogo) {
      heroLogo.classList.add('visible');
    }
  }

  // ============================================
  // REVEAL ON SCROLL (Intersection Observer)
  // ============================================
  function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal-text');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  // ============================================
  // PARALLAX ON SCROLL (subtle)
  // ============================================
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Hero parallax
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrollY < window.innerHeight) {
          heroContent.style.transform = `translateY(${scrollY * 0.25}px)`;
          heroContent.style.opacity = 1 - scrollY / (window.innerHeight * 0.8);
        }

        // Marquee speed boost on scroll
        const marquees = document.querySelectorAll('.marquee-content');
        marquees.forEach((m) => {
          const speed = Math.min(scrollY * 0.003, 3);
          m.style.animationDuration = Math.max(15, 30 - speed * 5) + 's';
        });

        ticking = false;
      });
      ticking = true;
    }
  });

  // ============================================
  // NAVBAR LINK ACTIVE STATE
  // ============================================
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  });
  // ============================================
  // BACKSTAGE VIDEO — AUTOPLAY ON SCROLL
  // ============================================
  const backstageVideo = document.getElementById('backstage-video');
  const backstagePlay = document.getElementById('backstage-play');

  if (backstageVideo && backstagePlay) {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            backstageVideo.play().then(() => {
              backstagePlay.classList.add('hidden');
            }).catch(() => {
              // Autoplay blocked by browser — keep play button
            });
          } else {
            backstageVideo.pause();
            backstagePlay.classList.remove('hidden');
          }
        });
      },
      { threshold: 0.3 }
    );

    videoObserver.observe(backstageVideo);

    // Allow manual pause/resume on click
    backstageVideo.addEventListener('click', () => {
      if (backstageVideo.paused) {
        backstageVideo.play();
        backstagePlay.classList.add('hidden');
      } else {
        backstageVideo.pause();
        backstagePlay.classList.remove('hidden');
      }
    });

    backstagePlay.addEventListener('click', () => {
      backstageVideo.play();
      backstagePlay.classList.add('hidden');
    });
  }
})();
