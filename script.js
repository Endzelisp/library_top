const newBookBtn = document.querySelector('div.wrapper > header > button');
const modalForm = document.querySelector('div.form-modal');
const closeModal = document.querySelector('div.form-modal > form > span');

function toggleModal () {
  modalForm.classList.toggle('visible');
}

newBookBtn.addEventListener('pointerdown', toggleModal);
closeModal.addEventListener('pointerdown', toggleModal);