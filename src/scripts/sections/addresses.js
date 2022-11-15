import {
    CountryProvinceSelector
} from '@shopify/theme-addresses';

if (document.querySelector(".customers-addresses") !== null) {

    const selectors = {
        addressContainer: '[data-address]',
        addressToggle: '[data-address-toggle]',
        addressCountry: '[data-address-country]',
        addressProvince: '[data-address-province]',
        addressProvinceWrapper: '[data-address-province-wrapper]',
        addressForm: '[data-address-form]',
        addressDeleteForm: '[data-address-delete-form]',
    };
    const hideClass = 'hidden';

    function initializeAddressForm(countryProvinceSelector, container) {
        const countrySelector = container.querySelector(selectors.addressCountry);
        const provinceSelector = container.querySelector(selectors.addressProvince);
        const provinceWrapper = container.querySelector(selectors.addressProvinceWrapper);
        const addressForm = container.querySelector(selectors.addressForm);
        const deleteForm = container.querySelector(selectors.addressDeleteForm);

        countryProvinceSelector.build(countrySelector, provinceSelector, {
            onCountryChange: (provinces) => provinceWrapper.classList.toggle(hideClass, !provinces.length),
        });

        container.querySelectorAll(selectors.addressToggle).forEach((button) => {
            button.addEventListener('click', () => {
                addressForm.classList.toggle(hideClass);
            });
        });

        if (deleteForm) {
            deleteForm.addEventListener('submit', (event) => {
                const confirmMessage = deleteForm.getAttribute('data-confirm-message');

                if (!window.confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
                    event.preventDefault();
                }
            });
        }
    }

    const addresses = document.querySelectorAll(selectors.addressContainer);

    if (addresses.length) {

        const countryProvinceSelector = new CountryProvinceSelector(window.theme.allCountryOptionTags);

        addresses.forEach((addressContainer) => {
            initializeAddressForm(countryProvinceSelector, addressContainer);
        });

        [selectors.addressCountry,selectors.addressProvince].forEach(selector => {
            document.querySelectorAll(selector).forEach($select => {
                const $label = $select.nextElementSibling;
                const labelText = $label.textContent.trim();
                $select.firstChild.textContent = labelText
                $select.value = '---'
            });
        });
    }


}