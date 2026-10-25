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