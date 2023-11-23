// ProductCard.tsx
import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, CardMedia } from '@mui/material';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';



const ProductCard: React.FC<ProductProps> = ({ id, title, price, image }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { id, name: title, price, quantity: 1 },
    });
  };

  return (
    <Card>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="textSecondary">
          Price: ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Buy
        </Button>
        <Button size="small" color="primary" onClick={handleAddToCart} component={Link} to={`/checkout/${id}`}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
