let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

function Book(name, author, desc, read) {
  //object
  this.name = name;
  this.author = author;
  this.desc = desc;
  this.read = read;
}

const itemEntryForm = document.getElementById('my-form');

itemEntryForm.addEventListener("submit", (event) => {
  event.preventDefault(); //prevent default from submission
  processSubmission(); //process the data from form
  clearDisplay(); //clear prev elements
  displayLibrary(); //display the library
  this.reset();
});

//extract new book details
function processSubmission() {
  addBookToLibrary(new Book(itemEntryForm.name.value,itemEntryForm.author.value,itemEntryForm.desc.value,itemEntryForm.read.checked))
}
//add new book to library
function addBookToLibrary(input) {
  myLibrary.push(input);
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

//clear display
function clearDisplay(){
  const myNode = document.getElementById("listItems");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
}

//display library
function displayLibrary() {
  myLibrary.forEach(book=>addLibrary(book))
}
//add book detail
function addLibrary(book) {
  const div = document.createElement('div');
  div.classList.add('listItem');

  const titleP = document.createElement('p');
  titleP.classList.add('title-p');
  titleP.textContent = `${book.name}`
  div.appendChild(titleP);

  const authorP = document.createElement('p');
  authorP.classList.add('author-p');
  authorP.textContent = `by- ${book.author}`
  div.appendChild(authorP);

  const descP = document.createElement('p');
  descP.classList.add('desc-p')
  descP.textContent = `${book.desc}`
  div.appendChild(descP);

  const btnRead = document.createElement('button');
  btnRead.classList.add(`${book.read ? 'completed' : 'notCompleted'}`);
  btnRead.addEventListener('click',()=>{toggleBookRead(book.name);})
  btnRead.textContent = `${book.read ? 'Completed' : 'Not Completed'}`
  div.appendChild(btnRead);

  const btnRemove = document.createElement('button');
  btnRemove.classList.add('remove')
  btnRemove.addEventListener('click',()=>{removeBookFromLibrary(book.name);})
  btnRemove.textContent = 'Remove Book'
  div.appendChild(btnRemove);
  
  document.getElementById('listItems').appendChild(div);
}

function toggleBookRead(bookname) {
  for(i=0;i<myLibrary.length;i++){
    if(myLibrary[i].name == bookname){
      myLibrary[i].read = !myLibrary[i].read;
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));//event delegation
    }
  }
  clearDisplay();
  displayLibrary();
}

//remove book from library
function removeBookFromLibrary(bookname) {
  for(i=0;i<myLibrary.length;i++){
    if(myLibrary[i].name == bookname){
      myLibrary.splice(i,1);
    }
  }
  clearDisplay();
  displayLibrary();
}

displayLibrary();