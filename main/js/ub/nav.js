// Add transition class to body on load
document.body.classList.add('notransition');

// Remove transition class from body after load
document.addEventListener('load', () => {
  document.body.classList.remove('notransition');
});

// Get elements
const menuIcon = document.querySelector('.hamburger');
const menuBtn = document.querySelector('#menuBtn');
const navbar = document.querySelector('.navbar');
const links = document.querySelector('.pages');
const linkBtns = document.querySelectorAll('.page-link');
const centeredStuff = document.querySelector('.center');
const dropdown = document.querySelector('.dropdown');
const dropdownLinks = document.querySelector('.dropdown-links');

// Get navbar height
const navbarHeight = getComputedStyle(navbar).height;

// Set menu icon position
const setMenuIconPosition = () => {
  const linkHeight = linkBtns[0].clientHeight * 3;
  const offset = (navbarHeight - linkHeight) / 2 - 13;
  menuIcon.style.top = `${offset}px`;
};

// Set menu icon position using requestAnimationFrame
requestAnimationFrame(setMenuIconPosition);

// Toggle menu
const toggleMenu = () => {
  if (menuBtn.textContent.trim() !== 'close') {
    menuBtn.textContent = 'close';
  } else {
    menuBtn.textContent = 'menu';
  }

  linkBtns.forEach(btn => btn.classList.toggle('show'));
};

menuIcon.addEventListener('click', toggleMenu);

// Toggle dropdown
const toggleDropdown = () => {
  dropdownLinks.style.display = 'block';
  dropdownLinks.style.opacity = '1';
  dropdownLinks.style.animation = 'dropdownFadeIn 0.4s';
};

const hideDropdown = () => {
  dropdownLinks.style.opacity = '0';
  dropdownLinks.style.animation = 'dropdownFadeOut 0.3s';
};

const removeDropdown = () => {
  dropdownLinks.style.display = 'none';
};

dropdown.addEventListener('mouseover', toggleDropdown);
dropdown.addEventListener('mouseout', hideDropdown);

// Listen for animationend event
dropdownLinks.addEventListener('animationend', () => {
  if (dropdownLinks.style.opacity === '0') {
    removeDropdown();
  }
});

// Encode URL
const encodeUrl = str => {
  if (!str) return str;
  return encodeURIComponent(
    str.split('')
      .map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char)
      .join('')
  );
};

// Update links
const updateLinks = () => {
  const quickLinkDetails = localStorage.getItem('quickLinkDetails');

  if (!quickLinkDetails) {
    return;
  }

  const linksArray = JSON.parse(quickLinkDetails);

  if (linksArray.length === 0) {
    dropdownLinks.innerHTML = `
      <a href="settings.html">
        <span class="material-symbols-outlined" style="font-size:14px;">add_circle</span>&nbsp;

