import { serializeForm } from "../utilities/serializeForm";
if (document.querySelector(".cart__drawer") !== null) {
	const $cartDrawerWrap = document.querySelector(".cart__drawer-wrap");
	const $cartDrawerOverlay = document.querySelector(".cart__drawer-overlay");
	const $cartDrawer = document.querySelector(".cart__drawer");
	const $cartItems = document.querySelector(".cart__drawer-items");
	const $bag = document.querySelector(".bag-count");
	const $checkoutButton = document.getElementById("checkout-button")
	const $cartDrawerFooter = document.querySelector(".cart__drawer-footer");
	//UPDATE CART
	const refreshCart = () => {
		fetch(`/cart.js`, {
			headers: {
				'Content-Type': 'application/json',
				'X-Requested-With': 'xmlhttprequest'
			}
		}).then(response => {
			return response.json();
		}).then(cart => {
			console.log(cart)
			$cartItems.innerHTML = "";
			if (cart.item_count > 0) {
				const { items } = cart;
				items.forEach(item => {
					buildItem(item, $cartItems)
				});
				$bag.textContent = cart.item_count;
				$cartDrawerFooter.style.display = "block";
				$checkoutButton.textContent = `Checkout — ${Shopify.formatMoney(cart.total_price)}`
				$checkoutButton.removeAttribute("disabled")
			} else {
				$bag.textContent = "0";
				$cartItems.innerHTML = "<div class='font-italic text-24'>Your cart is empty</div>";
				$cartDrawerFooter.style.display = "none";
			}
		})
	}
	//CART ITEM BUILDER
	const buildItem = (cartItem, selector) => {
		let itemHTML = document.createRange().createContextualFragment(`
			<div class="cart__drawer-item">
				<a href="${cartItem.url}" class="cart__drawer-item-image hover:opacity-60">
					<img src="${cartItem.featured_image.url}" alt="${cartItem.featured_image.alt}" />
				</a>
				<div class="cart__drawer-item-content">
					<div class="flex-grow">
						${cartItem.product_type !== "" ? `<div class="font-italic text-24 md:text-20 -mb-1">${cartItem.product_type} —</div>`: ""}
						<a href="${cartItem.url}" class="font-matterlight text-24 tracking-[.05em] inline-block mb-1 md:text-20 hover:text-orange">${cartItem.product_title}</a>

							${!cartItem.product_has_only_default_variant && cartItem.options_with_values.length > 0 ? cartItem.options_with_values.map(option => (
								`<div class="flex items-center font-matter text-13">
									<div>${option.name}:</div>
									<div>${option.value}</div>
								</div>`							
							)).join('') : ""}
								
						<div class="font-matterlight text-18 tracking-widest text-brown mt-2 md:text-16">${Shopify.formatMoney(cartItem.price).replace('.00', '')}</div>
					</div>
					<div class="flex items-center mt-4 md:flex-col md:items-start">
						<div class="cart__drawer-item-qty">
							<span onclick="window.cartItemUpdate(\'${cartItem.variant_id}\',${cartItem.quantity-1})">-</span>
							<span>${cartItem.quantity}</span>
							<span onclick="window.cartItemUpdate(\'${cartItem.variant_id}\',${cartItem.quantity+1})">+</span>
						</div>
						<a href="#" class="cart__drawer-item-remove" onclick="window.cartItemUpdate(\'${cartItem.variant_id}\', 0); return false;" style="cursor:pointer;">REMOVE</a>
					</div>
				</div>
			<\/div>
		`);
		selector.prepend(itemHTML);
	}
	//OPEN CART
	const showCart = () => {
		if(document.querySelector("body").classList.contains("menu-is-open")){
			document.querySelector("body").classList.remove("menu-is-open")
			document.getElementById("hamburger-close").classList.remove("active")
			document.getElementById("hamburger").classList.add("active")
			const $header = document.querySelector('header')
			const $headerWrap = document.querySelector('.header-wrap')
			let headerHeight = document.querySelector('.header__main').offsetHeight;
			document.querySelectorAll(".header__submenu").forEach(el => {
				if(el.classList.contains("active")){
					el.classList.remove("active")
					el.style.height = 0
				}
			});
			document.querySelectorAll(".has-submenu").forEach(el => {
				if(el.classList.contains("active")){
					el.classList.remove("active")
				}
			});			
			if(document.querySelector(".announcement-bar") !== null){
				const announcementBarHeight = document.querySelector(".announcement-bar").offsetHeight
				$headerWrap.style.height = headerHeight + announcementBarHeight + 2 + "px";
				$header.style.height = headerHeight + announcementBarHeight + 2 + "px";
			} else {
				$headerWrap.style.height = headerHeight + "px";
				$header.style.height = headerHeight + "px";
			}  			
		}
		setTimeout(() => {
			if (document.querySelector(".header__overlay").classList.contains("active")) {
				document.querySelector(".header__overlay").classList.remove("active")
			}
			if (document.querySelector(".header").classList.contains("dropdown-open")) {
				document.querySelector(".header").classList.remove("dropdown-open")
			}
		}, 51);
		$cartDrawerWrap.classList.add("active")
	}
	//CLOSE CART
	const closeCart = () => {
		if ($cartDrawerWrap.classList.contains("active")) {
			$cartDrawerWrap.classList.remove("active")
		}
	}
	//CART ITEM ADD
	const addToCart = (form_id) => {
		$checkoutButton.setAttribute("disabled", true)
		$checkoutButton.textContent = `Loading...`
		showCart()
		fetch(`/cart/add.js`, {
			body: JSON.stringify(serializeForm(document.getElementById(form_id))),
			headers: {
				'Content-Type': 'application/json',
				'X-Requested-With': 'xmlhttprequest'
			},
			method: 'POST'
		}).then(response => {
			return response.json();
		}).then(() => {
			refreshCart()
		})
	}
	//CART ITEM UPDATE
	const cartItemUpdate = (variantId, qty) => {
		$checkoutButton.setAttribute("disabled", true)
		$checkoutButton.textContent = `Loading...`
		const itemUpdateData = `updates[${variantId}]=${qty}`;
		fetch(`/cart/update.js?${itemUpdateData}`, {
			headers: {
				'Content-Type': 'application/json',
				'X-Requested-With': 'xmlhttprequest'
			},
			method: 'POST'
		}).then(response => {
			return response.json();
		}).then(() => {
			refreshCart()
			showCart()
		})
	}
	window.refreshCart = refreshCart;
	window.addToCart = addToCart;
	window.cartItemUpdate = cartItemUpdate;
	window.showCart = showCart;
	window.closeCart = closeCart;
}

refreshCart()