document.addEventListener("DOMContentLoaded", () => {
  // ====== Модальное окно ======
  const dlg = document.getElementById('contactDialog');
  const openBtn = document.getElementById('openDialog');
  const closeBtn = document.getElementById('closeDialog');
  const form = document.getElementById('contactForm');
  let lastActive = null;

  if (dlg && openBtn && closeBtn && form) {
    openBtn.addEventListener('click', () => {
      lastActive = document.activeElement;
      dlg.showModal();
      dlg.querySelector('input, select, textarea, button')?.focus();
    });

    closeBtn.addEventListener('click', () => dlg.close('cancel'));

    form.addEventListener('submit', (e) => {
      [...form.elements].forEach(el => el.setCustomValidity?.(''));

      if (!form.checkValidity()) {
        e.preventDefault();
        const email = form.elements.email;
        if (email?.validity.typeMismatch) {
          email.setCustomValidity('Введите корректный e-mail, например name@example.com');
        }
        form.reportValidity();
        [...form.elements].forEach(el => {
          if (el.willValidate) el.toggleAttribute('aria-invalid', !el.checkValidity());
        });
        return;
      }

      e.preventDefault();
      dlg.close('success');
      form.reset();
      lastActive?.focus();
    });
  }

  // ====== Смена темы ======
  const themeButton = document.getElementById('themeToggle');
  if (themeButton) {
    let isOriginal = localStorage.getItem('theme') === 'dark' ? false : true;

    // применяем тему при загрузке
    document.body.style.background = isOriginal
      ? 'linear-gradient(135deg, #4CAF50, #2196F3)'
      : 'linear-gradient(135deg, #f44336, #000)';

    themeButton.addEventListener('click', () => {
      isOriginal = !isOriginal;
      document.body.style.background = isOriginal
        ? 'linear-gradient(135deg, #4CAF50, #2196F3)'
        : 'linear-gradient(135deg, #f44336, #000)';
      localStorage.setItem('theme', isOriginal ? 'light' : 'dark');
    });
  }

  // ====== Эффект на изображение hover-zoom ======
  const hoverImg = document.querySelector('.hover-zoom');
  if (hoverImg) {
    hoverImg.addEventListener('mouseenter', (e) => e.target.style.transform = 'scale(1.05)');
    hoverImg.addEventListener('mouseleave', (e) => e.target.style.transform = 'scale(1)');
  }
});
