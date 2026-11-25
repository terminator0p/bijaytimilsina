(function () {
  "use strict";

  const form = document.getElementById('contact-form');
  if (!form) return;

  const button = form.querySelector('button[type="submit"]');
  const loading = form.querySelector('.loading');
  const errorMessage = form.querySelector('.error-message');
  const sentMessage = form.querySelector('.sent-message');
  let submitting = false;

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (submitting || !form.reportValidity()) return;

    const data = new FormData(form);
    const payload = {
      name: data.get('name').trim(),
      email: data.get('email').trim(),
      message: data.get('message').trim()
    };

    errorMessage.classList.remove('d-block');
    sentMessage.classList.remove('d-block');
    if (!payload.name || !payload.email || !payload.message) {
      errorMessage.textContent = 'Please enter your name, email, and message.';
      errorMessage.classList.add('d-block');
      return;
    }

    submitting = true;
    button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    loading.classList.add('d-block');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(response.status === 429
          ? 'Too many messages. Please wait a moment before trying again.'
          : 'Your message could not be sent. Please try again later.');
      }

      sentMessage.classList.add('d-block');
      form.reset();
    } catch (error) {
      errorMessage.textContent = error instanceof TypeError
        ? 'Unable to connect. Please check your connection and try again.'
        : error.message;
      errorMessage.classList.add('d-block');
    } finally {
      submitting = false;
      button.disabled = false;
      form.removeAttribute('aria-busy');
      loading.classList.remove('d-block');
    }
  });
})();
