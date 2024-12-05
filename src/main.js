import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/skills";

document.querySelector('.hamburger-menu').addEventListener('click', addFullScreenMenu);

function addFullScreenMenu() {
  let menu = document.querySelector('.full-screen-menu');
  let closeBtn = menu.querySelector('.full-screen-menu__close');
  let links = menu.querySelectorAll('.menu__link');

  openFullScreenMenu();

  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeFullScreenMenu()
  })

  links.forEach(item => {
    item.addEventListener('click', (e) => {
      closeFullScreenMenu()
    })
  })

  function openFullScreenMenu() {
    menu.classList.add('full-screen-menu--active');
    document.body.style.overflow = "hidden";
    document.addEventListener('click', checkClickOutsideFullScreenMenu);
  }

  function closeFullScreenMenu() {
    document.querySelector('.full-screen-menu').classList.remove('full-screen-menu--active');
    document.body.style.overflow = "";
    document.removeEventListener('click', checkClickOutsideFullScreenMenu);
  }

  function checkClickOutsideFullScreenMenu() {
    if (!event.target.closest('.full-screen-menu') && !event.target.closest('.hamburger-menu')) {
      closeFullScreenMenu();
    }
  }
}