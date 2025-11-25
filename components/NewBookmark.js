import { renderBookmarkForm } from "./BookmarkForm";

export function addNewBookmark(categoryId, onSave){

  const form = document.getElementById('bookmark-form');
  const cardListContainer = document.querySelector('.card-list-container');
  const container = document.querySelector('.container');
  
  const addBtn = document.createElement('button');
  addBtn.textContent = 'New bookmark ';
  addBtn.classList.add('add-btn');
  
  addBtn.addEventListener('click', ()=>{
    form.style.display = 'flex';
    addBtn.style.display = 'none';
    cardListContainer.style.display = 'none';
    renderBookmarkForm(categoryId, onSave);
    
  
    if (window.addBackButton && typeof window.addBackButton === 'function') {
      window.addBackButton(() => {
        form.style.display = 'none';
        form.innerHTML = '';
        addBtn.style.display = 'flex';
        cardListContainer.style.display = 'flex';
      });
    } else {
      
      const existingBackBtn = container.querySelector('.back-btn');
      if (existingBackBtn) existingBackBtn.remove();
      const backBtn = document.createElement('button');
      backBtn.classList.add('back-btn');
      backBtn.textContent = '← Back to Cards';
      backBtn.addEventListener('click', () => {
        form.style.display = 'none';
        form.innerHTML = '';
        addBtn.style.display = 'flex';
        cardListContainer.style.display = 'flex';
      });
      container.insertBefore(backBtn, container.firstChild);
    }
  });
  
  return addBtn;
}