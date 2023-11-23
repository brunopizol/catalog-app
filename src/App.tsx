// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@mui/material';
import { CartProvider } from './CartContext';
import MenuBar from './MenuBar';
import ProductGrid from './ProductGrid';
import Checkout from './Checkout'; // Importe o componente de Checkout

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
            <Route path="/" exact component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout/:productId" component={Checkout} />
          </Switch>
        </Container>
      </CartProvider>
    </Router>
  );
};

export default App;
