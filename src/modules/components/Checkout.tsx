// Checkout.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Checkout: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [cep, setCep] = useState('');
    const [frete, setFrete] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [pixKey, setPixKey] = useState('');
  
    // Simulação de um array de produtos
    const products: Product[] = [
      {
        id: 1,
        title: 'iPhone 9',
        price: 549,
        // ... outras propriedades do produto
      },
      // Adicione outros produtos conforme necessário
    ];
  
    useEffect(() => {
      // Lógica para buscar o produto com o ID fornecido
      const foundProduct = products.find((p) => p.id === parseInt(productId, 10));
  
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }, [productId, products]);
  
    const handleCalculateFrete = () => {
      // Lógica para calcular o valor do frete com base no CEP
      // Atualize o estado de frete
    };
  
    const handlePaymentMethodChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setPaymentMethod(event.target.value as string);
    };
  
    const handleFinishCheckout = () => {
      // Lógica para finalizar a compra
    };
  
    return (
      <div>
        <h2>Checkout Page</h2>
        {product && (
          <>
            <Typography variant="h6">{product.title}</Typography>
            <Typography variant="body2">Price: ${product.price}</Typography>
            {/* Adicione outras propriedades do produto conforme necessário */}
          </>
        )}
        <TextField
          label="CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          onBlur={handleCalculateFrete}
        />
        <TextField label="Frete" value={`$${frete}`} disabled />
        <FormControl>
          <InputLabel id="payment-method-label">Payment Method</InputLabel>
          <Select
            labelId="payment-method-label"
            id="payment-method"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <MenuItem value="card">Credit Card</MenuItem>
            <MenuItem value="pix">PIX</MenuItem>
          </Select>
        </FormControl>
        {paymentMethod === 'card' && (
          <TextField
            label="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        )}
        {paymentMethod === 'pix' && (
          <TextField label="PIX Key" value={pixKey} onChange={(e) => setPixKey(e.target.value)} />
        )}
        <Button variant="contained" color="primary" onClick={handleFinishCheckout}>
          Finish Checkout
        </Button>
      </div>
    );
  };
  
  export default Checkout;