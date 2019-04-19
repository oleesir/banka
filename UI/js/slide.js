document.addEventListener('click', (event) => {
  if (event.target.matches('.menu')) {
    document.querySelector('.side-column').style.transform = 'translateX(0)';
    document.querySelector('.side-column').style.transition = 'transform 0.5s';
  }

  if (event.target.matches('.close')) {
    document.querySelector('.side-column').style.transform = 'translateX(-302px)';
    document.querySelector('.side-column').style.transition = 'transform 0.5s';
  }
});

window.onresize = function resizer() {
  if (window.innerWidth > 992) {
    document.querySelector('.side-column').style.transform = 'translateX(0)';
    document.querySelector('.side-column').style.transition = 'transform 0.5s';
  }

  if (window.innerWidth < 991.98) {
    document.querySelector('.side-column').style.transform = 'translateX(-302px)';
    document.querySelector('.side-column').style.transition = 'transform 0.5s';
  }
};
