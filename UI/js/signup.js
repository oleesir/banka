const form = document.querySelector('form');

form.onsubmit = (event) => {
  event.preventDefault();
  window.location.href = './profile.html';
};
