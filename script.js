const newBookBtn = document.querySelector('div.wrapper > header > button');
const modalForm = document.querySelector('div.form-modal');
const closeModal = document.querySelector('div.form-modal > form > span');

const formFieldset = document.querySelector('div.form-modal > form > fieldset');
const addBookBtn = document.querySelector('div.form-modal > form > button');
const titleInput = formFieldset.querySelector('input[id="book-title"]');
const authorInput = formFieldset.querySelector('input[id="book-author"]');
const pagesInput = formFieldset.querySelector('input[id="book-pages"]');

function toggleModal () {
  modalForm.classList.toggle('visible');
}

newBookBtn.addEventListener('pointerdown', toggleModal);
closeModal.addEventListener('pointerdown', toggleModal);
