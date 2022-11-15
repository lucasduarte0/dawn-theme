# Bask Goods Shopify Theme w/ Webpack

It uses:
- SCSS + [Tailwind](https://tailwindcss.com/)
- Vanilla Javascript with webpack + babel

The compiled files css/js will go to the directory "/assets"

- from `src/styles/theme.scss` to `assets/bundle.theme.css`
- from `src/scripts/theme.js` to `assets/bundle.theme.js`

## Getting Started

1. Install dependencies
`yarn`

2. Open 2 Terminals in VSCode (or whatever your preferred text editor).

3. In the first terminal, you'll watch for webpack changes in your JS and SCSS by running `yarn start`

4. In the second terminal, you'll watch for changes in your Shopify dev environment [Shopify CLI](https://shopify.dev/themes/tools/cli). If you've not setup Shopify CLI, follow [these instructions](https://shopify.dev/themes/tools/cli/getting-started) to get connected to the theme to run in a development enviornment and then run `shopify theme serve` 

5. Edit JS files within `src/scripts/`

6. Edit SCSS files within `src/styles/`

7. If you're uncomfortable running webpack to edit css or js files, feel free to edit/add vanilla css to `assets/custom.css` and edit/add js to `assets/custom.js` (jQuery has not been added/used on the theme at the time of initial development). If doing this you can skip step 3 since webpack isn't watching/bundling these files.