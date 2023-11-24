import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Button } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';


interface ProductGridProps {
  searchResults: Product[];
}
const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { state } = useCart();
  const { searchResults } = state;
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${(currentPage - 1) * 10}`);
        const data = await response.json();
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / 10));
        setLoading(false);
        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
        setDataLoaded(false);
      }
    };

    console.log("valor de searc.: ", searchResults)
    if (searchResults.length > 0) {
      setTotalPages(Math.ceil(searchResults.length / 10));
      setLoading(false);
    } else {
      const delay = 1000;
      setTimeout(() => {
        fetchProducts();
      }, delay);
    }
  }, [currentPage, searchResults]);


  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Força o carregamento dos dados ao clicar em Next
      setDataLoaded(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // Força o carregamento dos dados ao clicar em Prev
      setDataLoaded(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
      <div>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </Button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductGrid;
