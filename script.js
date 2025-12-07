import { renderSearchBar } from './components/searchbar.js';
import { renderCategoryList } from './components/Category.js';
//import { renderBookmarkForm } from './components/BookmarkForm.js';
import { renderCardList } from './components/cardList.js';
import { loadBookmarks, saveBookmark} from './components/storage.js';
import { createDeleteAllButton } from './components/deleteAll.js';


const container = document.querySelector('.container');
const wrapper = document.querySelector('.wrapper');
const listsContainer = document.querySelector('.lists-container');
const cardListContainer = document.querySelector('.card-list-container')
let newBookmark = loadBookmarks(); 

listsContainer.style.display ='none'
cardListContainer.style.display ='none'
function init() {
  renderSearchBar();
  renderCategoryList(onCategoryClick);
  


}



function onCategoryClick(categoryId) {

  const form = document.getElementById('bookmark-form');
  form.style.display = 'none';
  renderCardList(categoryId, newBookmark, onBookmarkSave);


  if (window.cardListBackButton && typeof window.cardListBackButton === 'function') {
    window.cardListBackButton(() => {
      const containerEl = document.querySelector('.container');
      const cardListEl = document.querySelector('.card-list-container');
      if (cardListEl) cardListEl.style.display = 'none';
      if (containerEl) {
        containerEl.style.display = 'flex';
        containerEl.innerHTML = '';
        renderCategoryList(onCategoryClick);
      }
    });
  }
}

function onBookmarkSave(bookmark) {
  newBookmark.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(newBookmark));
  renderCardList(bookmark.categoryId, newBookmark, onBookmarkSave);


}



document.addEventListener('DOMContentLoaded', init);
