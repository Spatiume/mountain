document.querySelector('.hamburger-menu').addEventListener('click', addFullScreenMenu);

function autoGrow(el) {
  console.log('d')
  el.style.height = '5px';
  el.style.height = el.scrollHeight + 'px';
}

// Эту функцию следует привязать к событию 'input'
document.querySelector('.form-block__textarea').addEventListener('input', function() {
  autoGrow(this);
});



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
    document.addEventListener('click', checkClickOutsideFullScreenMenu);
    disableScroll();
  }

  function disableScroll() {
    let clietnWidthBefore = document.body.clientWidth;
    document.body.style.overflow = "hidden";
    let clietnWidthAfter = document.body.clientWidth;
    let difference = clietnWidthAfter - clietnWidthBefore;

    if (difference >= 0) document.body.style.paddingRight = `${difference}px`;
  }
  function enableScroll() {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }

  function closeFullScreenMenu() {
    document.querySelector('.full-screen-menu').classList.remove('full-screen-menu--active');
    enableScroll();
    document.removeEventListener('click', checkClickOutsideFullScreenMenu);
  }

  function checkClickOutsideFullScreenMenu() {
    if (!event.target.closest('.full-screen-menu') && !event.target.closest('.hamburger-menu')) {
      closeFullScreenMenu();
    }
  }
}