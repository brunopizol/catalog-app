import React from 'react';
import { AppBar, Toolbar, Typography, Badge, IconButton, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const MenuBar: React.FC = () => {
  const { state } = useCart();

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" component={Link} to="/">
            My Store
          </Typography>
          <div style={{ marginLeft: 'auto' }}>
            <IconButton component={Link} to="/cart" color="inherit">
              <Badge badgeContent={state.cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MenuBar;
