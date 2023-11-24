// App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import { CartProvider } from './modules/context/CartContext';
import MenuBar from './modules/components/MenuBar';
import ProductGrid from './modules/components/ProductGrid';
import Checkout from './modules/components/Checkout';
import { Product } from './modules/types/Product';
import HomeWrapper from './modules/components/HomeWrapper';

const Home: React.FC = () => (
  <>
    <div>Home Page</div>
    <HomeWrapper></HomeWrapper>
  </>
);

const Cart: React.FC = () => <div><Checkout></Checkout></div>;

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  return (
    <CartProvider>
      <Router>
        <MenuBar onSearch={setSearchResults} />
        <Container>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/cart" Component={Cart} />
            <Route path="/checkout/:productId" Component={Checkout} />
          </Routes>
        </Container>
      </Router>
    </CartProvider>
  );
};

export default App;



