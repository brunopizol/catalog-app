
import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, CardMedia, Box } from '@mui/material';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import { Product } from '../types/Product';
import Slider from 'react-slick'; 





const ProductCard: React.FC<Product> = (product) => {
  const { dispatch } = useCart();
  const [showDetails, setShowDetails] = useState(false);

  const handleOpenDetails = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity: 1 },
    });
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Card>
      {product.images.length > 0 && (
        <CardMedia component="img" height="140" image={product.images[0]} alt={product.title} />
      )}
      <CardContent>
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          Price: ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Buy
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={handleAddToCart}
          component={Link}
          to={`/checkout/${product.id}`}
        >
          Add to Cart
        </Button>
        <Button size="small" color="primary" onClick={handleOpenDetails}>
          View Details
        </Button>
      </CardActions>
      {/* Renderizar o componente ProductDetails quando showDetails for true */}
      {showDetails && <ProductDetails product={product} onClose={handleCloseDetails} />}
    </Card>
  );
};

export default ProductCard;


