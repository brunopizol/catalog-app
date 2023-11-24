import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Tooltip, SelectChangeEvent } from '@mui/material';
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/Cart';

const Checkout: React.FC = () => {
  const { productId = '' } = useParams<{ productId?: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<string>(''); // Tipo string
  const [cardNumber, setCardNumber] = useState('');
  const [pixKey, setPixKey] = useState('');

  // Utilize o hook useCart para acessar o estado do carrinho
  const { state: cartState } = useCart();
  const { cart: cartItems } = cartState;

  
  useEffect(() => {
    // Lógica para buscar o produto com o ID fornecido
    const foundProduct = cartItems.find((item) => item.product.id === parseInt(productId, 10));

    if (foundProduct) {
      setProduct(foundProduct.product);
    }
  }, [productId, cartItems]);

  const handleCalculateFrete = () => {
    // Simulação de um número aleatório entre 0 e 100 para o valor do frete
    const randomValue = Math.floor(Math.random() * 101);
    setFrete(randomValue);
  };

  const renderFreteMessage = () => {
    if (frete !== null) {
      if (frete === 0) {
        return `Frete grátis e prazo de 5 a 10 dias úteis`;
      }
      return `Valor: $${frete} e prazo de 5 a 10 dias úteis`;
    }
    return '';
  };

  const handlePaymentMethodChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    setPaymentMethod(event.target.value);
  };

  const handleFinishCheckout = () => {
    // Lógica para finalizar a compra
  };

    return (
    <div>
      <h2>Checkout Page</h2>
      {cartItems.map((cartItem: CartItem) => (
        <div key={cartItem.product.id}>
          <Typography variant="h6">{cartItem.product.title}</Typography>
          <Typography variant="body2">Price: ${cartItem.product.price}</Typography>
          <Typography variant="body2">Quantity: {cartItem.quantity}</Typography>
        </div>
      ))}
      {product && (
        <>
          <Typography variant="h6">{product.title}</Typography>
          <Typography variant="body2">Price: ${product.price}</Typography>
        </>
      )}
      <Tooltip
        title="A implementação de consulta de valores de CEP é fictícia, sendo gerado um número aleatório toda vez que consultado."
        arrow
      >
        <TextField
          label="CEP"
          value={cep}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) => setCep(e.target.value)}
          onBlur={handleCalculateFrete}
        />
      </Tooltip>

      <Typography>{renderFreteMessage()}</Typography>
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
          onChange={(e: { target: { value: React.SetStateAction<string> } }) => setCardNumber(e.target.value)}
        />
      )}
      {paymentMethod === 'pix' && (
        <TextField
          label="PIX Key"
          value={pixKey}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) => setPixKey(e.target.value)}
        />
      )}
      <Button variant="contained" color="primary" onClick={handleFinishCheckout}>
        Finish Checkout
      </Button>
    </div>
  );
};

export default Checkout;