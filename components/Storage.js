// Load bookmarks from localStorage
export function loadBookmarks() {
  const stored = JSON.parse(localStorage.getItem('bookmarks')) || [];
  return stored;
}

// Save bookmark to localStorage so it  doesnt disappear when the user refresh the website
export function saveBookmark(bookmark) {
  const bookmarks = loadBookmarks();
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Delete bookmark from localStorage
export function deleteBookmark(title) {
  let bookmarks = loadBookmarks();
  bookmarks = bookmarks.filter(item => item.titleInput !== title);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Get bookmarks by category
export function getBookmarksByCategory(categoryId, bookmarks) {
  return bookmarks.filter(b => b.categoryId === categoryId);
}
