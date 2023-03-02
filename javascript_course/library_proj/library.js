const myLibrary = [];

// Constructor for Book object
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// add info() method to Book object's prototype
Book.prototype.info = () => {
  let haveRead;
  if (this.read) {
    haveRead = 'already read';
  } else {
    haveRead = 'not read yet';
  }
  const out = `${this.title} by ${this.author}, ${this.pages} pages, ${haveRead}`;
  return out;
};

const modal = document.querySelector('.modal');
const modalCanvas = document.querySelector('.modal-canvas');
const closeBtn = document.querySelector('.close');
const addBook = document.querySelector('#add-book');
const cancelBtn = document.querySelector('#cancel-confirm');

addBook.onclick = function () {
  modalCanvas.style.display = 'block';
  modal.classList.add('active');
};

closeBtn.onclick = function () {
  modal.classList.remove('active');
  modalCanvas.style.display = 'none';
};

cancelBtn.onclick = function () {
  modal.classList.remove('active');
  modalCanvas.style.display = 'none';
};

// const test = document.querySelector('.hasreadBtn');
// test.addEventListener(
//   'click',
//   (e) => {
//     if (e.target.textContent === 'Incompleted') {
//       e.target.textContent = 'Completed';
//       e.target.style['background-color'] = 'rgba(56, 130, 246, 0.75)';
//     } else {
//       e.target.textContent = 'Incompleted';
//       e.target.style['background-color'] = 'rgba(202, 75, 29, 0.75)';
//     }
//   },
// );

const readBtnClick = (e) => {
  if (e.target.textContent === 'Incompleted') {
    e.target.textContent = 'Completed';
    e.target.style['background-color'] = 'rgba(56, 130, 246, 0.75)';
  } else {
    e.target.textContent = 'Incompleted';
    e.target.style['background-color'] = 'rgba(202, 75, 29, 0.75)';
  }
};

const gridContainer = document.querySelector('.grid-container');

const deleteBook = (e) => {
  const relBook = e.target.parentElement;
  const idx = +relBook.dataset.id;
  myLibrary.splice(idx, 1);
  gridContainer.removeChild(relBook);
};

const addBooktoGrid = (obj, idx) => {
  const newBook = document.createElement('div');
  const newXBtn = document.createElement('span');
  const newTitle = document.createElement('h3');
  const newAuthor = document.createElement('h3');
  const newpgAmnt = document.createElement('h3');
  const newHasread = document.createElement('button');

  newBook.setAttribute('data-id', `${idx}`);
  newBook.classList.add('book');

  newXBtn.classList.add('deleteBook');
  newXBtn.textContent = '×';
  newXBtn.addEventListener('click', deleteBook);
  newBook.appendChild(newXBtn);

  newTitle.textContent = `${obj.title}`;
  newBook.appendChild(newTitle);

  newAuthor.textContent = `By ${obj.author}`;
  newBook.appendChild(newAuthor);

  newpgAmnt.textContent = `${obj.pages} page(s)`;
  newBook.appendChild(newpgAmnt);

  newHasread.addEventListener('click', readBtnClick);
  newHasread.classList.add('hasreadBtn');
  if (obj.read) {
    newHasread.textContent = 'Completed';
    newHasread.style['background-color'] = 'rgba(56, 130, 246, 0.75)';
  } else {
    newHasread.textContent = 'Incompleted';
    newHasread.style['background-color'] = 'rgba(202, 75, 29, 0.75)';
  }
  newBook.appendChild(newHasread);
  gridContainer.appendChild(newBook);
};
const form = document.querySelector('.addbookForm');
const addBtn = document.querySelector('#add-confirm');

const addBookfromForm = () => {
  const title = form.childNodes[3].value;
  const author = form.childNodes[6].value;
  const pages = form.childNodes[9].value;
  const read = form.childNodes[12].childNodes[3].checked;

  const BrandNewBook = new Book(title, author, pages, read);
  form.childNodes[3].value = '';
  form.childNodes[6].value = '';
  form.childNodes[9].value = '';
  form.childNodes[12].childNodes[3].checked = false;
  myLibrary.push(BrandNewBook);
  addBooktoGrid(BrandNewBook, myLibrary.length - 1);
  modal.classList.remove('active');
  modalCanvas.style.display = 'none';
};

addBtn.addEventListener('click', addBookfromForm);

// const test = document.querySelector('.addbookForm');
// title: test.childNodes[3].value
// author: test.childNodes[6].value
// pages: test.childNodes[9].value
// checkbox: test.childNodes[12].childNodes[3].checked (true or false)

// const firstBook = new Book('Francis of the Filth', 'George Miller', 254, false);
// myLibrary.push(firstBook);

// const testBook = myLibrary[0];

// addBooktoGrid(testBook, 0);

/*
<div data-id="0" class="book">
  <span class="deleteBook">&times;</span>
  <h3>Francis of the Filth</h3>
  <h3>George Miller</h3>
  <h3>254 Pages</h3>
  <button class="hasreadBtn">Incompleted</button>
</div>
*/

// const checkbox = document.querySelector('.checkbox');
// checkbox.checked
