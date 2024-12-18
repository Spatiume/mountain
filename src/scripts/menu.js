const smoothLinks = document.querySelectorAll('.menu__link');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('moveto');

        document.querySelector(`#\\3${id}`).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};