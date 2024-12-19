const parallax = document.querySelector('.parallax');

const layers = parallax.children;

function moveLayersDependsOnScroll(wScroll) {
  Array.from(layers).forEach(layer => {
    const divider = layer.dataset.speed;
    const strafe = wScroll * -divider / 15;
    layer.style.transform = `translate3d(0,${strafe}%,0)`
  })
}

if (window.innerWidth > 768) {
  window.addEventListener('scroll', e => {
    const wScroll = window.scrollY;
    moveLayersDependsOnScroll(wScroll);
  })
}
