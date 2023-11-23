// MenuBar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const MenuBar: React.FC = () => {
  const { state } = useCart();

  return (
    <AppBar position="static">
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
    </AppBar>
  );
};

export default MenuBar;
