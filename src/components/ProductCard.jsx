

import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, IconButton, Tooltip, Badge } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/productSlice';
import { useNavigate } from 'react-router-dom';
import { Visibility as VisibilityIcon, Delete as DeleteIcon } from '@mui/icons-material';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteProduct(product.id));
  };

  const cardStyles = {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
    }
  };

  const hoverOverlayStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    cursor: 'pointer'
  };

  const imageStyles = {
    aspectRatio: '1/1',
    objectFit: 'contain',
    p: 2,
    backgroundColor: '#f8f9fa'
  };

  const contentStyles = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    pt: 1,
    pb: '16px !important'
  };

  const titleStyles = {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    minHeight: '48px',
    fontWeight: 600,
    mb: 1
  };

  const priceStyles = {
    mt: 'auto',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: 'primary.main'
  };

  return (
    <Card sx={cardStyles} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {isHovered && (
        <Box sx={hoverOverlayStyles} onClick={() => navigate(`/product/${product.id}`)}>
          <Tooltip title="View Details">
            <Badge
              color="primary"
              overlap="circular"
              badgeContent={
                <VisibilityIcon sx={{ 
                  fontSize: 32,
                  color: 'primary.main',
                  backgroundColor: 'background.paper',
                  borderRadius: '50%',
                  p: 1,
                  boxShadow: 2
                }} />
              }
            >
              <Box sx={{ width: 0 }} />
            </Badge>
          </Tooltip>
        </Box>
      )}

      <CardMedia
        component="img"
        sx={imageStyles}
        image={product.image}
        alt={product.title}
        onError={(e) => {
          e.target.src = '/placeholder-product.png';
          e.target.style.objectFit = 'contain';
        }}
      />

      <CardContent sx={contentStyles}>
        <Typography variant="subtitle1" sx={titleStyles}>
          {product.title}
        </Typography>
        
        <Typography variant="h6" sx={priceStyles}>
          ${product.price.toFixed(2)}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <Tooltip title="Delete Product">
            <IconButton 
              color="error"
              onClick={handleDelete}
              sx={{ '&:hover': { backgroundColor: 'error.light' } }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;