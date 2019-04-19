const modalBtns = document.getElementsByClassName('modal-trigger');
const closeBtns = document.getElementsByClassName('modal-close-btn');


function openModal(e) {
  const selectedModalClass = e.target.dataset.modal;
  const selectedClass = document.querySelector(selectedModalClass);
  selectedClass.style.display = 'block';
}

function closeModal(e) {
  if (e.target.className === 'modal') {
    e.target.style.display = 'none';
  }

  if (
    e.target.offsetParent.className === 'modal'
    && (e.target.className.includes('close-sign') || e.target.className.includes('modal-close-btn'))
  ) {
    e.target.offsetParent.style.display = 'none';
  }
}

for (let i = 0; i <= modalBtns.length - 1; i += 1) {
  modalBtns[i].addEventListener('click', openModal, false);
}

for (let i = 0; i <= closeBtns.length - 1; i += 1) {
  closeBtns[i].addEventListener('click', closeModal, false);
}

// outside click
window.addEventListener('click', closeModal, false);
