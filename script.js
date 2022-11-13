const bookContainer = document.querySelector('div.wrapper > main');
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

function Book () {
  this.sectionEl = document.createElement('section');
  this.headerEl = document.createElement('h2');
  this.autorEl = document.createElement('p');
  this.pagesEl = document.createElement('p');

  this.sectionEl.append(this.headerEl, this.autorEl, this.pagesEl);
  this.sectionEl.classList.add('book-card');
}

Book.prototype.setInfo = function (title, author, pages) {
  this.headerEl.innerText = title;
  this.autorEl.innerText = `Author: ${author}`;
  this.pagesEl.innerText = `Pages: ${pages}`;
}

Book.prototype.getCard = function () {
  return this.sectionEl;
}
