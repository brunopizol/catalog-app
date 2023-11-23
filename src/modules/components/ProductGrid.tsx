import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '../types/Product';

const ProductGrid: React.FC = () => {
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
         <ProductCard {...product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
