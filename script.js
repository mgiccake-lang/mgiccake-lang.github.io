const revealItems = document.querySelectorAll('.reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px' });

  revealItems.forEach((item) => revealObserver.observe(item));
}

document.querySelectorAll('.detail-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const details = button.closest('.experience-body').querySelector('.experience-details');
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));

    if (!expanded) {
      details.hidden = false;
      const targetHeight = details.scrollHeight;
      details.animate(
        [
          { height: '0px', opacity: 0, transform: 'translateY(-6px)' },
          { height: `${targetHeight}px`, opacity: 1, transform: 'translateY(0)' }
        ],
        { duration: 340, easing: 'cubic-bezier(.22,.61,.36,1)' }
      );
    } else {
      const animation = details.animate(
        [
          { height: `${details.scrollHeight}px`, opacity: 1 },
          { height: '0px', opacity: 0 }
        ],
        { duration: 260, easing: 'cubic-bezier(.22,.61,.36,1)' }
      );
      animation.onfinish = () => { details.hidden = true; };
    }
  });
});

const toggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    mobileNav.classList.toggle('open', !expanded);
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
    });
  });
}

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-links a')];
if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { threshold: 0.18, rootMargin: '-28% 0px -58%' });
  sections.forEach((section) => navObserver.observe(section));
}
