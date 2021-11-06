var headerBg = document.getElementById('sec1');

window.addEventListener('scroll', function(){
    headerBg.style.opacity = 1 - +window.pageYOffset/450+'';
});