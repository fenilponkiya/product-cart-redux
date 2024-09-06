import { Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { Home } from "./components/home";
import { Cart } from "./components/cart";
import { Container } from "@mui/material";
import { Product } from "./components/product";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
