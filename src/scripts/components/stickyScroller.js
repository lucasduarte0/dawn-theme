import StickySidebar from "sticky-sidebar-v2";

if(document.querySelector(".sticky__scroller") !== null){
    const $stickies = document.querySelectorAll(".sticky__scroller-wrap") 
    $stickies.forEach($sticky => {
        const topSpacing = parseInt($sticky.getAttribute("data-top-spacing"))
        if($sticky.closest(".sticky__parent").clientHeight > 500){
            new StickySidebar($sticky, {
                topSpacing: topSpacing,
                bottomSpacing: 60,
                resizeSensor: true,
                containerSelector: ".sticky__parent",
                innerWrapperSelector: ".sticky__scroller",
            });
        }
    });
}