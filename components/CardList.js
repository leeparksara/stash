import { addNewBookmark } from './NewBookmark.js';
import { renderBookmarkForm } from './BookmarkForm.js';
import { createDeleteButton } from './DeleteOneItem.js';
import { deleteBookmark, loadBookmarks } from './Storage.js';

let currentOnSave = null;
// Tracking current category for back button
export function renderCardList(categoryId, bookmarks, onSave) {
    const form = document.getElementById('bookmark-form');
  const cardListContainer = document.querySelector('.card-list-container');
  const container = document.querySelector('.container');
  
  const categories = document.querySelector('.category-container');
  cardListContainer.innerHTML = '';

 const cardListBackBtn = document.createElement('button');
 cardListBackBtn.classList.add('back-btn');
 cardListBackBtn.textContent = '←';


 cardListBackBtn.addEventListener('click', ()=>{
  categories.style.visibility='visible';
categories.style.marginTop= '4rem'
  container.style.display = 'flex';

  cardListContainer.style.display ='none'
  form.style.display ='none';

  
 })
 cardListContainer.appendChild(cardListBackBtn);
 
  currentOnSave = onSave;

  const categoryLabel = document.createElement('h2');
  categoryLabel.textContent = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
  categoryLabel.classList.add('category-label');
  cardListContainer.appendChild(categoryLabel);

  const filtered = bookmarks.filter(b => b.categoryId === categoryId);
  filtered.forEach(b => {
    const card = document.createElement('div');
    card.classList.add('list-card');
    card.innerHTML = `
      ${b.imageData ? `<img src="${b.imageData}" alt="${b.titleInput}" />` : ''}
      <h3>${b.titleInput}</h3>
    `;
    card.addEventListener('click', () => {
      displayBookmarkDetails(b);
        const cardListContainer = document.querySelector('.card-list-container');
        
      cardListContainer.style.display ='none'
    });
    cardListContainer.appendChild( card);
  });

  // Show New Bookmark button only if there saved cards 
  if (filtered.length > 0){
    const newBookmarkButton = addNewBookmark(categoryId, onSave);
    newBookmarkButton.style.order = '999'; 
    cardListContainer.style.display = 'flex';
    cardListContainer.style.flexDirection = 'column'; 
    cardListContainer.appendChild(newBookmarkButton);
    form.style.display = 'none';

    } else {
      // If no cards saved I want to show the form to create first bookmark
      form.style.display = 'flex';
      cardListContainer.style.display = 'none';
      renderBookmarkForm(categoryId, onSave);
    }
}











function displayBookmarkDetails(item) {
  const lists = document.querySelector('.lists');
  const container = document.querySelector('.container');


  
  lists.innerHTML = `
    <li>
      <h3>${item.titleInput}</h3>
      <a href="${item.urlInput}" target="_blank">${item.urlInput}</a>
      <p>${item.description}</p>
      ${item.imageData ? `<img src="${item.imageData}" alt="${item.titleInput}" />` : ''}
    </li>

  `;

  // append delete button to remove this item and re render saved cards if there is any
  const delBtn = createDeleteButton(item.titleInput, (title) => {
    deleteBookmark(title);
    const refreshed = loadBookmarks();
    renderCardList(item.categoryId, refreshed, currentOnSave);
    lists.innerHTML = '';
  });
  lists.appendChild(delBtn);

  if (window.listBackButton && typeof window.listBackButton === 'function') {
    window.listBackButton(() => {
      lists.innerHTML = ''; 
      const cardListContainer = document.querySelector('.card-list-container');
      cardListContainer.style.display = 'flex'; 
      renderCardList(item.categoryId, loadBookmarks(), currentOnSave);
    });
  } 

}


function listBackButton(onBackClick) {

  const lists = document.querySelector('.lists');
  const backBtn = document.createElement('button');
  backBtn.classList.add('back-btn');
  backBtn.textContent = '←';
  backBtn.addEventListener('click', onBackClick);
  lists.insertBefore(backBtn, lists.firstChild);
}




// The components can call window.addBackButton
window.listBackButton = listBackButton;




