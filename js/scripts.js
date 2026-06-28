// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Form submit → Web3Forms (silent, no email app)
document.getElementById('demoForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = this.querySelector('.form-submit');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  const data = {
    access_key: '1eceb4ce-cf5d-4d2f-8c6f-e96950b5adc5',
    subject:    'Demo Class Request – Huneza Online Tuition',
    name:       document.getElementById('f-fname').value.trim() + ' ' + document.getElementById('f-lname').value.trim(),
    email:      document.getElementById('f-email').value.trim(),
    phone:      document.getElementById('f-phone').value.trim(),
    course:     document.getElementById('f-course').value,
    message:    document.getElementById('f-msg').value.trim()
  };

  try {
    const res  = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();

    const toast = document.getElementById('toast');
    if (json.success) {
      toast.style.background = '#2C7744';
      toast.textContent = '✅ Request sent! We will contact you within 24 hours.';
      this.reset();
    } else {
      toast.style.background = '#C05621';
      toast.textContent = '❌ Something went wrong. Please try again.';
    }
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 6000);
  } catch {
    alert('Network error. Please try again.');
  }

  btn.textContent = 'Send Demo Request →';
  btn.disabled = false;
});