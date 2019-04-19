const form = document.querySelector('form');
const emailInput = document.querySelector('#email-input');

form.onsubmit = (event) => {
  event.preventDefault();

  const inputValue = emailInput.value.toLowerCase();
  const spiltValue = inputValue.split('@');
  const splitValue1 = spiltValue[0];
  const splitValue2 = spiltValue[1];

  if (splitValue2 === 'bankofolive.com') {
    if (splitValue1 === 'admin') {
      window.location.href = './admin_bank_accounts.html';
    } else {
      window.location.href = './bank_accounts.html';
    }
  } else {
    window.location.href = './profile.html';
  }
};
