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

function Card () {
  this.sectionEl = document.createElement('section');
  this.headerEl = document.createElement('h2');
  this.autorEl = document.createElement('p');
  this.pagesEl = document.createElement('p');

  this.sectionEl.append(this.headerEl, this.autorEl, this.pagesEl);
  this.sectionEl.classList.add('book-card');
}

Card.prototype.setInfo = function (title, author, pages) {
  this.headerEl.innerText = title;
  this.autorEl.innerText = `Author: ${author}`;
  this.pagesEl.innerText = `Pages: ${pages}`;
}

Card.prototype.getCard = function () {
  return this.sectionEl;
}

function Book (title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

myLibrary = [
  {
    title: 'Travels with Puff',
    author: 'Richard Bach',
    pages: 222,
  },
  {
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    pages: 163,
  },
  {
    title: 'JavaScript The Definitive Guide',
    author: 'David Flanagan',
    pages: 1245,
  },
];

addBookBtn.addEventListener('pointerdown', function () {
  const newEntry = new Book(titleInput.value, authorInput.value, pagesInput.value);
  myLibrary.push(newEntry);
  const newCard = new Card();
  newCard.setInfo(newEntry.title, newEntry.author, newEntry.pages);
  bookContainer.append(newCard.getCard())
  toggleModal();
})

myLibrary.forEach((item) => {
  const newCard = new Card();
  newCard.setInfo(item.title, item.author, item.pages);
  bookContainer.append(newCard.getCard())
})