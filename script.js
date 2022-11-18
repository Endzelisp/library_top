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

function card (title, author, pages) {
  const sectionEl = document.createElement('section');
  const headerEl = document.createElement('h2');
  const authorEl = document.createElement('p');
  const pagesEl = document.createElement('p');
  const footerEl = document.createElement('footer');
  const isReadBtn = document.createElement('button');
  headerEl.innerText = title;
  authorEl.innerText = `Author: ${author}`;
  pagesEl.innerText = `Pages: ${pages}`;
  footerEl.append(isReadBtn);
  footerEl.innerHTML += `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />`
  sectionEl.append(headerEl, authorEl, pagesEl, footerEl);
  sectionEl.classList.add('book-card');
  return sectionEl;
}

function Book (title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = false;
}

myLibrary = [
  {
    title: 'Travels with Puff',
    author: 'Richard Bach',
    pages: 222,
    isRead: true,
  },
  {
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    pages: 163,
    isRead: false,
  },
  {
    title: 'JavaScript The Definitive Guide',
    author: 'David Flanagan',
    pages: 1245,
    isRead: false,
  },
];

addBookBtn.addEventListener('pointerdown', function () {
  const newEntry = new Book(titleInput.value, authorInput.value, pagesInput.value);
  myLibrary.push(newEntry);
  const newCard = card(newEntry.title, newEntry.author, newEntry.pages);
  bookContainer.append(newCard)
  toggleModal();
})

myLibrary.forEach((item) => {
  const newCard = card(item.title, item.author, item.pages);
  bookContainer.append(newCard)
})