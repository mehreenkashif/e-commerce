
import { Box,Button,CircularProgress,Snackbar,Alert,Typography,Container,Paper} from '@mui/material';
import { blue } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductByIdQuery } from '../redux/apiSlice';
import { addToCart } from '../redux/cartSlice';
import { useState, useEffect } from 'react';

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    if (isError) setOpenSnackbar(true);
  }, [isError]);

  if (isLoading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product || isError) {
    return (
      <Typography variant="h6" align="center" mt={4}>
        Product not found.
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {product.title}
        </Typography>

        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4} mb={4}>
          <Paper
            variant="outlined"
            sx={{flex: 1,p: 2,minHeight: 400,display:'flex',justifyContent:'center',alignItems:'center'}}
          >
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{maxWidth: '100%',maxHeight: '100%',objectFit: 'contain', mixBlendMode: 'multiply' }}
              onError={(e) => {
                e.currentTarget.src = '/placeholder-product.png';
                e.currentTarget.style.objectFit = 'contain';
              }}
            />
          </Paper>

          <Box flex={1}>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price}
            </Typography>

            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleAddToCart}
              sx={{ py: 1.5, bgcolor: blue[700],'&:hover': { bgcolor: blue[800] } }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={isError ? 'error' : 'success'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {isError ? 'Failed to load product.' : 'Product added to cart!'}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductPage;
