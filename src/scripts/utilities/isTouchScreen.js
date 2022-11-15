window.isTouchScreen = () => {
    return 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

if(window.isTouchScreen()){
    document.body.classList.add("touchscreen")
}