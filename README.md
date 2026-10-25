### Live Link
https://ecommerce-take-home-assignment.netlify.app/

### Video Demo Link
https://drive.google.com/file/d/1IOALzpblnk5rMS0pBEohvFRa2HqIwx0l/view?usp=sharing

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


## Application Planning

### 1. Folder Structure

The project is organized by responsibility so that route-level screens, reusable interface elements, shared state, and API configuration are easy to find:

```text
src/
   components/
      FilterSidebar.jsx
      NavBar.jsx
      ProductCard.jsx
   context/
      filtersSilce.js
      store.js
   pages/
      ProductDetail.jsx
      ProductListing.jsx
   utils/
      api.js
   App.jsx
   main.jsx
   index.css
```

### 2. Core Entities

- **Product:** The main catalog item. Product data comes from DummyJSON and includes fields used by the UI such as `id`, `title`, `price`, `category`, `brand`, `rating`, `thumbnail`, `description`, and `reviews`.
- **Category:** A product classification used to request and filter catalog items. Multiple categories can be selected.
- **Brand:** A product attribute used by the brand checkboxes to narrow the visible results.
- **Review:** Feedback associated with a product, displayed on the product detail page with reviewer, comment, and rating information.
- **Filter selection:** Shared UI state rather than an API entity. Redux stores selected categories, brands, price bounds, and the current page.

### 3. Pages, Layout, and Components

Pages represent complete route destinations. Components represent reusable or focused parts of those pages:

- **`ProductListing` page (`/`):** Owns the catalog screen layout, requests the current product page, applies brand and price filters, and renders the product grid and pagination.
- **`ProductDetail` page (`/product/:id`):** Loads one product by ID and lays out its image, price, rating, product information, description, and reviews.
- **`NavBar` component:** Shared top-of-page navigation appearance. Its search and icon controls are currently visual only.
- **`FilterSidebar` component:** Displays category, brand, and price controls. It dispatches shared filter changes to Redux; temporary input drafts and the expand/collapse toggle remain local.
- **`ProductCard` component:** Displays a product summary in the listing and links to its detail route.
- **`App` component:** Defines the shared navbar and connects the route paths to their page components.

## Architectural Decisions

- **React with Vite:** React provides the component-based UI, while Vite handles the development server and production build.
- **Page-based routing:** React Router maps `/` to the product listing and `/product/:id` to the product detail page.
- **Redux Toolkit for shared filters:** Selected categories, selected brands, applied price bounds, and the current page are shared application state. They live in the `filters` slice so the listing and sidebar use the same values.
- **Local state for page-specific data:** The listing page owns its fetched product page, loading/error status, and total product count. The detail page owns its currently fetched product and loading/error status. These values are not needed by unrelated components.
- **Local state for temporary UI input:** The price fields keep draft values locally until **Apply** is clicked. Expanding the category list is also local UI state because it does not affect the product results.
- **Shared API client:** `src/utils/api.js` configures Axios with the base URL from `VITE_API_BASE_URL`, falling back to DummyJSON. Feature components make their endpoint requests through this client.
- **Reusable UI components:** `ProductCard`, `FilterSidebar`, and `NavBar` separate repeated or distinct interface areas from the page-level components.
- **Client-side secondary filters:** Category selection determines the paginated API request. Brand and price filters are applied in the browser to the products returned for that page.

## Improvements If Given More Time

- **Cart functionality:** Add products from the listing and detail pages, show a cart item count, and provide a cart page where users can change quantities, remove items, clear the cart, and review a subtotal.
- **More product filters:** Add rating, stock availability, and discount filters, plus sorting options such as price ascending/descending and highest rated.
- **Category search:** Add a search field to the category filter so users can quickly find a category instead of browsing the full checkbox list.
- **Product search:** Make the navbar search functional, allowing users to find products by title or keywords and see matching results in the catalog.
- **Coordinate all catalog controls:** Ensure search, additional filters, and sorting work together with category selection and pagination, resetting to the first page when the result set changes.
