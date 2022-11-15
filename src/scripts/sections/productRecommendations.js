const productRecommendationsSection = document.querySelector('.product__ymal');
if(productRecommendationsSection !== null){
    const prodId = productRecommendationsSection.getAttribute('data-product-id')
    fetch(`/recommendations/products.json?product_id=${prodId}&limit=3`)
    .then(response => response.json())
    .then(({ products }) => {
      const $grid = productRecommendationsSection.querySelector(".grid");
      if (products.length > 0) {
        $grid.innerHTML = "";
        products.forEach((prod, i) => {
          let prodHTML = document.createRange().createContextualFragment(`
          <div class="collection__main-item md:min-w-[66vw] fade-in${i !== 0 ? ` delay-${i*300}`: ``}" data-viewport>
            <a href="${prod.url}" class="item__card">
              <img src="${prod.featured_image}" loading="lazy" width="1200" height="1500" class="w-full mb-4" alt="${prod.title}">
              <div class="item__card-hover glow-bubble"></div>
              <div class="item__card-hover-text">Shop Now</div>
              <div>
                  ${prod.type !== "" ? `<p class="item__card-category block font-italic text-24 -mb-1 lg:text-20">${prod.type} —</p>` : ""}
                  <p class="item__card-title block font-matterlight text-24 lg:text-20">${prod.title}</p>
              </div>
              <p class="item__card-price font-matter text-18 text-brown tracking-widest">${Shopify.formatMoney(prod.price).replace('.00', '')}</p>
            </a>
          </div>
        `);                
        $grid.append(prodHTML)            
        });
        [...$grid.children].forEach(child => {
          setTimeout(() => {
            child.classList.add("in-view")
          }, 150);
        });        
      }
      $grid.style.opacity = 1;
    }
  );
}