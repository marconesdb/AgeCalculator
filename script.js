document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('ageForm');
  const dayInput = document.getElementById('day');
  const monthInput = document.getElementById('month');
  const yearInput = document.getElementById('year');
  const yearsSpan = document.getElementById('years');
  const monthsSpan = document.getElementById('months');
  const daysSpan = document.getElementById('days');

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validate()) {
          calculateAge();
      }
  });

  function validate() {
      let isValid = true;
      const inputs = [dayInput, monthInput, yearInput];
      const currentYear = new Date().getFullYear();

      inputs.forEach(input => {
          const errorElement = input.nextElementSibling;
          errorElement.classList.add('hidden');
          input.classList.remove('border-light-red');

          if (!input.value) {
              showError(input, 'This field is required');
              isValid = false;
          } else {
              const value = parseInt(input.value);
              switch (input.id) {
                  case 'day':
                      if (value < 1 || value > 31) {
                          showError(input, 'Must be a valid day');
                          isValid = false;
                      }
                      break;
                  case 'month':
                      if (value < 1 || value > 12) {
                          showError(input, 'Must be a valid month');
                          isValid = false;
                      }
                      break;
                  case 'year':
                      if (value < 1900 || value > currentYear) {
                          showError(input, 'Must be a valid year');
                          isValid = false;
                      }
                      break;
              }
          }
      });

      return isValid;
  }

  function showError(input, message) {
      const errorElement = input.nextElementSibling;
      errorElement.textContent = message;
      errorElement.classList.remove('hidden');
      input.classList.add('border-light-red');
  }

  function calculateAge() {
      const birthDate = new Date(`${yearInput.value}-${monthInput.value}-${dayInput.value}`);
      const today = new Date();
      
      let ageYears = today.getFullYear() - birthDate.getFullYear();
      let ageMonths = today.getMonth() - birthDate.getMonth();
      let ageDays = today.getDate() - birthDate.getDate();

      if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
          ageYears--;
          ageMonths += 12;
      }

      if (ageDays < 0) {
          const daysInLastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
          ageMonths--;
          ageDays += daysInLastMonth;
      }

      yearsSpan.textContent = ageYears;
      monthsSpan.textContent = ageMonths;
      daysSpan.textContent = ageDays;
  }
});