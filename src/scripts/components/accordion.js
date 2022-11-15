var linkToggles = document.querySelectorAll('.toggle-trigger');

linkToggles.forEach(toggle => {
    toggle.addEventListener('click', function(event){

    event.preventDefault();

    var container = document.getElementById(this.dataset.container);

    if (!container.classList.contains('active')) {
      
      toggle.classList.add('active');
      container.classList.add('active');
      container.style.height = 'auto';

      var height = container.clientHeight + 'px';

      container.style.height = '0px';

      setTimeout(function () {
        container.style.height = height;
      }, 0);
      
    } else {
      
      container.style.height = '0px';

      toggle.classList.remove('active');
      container.classList.remove('active');
      container.addEventListener('transitionend', function () {
      }, {
        once: true
      });
      
    }
    
  }); 
});