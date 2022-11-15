import Flickity from "flickity-imagesloaded";
import wheel from 'wheel';
import normalizeWheel from 'normalize-wheel';

var tapArea, startX ;
tapArea = document.querySelectorAll('.carousel');
startX = 0;
for (var item of tapArea) {

    if(!item.classList.contains("md:overflow-auto")){

        item.ontouchstart = function(e) {
            startX = e.touches[0].clientX;
        };
        item.ontouchmove = function(e) {
            if (Math.abs(e.touches[0].clientX - startX) > 5 && e.cancelable ) {
                e.preventDefault();
            }
        };
    }
}

if(document.querySelector(".shop-all .carousel") !== null){
    const shopAllCarousel = new Flickity('.shop-all .carousel', {
        freeScroll: true,
        cellAlign: "left",
        imagesLoaded: true,
        prevNextButtons: false,
        pageDots: false,
        contain: false,
        watchCSS: true
    });
}