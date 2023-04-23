const newBookBtn = document.querySelector('[data-button="new-book"]')
const bookContainer = document.querySelector('[data-container="main"]')
const templateBookCard = document.querySelector('[data-template="book-card"]')

const modalForm = document.querySelector('div.form-modal')
const addBookBtn = modalForm.querySelector('form > button')
const closeModal = modalForm.querySelector('form > span')

const formFieldset = modalForm.querySelector('form > fieldset')
const titleInput = formFieldset.querySelector('input[id="book-title"]')
const authorInput = formFieldset.querySelector('input[id="book-author"]')
const pagesInput = formFieldset.querySelector('input[id="book-pages"]')

class Book {
  title
  author
  pages
  isRead = false
  constructor(title, author, pages) {
    this.title = title
    this.author = author
    this.pages = pages
  }
}

function card({ title, author, pages }) {
  const newCard = templateBookCard.content.cloneNode(true)
  const headerEl = newCard.querySelector('[data-info="title"]')
  const authorEl = newCard.querySelector('[data-info="author"]')
  const pagesEl = newCard.querySelector('[data-info="pages"]')
  headerEl.textContent = title
  authorEl.textContent = `Author: ${author}`
  pagesEl.textContent = `Pages: ${pages}`
  return newCard.querySelector('section')
}

function isRead(card, book) {
  /* isRead function reads the isRead property of the Book object to set the
  card isReadBtn */

  const button = card.querySelector('button')
  const isReadColor = {
    yes: `#4ad956`,
    not: `#d45044`,
  }
  if (book.isRead) {
    button.innerText = `Read`
    button.style.backgroundColor = isReadColor.yes
  } else {
    button.innerText = `Not Read`
    button.style.backgroundColor = isReadColor.not
  }
  button.addEventListener('pointerdown', () => {
    if (button.innerText === `Read`) {
      button.innerText = `Not Read`
      button.style.backgroundColor = isReadColor.not
      book.isRead = false
    } else if (button.innerText === `Not Read`) {
      button.innerText = `Read`
      button.style.backgroundColor = isReadColor.yes
      book.isRead = true
    }
  })
}

function indexNodeList(selector) {
  const nodeList = document.querySelectorAll(selector)
  nodeList.forEach((item, index) => {
    item.setAttribute('data-index', index)
  })
}

function setTrashCan(card, arr) {
  /* Gives functionality to trash can icon on each card */

  const trashCan = card.querySelector('svg')
  trashCan.addEventListener('pointerdown', () => {
    arrIndexToDelete = card.getAttribute('data-index')
    arr.splice(arrIndexToDelete, 1)
    card.remove()
  })
}

function toggleModal() {
  modalForm.classList.toggle('visible')
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
]

newBookBtn.addEventListener('pointerdown', toggleModal)

closeModal.addEventListener('pointerdown', toggleModal)

addBookBtn.addEventListener('pointerdown', function () {
  const newEntry = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value
  )
  myLibrary.push(newEntry)
  const newCard = card(newEntry)
  isRead(newCard, newEntry)
  bookContainer.append(newCard)
  setTrashCan(newCard, myLibrary)
  indexNodeList('main > section.book-card')
  titleInput.value = ''
  authorInput.value = ''
  pagesInput.value = null
  toggleModal()
})

bookContainer.addEventListener('pointerdown', () => {
  indexNodeList('main > section.book-card')
})

myLibrary.forEach((item, index) => {
  const newCard = card(item)
  isRead(newCard, item)
  bookContainer.append(newCard)
  newCard.setAttribute('data-index', index)
  setTrashCan(newCard, myLibrary)
})
