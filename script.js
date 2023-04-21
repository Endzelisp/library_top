const newBookBtn = document.querySelector('div.wrapper > header > button')
const bookContainer = document.querySelector('div.wrapper > main')

const modalForm = document.querySelector('div.form-modal')
const addBookBtn = modalForm.querySelector('form > button')
const closeModal = modalForm.querySelector('form > span')

const formFieldset = modalForm.querySelector('form > fieldset')
const titleInput = formFieldset.querySelector('input[id="book-title"]')
const authorInput = formFieldset.querySelector('input[id="book-author"]')
const pagesInput = formFieldset.querySelector('input[id="book-pages"]')

const svgTrashCanIcon = `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,
            19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />`

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

function card(object) {
  const sectionEl = document.createElement('section')
  const headerEl = document.createElement('h2')
  const authorEl = document.createElement('p')
  const pagesEl = document.createElement('p')
  const footerEl = document.createElement('footer')
  const isReadBtn = document.createElement('button')
  headerEl.innerText = object.title
  authorEl.innerText = `Author: ${object.author}`
  pagesEl.innerText = `Pages: ${object.pages}`
  footerEl.append(isReadBtn)
  footerEl.innerHTML += svgTrashCanIcon
  sectionEl.append(headerEl, authorEl, pagesEl, footerEl)
  sectionEl.classList.add('book-card')
  return sectionEl
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
