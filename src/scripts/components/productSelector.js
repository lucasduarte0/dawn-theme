import {
    triggerEvent
} from "../utilities/triggerEvents";
import {
    wrapEl
} from "../utilities/wrapEl";
import {
    indexInParent
} from "../utilities/indexInParent";
import { waitForElm } from "../utilities/waitForElm";
import Flickity from "flickity-imagesloaded";

if (document.querySelector('.product__hero') !== null) {

    //SETS UP FLICKITY SLIDER FOR IMAGE GALLERY ON MOBILE
    const mainGallery = new Flickity('.product__main-gallery', {
        watchCSS: true,
        imagesLoaded: true,
        prevNextButtons: false,
        pageDots: true
    });

    // REVIEWS INSIDE ACCORDION ADJUST HEIGHT USING MUTATION OBSERVER
    waitForElm('.spr-form').then((elm) => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(function(mutation) {
                if(mutation.attributeName === 'style'){
                    console.log("style change");
                    document.getElementById("info-reviews").style.height = document.getElementById("shopify-product-reviews").clientHeight + 40 + "px";
                }
            });    
        });
        const observerConfig = {
            attributes: true, 
            attributeFilter: ["style"]
        };
        observer.observe(document.querySelector('.spr-form'), observerConfig);
    })
    
    const $form = document.getElementById("add-to-cart");
    const prodHandle = $form.getAttribute("data-product-handle")

    let selectedVariant;
    let selectedVariantQty;
    let prodJSON;
    let loaded = false;

    fetch(`/products/${prodHandle}.json`, {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'xmlhttprequest'
        }
    }).then(response => {
        return response.json();
    }).then(json => {

        prodJSON = json.product

        // <![CDATA[
        const selectCallback = function (variant, selector) {

            if (variant) {

                // console.log(variant)
                // console.log(selector)

                const $selector = document.getElementById("product-select");
                const $addToCartButton = document.getElementById("add");
                const $buyNowButton = document.getElementById("buy-now");
                selectedVariant = variant.id;
                selectedVariantQty = parseInt($selector.querySelector(`option[value="${selectedVariant}"]`).getAttribute('data-qty'));

                let variantImageId = variant.image_id;

                //CHANGES IMAGE ON THUMBNAIL CLICK
                const productHeroImages = document.querySelectorAll(".product__main-gallery img");
                productHeroImages.forEach(img => {
                    document.querySelectorAll(".product__nav-gallery a").forEach(item => {
                        if (item.classList.contains("active")) {
                            item.classList.remove("active")
                        }
                    });
                })
                if(document.querySelector(`.product__nav-gallery-item[href="#${variantImageId}"]`) !== null){
                    const selectedImageIndex = indexInParent(document.querySelector(`.product__nav-gallery-item[href="#${variantImageId}"]`));
                    document.querySelector(`.product__nav-gallery a[href="#${variantImageId}"]`).classList.add("active")
                    if (window.innerWidth > 767) {
                        if(selectedImageIndex === 0){
                            window.scrollTo(0,0) 
                        } else {
                            window.scrollTo(0, document.getElementById(variantImageId).offsetTop - (document.querySelector(".header").offsetHeight / 2));
                        }
                    }
    
                    //CHANGES FLICKITY IMAGE
                    mainGallery.select(selectedImageIndex);
                }


                if (variant.available || selectedVariantQty > 0) {
                    // Selected a valid variant that is available.
                    $addToCartButton.disabled = null;
                    $buyNowButton.setAttribute("disabled", false);
                    $addToCartButton.value = "Add to Cart";
                    $buyNowButton.value = "Buy it Now";
                    $buyNowButton.setAttribute("href", `${window.shopUrl}/cart/${selectedVariant}:1`)
                    // $('#add').removeClass('disabled').removeAttr('disabled').val('Add to Bag').fadeTo(200, 1);
                } else {
                    // Variant is sold out
                    $addToCartButton.disabled = true;
                    $buyNowButton.setAttribute("disabled", true);
                    $addToCartButton.value = "Out of Stock";
                    $buyNowButton.value = "Out of Stock";
                    // $('#add').val('Out of Stock').addClass('disabled').attr('disabled', 'disabled').fadeTo(200, 0.5);
                }

                // Whether the variant is in stock or not, we can update the price and compare at price.
                if (variant.compare_at_price > variant.price) {
                    // $('#price-field').html('<span style="display:inline-block; color:#ff0000;">' + Shopify.formatMoney(variant.price, "").replace('.00', '') + '</span>' + '<span style="display:inline-block; text-decoration:line-through;padding-left:5px;">' + Shopify.formatMoney(variant.compare_at_price, "").replace('.00', '') + '</span>');
                } else {
                    // $('#price-field').html(Shopify.formatMoney(variant.price, "").replace('.00', ''));
                }


            } else {
                // variant doesn't exist.
                $addToCartButton.disabled = true;
                $buyNowButton.setAttribute("disabled", false);
                $addToCartButton.value = "Out of Stock";
                // $('#add').val('Out of Stock').addClass('disabled').attr('disabled', 'disabled').fadeTo(200, 0.5);
            }

            //VARIANT DROPDOWN SELECTORS
            if (document.querySelector(".single-option-selector") !== null) {
                if (document.querySelector(".single-option-selector option").value === "Default Title") {
                    // DEFAULT VARIANT SELECTOR
                    const $defaultSelectorOption = document.querySelector(".single-option-selector option[value='Default Title']");
                    const $defaultSelector = $defaultSelectorOption.closest(".selector-wrapper");
                    $defaultSelector.style.display = "none"
                } else {
                    // OTHER VARIANT SELECTORS EXCLUDING COLOR & SIZES (THOSE ARE HANDLED BELOW AS BUTTONS)
                    document.querySelectorAll(".selector-wrapper").forEach($selectorWrap => {
                        const variantSelectorIndex = $selectorWrap.querySelector("select").getAttribute("id").split("option-")[1]
                        const variantSelectorLabel = selector.product.options[variantSelectorIndex].name;
                        if (!loaded && variantSelectorLabel !== "Size" && variantSelectorLabel !== "Color") {
                            $selectorWrap.classList.add("dropdown__alt")
                            let variantSelectorLabelHTML = document.createRange().createContextualFragment(`
                                <div class="font-matter text-13">Select a ${selector.product.options[variantSelectorIndex].name}:</div>
                            `);
                            $selectorWrap.prepend(variantSelectorLabelHTML)
                            wrapEl($selectorWrap, document.createElement('div'));
                        }
                    });
                    loaded = true;
                }
            }

        }
        // ]]>
        new Shopify.OptionSelectors("product-select", {
            product: prodJSON,
            onVariantSelected: selectCallback,
            enableHistoryState: true
        });

        //SWATCH BUTTONS
        if (document.querySelectorAll(".swatch__group-wrap") !== null) {
            const $swatchGroups = document.querySelectorAll(".swatch__group-wrap");
            $swatchGroups.forEach($group => {
                const $swatches = $group.querySelectorAll(".swatch__radio");
                const $swatchWraps = $group.querySelectorAll(".swatch__wrap");
                const groupOption = $group.getAttribute("data-option");
                const $swatchSelector = document.getElementById(`product-select-option-${groupOption}`);
                $swatchSelector.style.display = "none";
                $swatchSelector.previousSibling.style.display = "none";
                const removeSwatchActiveClasses = () => {
                    $swatchWraps.forEach($wrap => {
                        if ($wrap.classList.contains("active")) {
                            $wrap.classList.remove("active")
                        }
                    });
                }
                $swatches.forEach($swatch => {
                    $swatch.addEventListener("click", (event) => {
                        removeSwatchActiveClasses();
                        $swatch.parentNode.classList.add("active");
                        const swatchVal = $swatch.value;
                        const $label = $group.querySelector(".swatch__label");
                        $swatchSelector.value = swatchVal;
                        $label.textContent = `Color: ${swatchVal}`
                        triggerEvent($swatchSelector, "change")
                    })
                });
            });
        }

        //SIZE BUTTONS
        if (document.querySelectorAll(".size__group-wrap") !== null) {
            const $sizeGroups = document.querySelectorAll(".size__group-wrap");
            $sizeGroups.forEach($group => {
                const $sizes = $group.querySelectorAll(".size__radio");
                const $sizeButtons = $group.querySelectorAll(".size__button");
                const sizeGroupOption = $group.getAttribute("data-option");
                const $sizeSelector = document.getElementById(`product-select-option-${sizeGroupOption}`);
                $sizeSelector.style.display = "none";
                $sizeSelector.previousSibling.style.display = "none";
                const removeSizeActiveClasses = () => {
                    $sizeButtons.forEach($button => {
                        if ($button.classList.contains("active")) {
                            $button.classList.remove("active")
                        }
                    });
                }
                $sizes.forEach($size => {
                    $size.addEventListener("click", (event) => {
                        removeSizeActiveClasses();
                        $size.parentNode.classList.add("active");
                        const sizeVal = $size.value;
                        $sizeSelector.value = sizeVal;
                        triggerEvent($sizeSelector, "change")
                    })
                });
            });
        }

    })

}