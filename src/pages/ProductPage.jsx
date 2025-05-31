
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Box,
  Button, 
  CircularProgress, 
  Snackbar, 
  Alert,
  Typography,
  Container,
  Paper
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { blue } from '@mui/material/colors';


const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  );

  if (!product) return (
    <Typography variant="h6" align="center" mt={4}>
      Product not found.
    </Typography>
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {product.title}
        </Typography>
        
        <Box 
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            mb: 4
          }}
        >
          <Box 
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'background.paper',
              p: 2,
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
              minHeight: 400
            }}
          >
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                mixBlendMode: 'multiply'
              }}
              onError={(e) => {
                e.target.src = '/placeholder-product.png';
                e.target.style.objectFit = 'contain';
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price}
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              {product.description}
            </Typography>

            <Button 
              variant="contained" 
              size="large" 
              fullWidth
            
              onClick={handleAddToCart}
              sx={{ py: 1.5 ,  bgcolor: blue[700]}}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          Product added to cart successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductPage;