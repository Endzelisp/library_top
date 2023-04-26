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

const myLibrary = [
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

/**
 * Create an object with detailed info about a book
 * @class
 */
class Book {
  title
  author
  pages
  isRead = false

  /**
   * @param { string } title Book's title
   * @param { string } author Book's title
   * @param { number } pages Number of pages the book have
   * @param { boolean } isRead describe if the book is already read or not
   */
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

/**
 * Reads the isRead property of a Book instance
 * to set the card button that shows if the book
 * is already read and allow to toggle the state
 * @param { HTMLElement } card
 * @param { Object } book
 */
function setIsReadBtn(card, book) {
  const button = card.querySelector('button')

  function toggleRead() {
    const isRead = this.dataset.read === 'true' ? true : false
    if (!isRead) {
      button.textContent = 'Read'
      button.classList.add('is-read')
      this.dataset.read = 'true'
      book.isRead = true
      return
    }
    button.textContent = 'Not Read'
    button.classList.remove('is-read')
    this.dataset.read = 'false'
    book.isRead = false
  }

  button.addEventListener('pointerdown', toggleRead.bind(card))

  if (!book.isRead) {
    button.textContent = 'Not Read'
    card.dataset.read = 'false'
    return
  }
  button.textContent = 'Read'
  button.classList.add('is-read')
  card.dataset.read = 'true'
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
  setIsReadBtn(newCard, newEntry)
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
  setIsReadBtn(newCard, item)
  bookContainer.append(newCard)
  newCard.setAttribute('data-index', index)
  setTrashCan(newCard, myLibrary)
})
