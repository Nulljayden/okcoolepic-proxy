// Get the search field and search button elements
const searchField = document.querySelector('#search-field');
const searchButton = document.createElement('button');

// Set the text content of the search button
searchButton.textContent = 'Search';

// Add a click event listener to the search button
searchButton.addEventListener('click', () => {
  // Simulate a keydown event on the search field with the keyCode for the 'Enter' key
  searchField.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13 }));
});

// Append the search button to the search field's parent element
searchField.parentElement.insertBefore(searchButton, searchField.nextSibling);
