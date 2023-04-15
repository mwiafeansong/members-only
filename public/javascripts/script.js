const menuBtn = document.querySelector('.menu-btn');
const aside = document.querySelector('aside');
const closeBtn = document.querySelector('.close-btn');

menuBtn.addEventListener('click', () => {
  aside.classList.remove('invisible');
  aside.classList.add('visible');
  menuBtn.style.pointerEvents = 'none';
});

closeBtn.addEventListener('click', () => {
  aside.classList.remove('visible');
  aside.classList.add('invisible');
  menuBtn.style.pointerEvents = 'all';
});
