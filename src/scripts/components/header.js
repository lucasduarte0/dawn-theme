import Headspace from "headspace";
import disableScroll from 'disable-scroll';

const $headerWrap = document.querySelector('.header-wrap')
const $header = document.querySelector('header')
const $mobileMenu = document.querySelector('.header__mobile-menu');
const $nav = document.querySelector('nav')
const $hamburger = document.getElementById('hamburger');
const $hamburgerClose = document.getElementById('hamburger-close');

//DROPDOWNS
const $headerOverlay = document.querySelector('.header__overlay');
const $headerNav = $header.querySelector('.header nav').children;
const navChildren = [...$headerNav]
const $shopLink = document.getElementById('header-shop-link');
const $searchLinks = document.querySelectorAll('.header-search-link');
const $headerMain = $header.querySelector('.header__main');
const $headerMainLinks = $headerMain.querySelectorAll(".header__link");
let headerHeight = $headerMain.offsetHeight;
const $headerShopCats = $header.querySelector('.header__categories');
const $headerSearch = $header.querySelector('.header__search');
const $headerMenu = $header.querySelector('.header__menu');
const $headerTopMenu = $header.querySelector('.header__menu-top');
const $headerMenuLinks = $headerMenu.querySelectorAll("a.header__link");
const $headerSubMenus = document.querySelectorAll('.header__submenu');
const $headerLinksWithSubmenu = $header.querySelectorAll('a.has-submenu');

const openDropdown = (a, b) => {
    navChildren.forEach((el, i) => {
        if (i !== 0) {
            el.classList.remove("active")
            setTimeout(() => {
                el.style.left = "-9999px";
            }, 25);
        }
    });
    if (a !== null) {
        a.classList.add("active");
    }
    if ( b !== null) {
        setTimeout(() => {
            b.style.left = "0px";
        }, 50);
        setTimeout(() => {
            b.classList.add("active")
        }, 75);
    }
    setTimeout(() => {
        $headerWrap.style.height = headerHeight + b.offsetHeight + 2 + "px";
        $header.style.height = headerHeight + b.offsetHeight + 2 + "px";
        $headerOverlay.classList.add("active");
        $header.classList.add("dropdown-open");
    }, 50);
}
const closeDropdown = (a, b) => {
    if (a !== null) {
        a.classList.remove("active");
    }
    if (b !== null) {
        b.classList.remove("active")
        setTimeout(() => {
            b.style.left = "0px";
        }, 25);
    }
    setTimeout(() => {
        if(document.querySelector(".announcement-bar") !== null){
            const announcementBarHeight = document.querySelector(".announcement-bar").offsetHeight
            $headerWrap.style.height = headerHeight + announcementBarHeight + 2 + "px";
            $header.style.height = headerHeight + announcementBarHeight + 2 + "px";
        } else {
            $headerWrap.style.height = headerHeight + "px";
            $header.style.height = headerHeight + "px";
        }
        $headerOverlay.classList.remove("active");
        $header.classList.remove("dropdown-open");
    }, 50);
}

//MAIN SHOP LINK
if ($shopLink !== null && $headerShopCats !== null) {
    const handleShopLink = e => {
        if(window.isTouchScreen()){
            e.preventDefault()
        }
        if (!$headerShopCats.classList.contains("active")) {
            setTimeout(() => {
                // closeMenu()
                openDropdown($shopLink, $headerShopCats)
            }, 51);
        }        
    }
    ['mouseover', 'click'].forEach( evt => {
        $shopLink.addEventListener(evt, handleShopLink, false)
    });      
    if(!window.isTouchScreen()){
        $header.addEventListener("mouseleave", () => {
            closeDropdown($shopLink, $headerShopCats)
        }, false)
    }
}

//HEADER LINKS
$headerMainLinks.forEach($link => {
    const handleMainLinks = () => {
        if ($headerSearch.classList.contains("active")) {
            $searchLinks.forEach($searchLink => {
                closeDropdown($searchLink, $headerSearch)
            });
        }
        if ($headerShopCats.classList.contains("active")) {
            closeDropdown($shopLink, $headerShopCats)
        }     
        
        setTimeout(() => {
            if($header.classList.contains("header__wordmark") || $header.classList.contains("header__wordmark-brown")){
                $headerWrap.style.height = "160px";
                $header.style.height = "160px";
            } else {
                $headerWrap.style.height = "135px";
                $header.style.height = "135px";
            }
            $headerOverlay.classList.add("active");
            $header.classList.add("dropdown-open");
            $headerMenu.classList.remove("active")
            $hamburger.classList.add("active")
            $hamburgerClose.classList.remove("active")
        }, 50);             
    }
    ['mouseover', 'click'].forEach( evt => {
        $link.addEventListener(evt, handleMainLinks, false)
    });    
})
$headerMenuLinks.forEach($link => {

    const handleHeaderMenuLinks = () => {
        $headerTopMenu.style.height = "auto";
        $headerMenuLinks.forEach($link => {
            $link.classList.remove("active")
        });
        if (!$link.classList.contains("has-submenu")) {
            if ($headerSubMenus !== null) {
                $headerWrap.style.height = headerHeight + $headerMenu.offsetHeight + "px";
                $header.style.height = headerHeight + $headerMenu.offsetHeight + "px";
                $headerSubMenus.forEach($submenu => {
                    $submenu.classList.remove("active")
                });
            }
        }        
    }
    ['mouseover', 'click'].forEach( evt => {
        $link.addEventListener(evt, handleHeaderMenuLinks, false)
    });  

});
if ($headerLinksWithSubmenu !== null) {
    $headerLinksWithSubmenu.forEach($link => {
        const $subMenu = $link.nextElementSibling;
        let currentHeaderHeight;
        const handleSubMenuLinks = e => {
            if(window.isTouchScreen()){
                e.preventDefault()
            }
            currentHeaderHeight = $header.offsetHeight;
            $headerTopMenu.style.height = "auto";
            const subMenuHeight = $subMenu.offsetHeight;
            if (!$subMenu.classList.contains("active")) {
                setTimeout(() => {
                    $headerTopMenu.style.height = subMenuHeight + "px";
                    $headerWrap.style.height = currentHeaderHeight + subMenuHeight + "px";
                    $header.style.height = currentHeaderHeight + subMenuHeight + "px";
                }, 100);
            } else {
                setTimeout(() => {
                    $headerWrap.style.height = currentHeaderHeight + "px";
                    $header.style.height = currentHeaderHeight + "px";
                }, 100);
            }
            setTimeout(() => {
                $link.classList.add("active")
                $subMenu.classList.add("active")
            }, 125);
        }
        ['mouseover', 'click'].forEach( evt => {
            $link.addEventListener(evt, handleSubMenuLinks, false)
        });          
    });
}

//MAIN SEARCH LINK
if ($searchLinks !== null && $headerSearch !== null) {
    $searchLinks.forEach($searchLink => {
        const handleSearchLinks = () => {
            if (!$headerSearch.classList.contains("active")) {
                // closeMenu()
                // UPDATE FOCUS
                // create invisible dummy input to receive the focus first
                const fakeInput = document.createElement('input')
                fakeInput.setAttribute('type', 'text')
                fakeInput.style.position = 'absolute'
                fakeInput.style.opacity = 0
                fakeInput.style.height = 0
                fakeInput.style.fontSize = '16px' // disable auto zoom
                // you may need to append to another element depending on the browser's auto 
                // zoom/scroll behavior
                document.querySelector('.header').prepend(fakeInput)
                // focus so that subsequent async focus will work
                fakeInput.focus()
                setTimeout(() => {
                    // now we can focus on the target input
                    document.querySelector(".header__search input").focus()
                    // cleanup
                    fakeInput.remove()
                }, 300)            
                openDropdown($searchLink, $headerSearch)
                $mobileMenu.style.display = "none"
            }            
        }
        ['mouseover', 'click'].forEach( evt => {
            $searchLink.addEventListener(evt, handleSearchLinks, false)
        }); 
        $header.addEventListener("mouseleave", () => {
            if(!document.querySelector("body").classList.contains("menu-is-open")){
                closeDropdown($searchLink, $headerSearch)
            }
        }, false)
    });
}

// HAMBURGER
const openMenu = () => {
    $hamburger.classList.remove("active")
    $mobileMenu.style.display = "block"
    openDropdown($hamburgerClose, $headerMenu)
    if ($shopLink !== null) {
        $shopLink.classList.remove("active")
    }
}
const closeMenu = () => {
    $hamburger.classList.add("active")
    $mobileMenu.style.display = "block"
    $headerMenuLinks.forEach($link => {
        $link.classList.remove("active")
    });
    if ($shopLink !== null) {
        $shopLink.classList.remove("active")
    }
    if ($headerShopCats !== null) {
        $headerShopCats.classList.remove("active")
    }
    if ($headerSubMenus !== null) {
        $headerTopMenu.style.height = "auto";
        $headerSubMenus.forEach($submenu => {
            $submenu.classList.remove("active")
        });
    }
    document.querySelectorAll(".header__link.toggle-trigger").forEach($link => {
        setTimeout(() => {
            if($link.classList.contains("active")){
                $link.classList.remove("active")
            }
        }, 150);
    })
    closeDropdown($hamburgerClose, $headerMenu)
    if(document.querySelector("body").classList.contains('menu-is-open')){
        document.querySelector("body").classList.remove("menu-is-open")
    }
}
$hamburger.addEventListener("click", () => {
    openMenu();
    $headerWrap.style.position = "fixed";
    document.querySelector("body").classList.add("menu-is-open")
})
$hamburgerClose.addEventListener("click", () => {
    $searchLinks.forEach($searchLink => {
        closeDropdown($searchLink, $headerSearch)
    });    
    closeMenu()
    $headerWrap.style.position = "absolute";
})
if(!window.isTouchScreen()){
    $header.addEventListener("mouseleave", closeMenu)
    $headerOverlay.addEventListener("mouseenter", closeMenu)
}

const resizeWindow = () => {
    setTimeout(() => {
        if(document.querySelector("body").classList.contains("menu-is-open")){
            closeMenu()
            closeDropdown()
        }
    }, 300);
    headerHeight = $headerMain.offsetHeight;
    document.querySelectorAll('.header__menu .toggle-trigger').forEach($trigger => {
        $trigger.classList.remove("active")
    });
    if(document.querySelector(".hero") !== null){
        if(document.querySelector(".announcement-bar") !== null){
            const announcementBarHeight = document.querySelector(".announcement-bar").offsetHeight
            document.querySelector(".hero").style.paddingTop = headerHeight + announcementBarHeight + "px"
        } else {
            document.querySelector(".hero").style.paddingTop = headerHeight + "px"
        }
    }
    if(document.querySelector(".announcement-bar") !== null){
        const announcementBarHeight = document.querySelector(".announcement-bar").offsetHeight
        $headerWrap.style.height = headerHeight + announcementBarHeight + 2 + "px";
        $header.style.height = headerHeight + announcementBarHeight + 2 + "px";
        $mobileMenu.style.marginTop = headerHeight + announcementBarHeight + "px";
    } else {
        $headerWrap.style.height = headerHeight + "px";
        $header.style.height = headerHeight + "px";
        $mobileMenu.style.marginTop = headerHeight + "px";
    }    
}

resizeWindow()

window.addEventListener("resize", resizeWindow, true)

// SCROLLING HEADER
Headspace($header, {
    startOffset: headerHeight,
    tolerance: 15,
    showAtBottom: false,
    classNames: {
      base: 'absolute',
      fixed: 'swiped-down',
      hidden: 'swiped-up'  
    }
})