import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQty, decrementQty } from '../redux/cartSlice';
import { 
  Box, Button, IconButton, Typography, Container, Paper, Divider, List, ListItem,
  ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction 
} from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';

const CartItem = ({ item, dispatch }) => (
  <>
    <ListItem>
      <ListItemAvatar>
        <Avatar 
          variant="rounded"
          src={item.image}
          alt={item.title}
          sx={{ width: 80, height: 80, mr: 2, bgcolor: 'background.paper' }}
        />
      </ListItemAvatar>
      
      <ListItemText
        primary={<Typography variant="subtitle1" fontWeight="medium">{item.title}</Typography>}
        secondary={<Typography variant="body2" color="text.secondary">${item.price.toFixed(2)}</Typography>}
      />
      
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
        <IconButton 
          size="small" 
          onClick={() => dispatch(decrementQty(item.productId))}
          disabled={item.quantity <= 1}
        >
          <Remove />
        </IconButton>
        <Typography variant="body1" sx={{ mx: 1.5 }}>{item.quantity}</Typography>
        <IconButton 
          size="small" 
          onClick={() => dispatch(incrementQty(item.productId))}
        >
          <Add />
        </IconButton>
      </Box>
      
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={() => dispatch(removeFromCart(item.productId))} color="error">
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
    <Divider variant="inset" component="li" />
  </>
);

const CartTotal = ({ totalPrice, items }) => (
  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
    <Paper elevation={3} sx={{ p: 3, width: 'fit-content' }}>
      <Typography variant="h6">
        Total: <Typography component="span" color="primary" fontWeight="bold">
          ${totalPrice.toFixed(2)}
        </Typography>
      </Typography>
      <Button 
        variant="contained" 
        size="large" 
        fullWidth
        sx={{ mt: 2 }}
        disabled={items.length === 0}
      >
        Proceed to Checkout
      </Button>
    </Paper>
  </Box>
);

const EmptyCart = () => (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <Typography variant="h5" align="center">
      Your cart is empty.
    </Typography>
  </Container>
);

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  if (items.length === 0) return <EmptyCart />;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Shopping Cart
      </Typography>
      
      <Paper elevation={3} sx={{ mb: 3 }}>
        <List>
          {items.map((item) => (
            <CartItem key={item.productId} item={item} dispatch={dispatch} />
          ))}
        </List>
      </Paper>
      
      <CartTotal totalPrice={totalPrice} items={items} />
    </Container>
  );
};

export default Cart;