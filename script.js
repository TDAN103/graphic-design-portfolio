
document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.nav-links');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const open = navigation.classList.toggle('open');

      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute(
        'aria-label',
        open ? 'Close navigation' : 'Open navigation'
      );
      menuButton.textContent = open ? '✕' : '☰';
    });

    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navigation.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
        menuButton.textContent = '☰';
      });
    });
  }

  // Portfolio category filters
  const filterButtons = document.querySelectorAll('.filter-button');
  const projects = document.querySelectorAll('.design-card[data-category]');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;

      filterButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle('selected', selected);
        item.setAttribute('aria-pressed', String(selected));
      });

      projects.forEach((project) => {
        project.hidden =
          category !== 'all' &&
          project.dataset.category !== category;
      });
    });

    button.setAttribute(
      'aria-pressed',
      String(button.classList.contains('selected'))
    );
  });

  // Contact form: prepare an email in the visitor's email application
  const contactForm = document.querySelector('#contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      const name = document.querySelector('#name').value.trim();
      const email = document.querySelector('#email').value.trim();
      const service = document.querySelector('#service').value;
      const message = document.querySelector('#message').value.trim();
      const status = document.querySelector('#form-status');

      // Replace this address with your actual contact email.
      const recipient = 'your-email@example.com';

      if (recipient === 'your-email@example.com') {
        status.textContent =
          'The form is working, but the owner must add a real email address in script.js first.';
        return;
      }

      const subject = encodeURIComponent(`Project enquiry: ${service}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nProject details:\n${message}`
      );

      status.textContent =
        'Opening your email application. Please review and send your message there.';

      window.location.href =
        `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
  }
});
