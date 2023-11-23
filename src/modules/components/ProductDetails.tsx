import React from 'react';
import { Typography, Button } from '@mui/material';
import { Product } from '../types/Product';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
  return (
    <div>
      <Typography variant="h4">{product.title}</Typography>
      <Typography variant="body1">Price: ${product.price}</Typography>
      <Typography variant="body1">Description: {product.description}</Typography>
      <Typography variant="body1">Brand: {product.brand}</Typography>
      <Typography variant="body1">Category: {product.category}</Typography>
      <Typography variant="body1">discountPercentage: {product.discountPercentage}</Typography>
      <Typography variant="body1">rating: {product.rating}</Typography>
      {/* Adicione outras informações do produto conforme necessário */}
      <Button variant="contained" color="primary" onClick={onClose}>
        Close
      </Button>
    </div>
  );
};

export default ProductDetails;
