
// Bootstrap validation for forms with class 'needs-validation'
(() => {
  'use strict';

  // Fetch all the forms we want to apply validation to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over forms and prevent submission if invalid
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

