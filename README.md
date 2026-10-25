# E-Commerce Product Catalog

A React and Vite product catalog using DummyJSON for product and category data.

## Setup

1. Install the dependencies:

   ```sh
   npm install
   ```

2. Create a `.env` file in the project root and add the API base URL:

   ```env
   VITE_API_BASE_URL=https://dummyjson.com
   ```

   This variable is optional because the API client falls back to `https://dummyjson.com`. Vite exposes only variables prefixed with `VITE_` to browser code. Do not put secrets in this file.

3. Start the development server:

   ```sh
   npm run dev
   ```

   Restart the Vite server after creating or changing `.env` so the updated value is loaded.

## Other Commands

```sh
npm run build
npm run lint
npm run preview
```


## Assumptions Made

- DummyJSON is the product and category data source; this project does not include its own backend or database.
- The app is a product catalog demonstration. Cart, account, and navbar search controls are visual only and do not perform actions.
- Product prices are displayed in US dollars.
- Users can select multiple categories and brands. The available brand checkboxes are a fixed list in the filter sidebar.
- Price range values are applied when the user clicks **Apply**. The minimum and maximum bounds are inclusive.
- The catalog requests products in pages of eight using the API's `limit` and `skip` parameters. Brand and price filtering is performed in the browser on the products loaded for the current API page.
- Filter values and the current page are stored in Redux. Temporary UI state, such as unsubmitted price input and category-list expansion, remains local to the component.
