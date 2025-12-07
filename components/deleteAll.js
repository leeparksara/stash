import { deleteAllBookmarks } from "./Storage";


export function createDeleteAllButton() {
  const cardListContainer = document.querySelector('.card-list-container');
    const deleteAllBtn = document.createElement('button');
    deleteAllBtn.textContent = 'Delete all';
    deleteAllBtn.classList.add('delete-all-btn');
  
    deleteAllBtn.addEventListener('click', ()=>{
      deleteAllBookmarks();
      cardListContainer.innerHTML = '';
     
    });
    
    return deleteAllBtn;
}
