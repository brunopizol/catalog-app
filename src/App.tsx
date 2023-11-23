// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@mui/material';
import { CartProvider }from './modules/context/CartContext'
import MenuBar from './modules/components/MenuBar';
import ProductGrid from './modules/components/ProductGrid';
import Checkout from './modules/components/Checkout';

const Home: React.FC = () => (
  <>
    <div>Home Page</div>
    <ProductGrid />
  </>
);

const Cart: React.FC = () => <div>Cart Page</div>;

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <MenuBar />
        <Container>
          <Switch>
            <Route path="/" exact={true}  Component={Home} />
            <Route path="/cart" Component={Cart} />
            <Route path="/checkout/:productId" Component={Checkout} />
          </Switch>
        </Container>
      </CartProvider>
    </Router>
  );
};

export default App;
