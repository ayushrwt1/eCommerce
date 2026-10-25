import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import NavBar from "./components/NavBar";


function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
