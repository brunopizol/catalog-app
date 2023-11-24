import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, InputBase, alpha, Theme, makeStyles, createStyles, Select, MenuItem } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/styles.css';
import ProductGrid from './ProductGrid';
import { Product } from '../types/Product';


interface MenuBarProps {
  onSearch: (searchResults: Product[]) => void; // Defina o tipo de dados dos resultados da pesquisa
}

const MenuBar: React.FC<MenuBarProps> = ({ onSearch }) => {
  const { state } = useCart();
  const { cart } = state;


  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'product' | 'category'>('product');

  const handleSearch = async () => {
    if (searchTerm.trim() !== '') {
      const searchUrl =
        searchType === 'product'
          ? `https://dummyjson.com/products/search?q=${searchTerm}`
          : 'https://dummyjson.com/products/category/smartphones';

      fetch(searchUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log('Search results:', data);
          onSearch(data.products); 
          return data.products;
        })
        .catch((error) => {
          console.error('Error searching:', error);
          return [];
        });
    }
    return [];
  };

  return (
    <AppBar position="static" className="appBar">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" className="title">
          My Store
        </Typography>

        <div className="search">
          <InputBase
            placeholder={`Search ${searchType === 'product' ? 'Products' : 'Categories'}`}
            classes={{
              root: "inputRoot",
              input: "inputInput",
            }}
            inputProps={{ 'aria-label': 'search' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <IconButton onClick={handleSearch} className="searchIcon">
            <SearchIcon />
          </IconButton>
          
        </div>
        <Select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as 'product' | 'category')}
          className="select"
        >
          <MenuItem value="product">Product</MenuItem>
          <MenuItem value="category">Category</MenuItem>
        </Select>

        <IconButton component={Link} to="/cart" color="inherit">
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;