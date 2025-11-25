// Search bar component
export function renderSearchBar() {
  const searchContainer = document.querySelector('.search-bar-container');
  const searchBar = document.createElement('input');
  
  searchBar.placeholder = 'Search for saved bookmarks';
  searchBar.classList.add('search');
  searchContainer.appendChild(searchBar);
  
  return searchBar;
}
