// import React from 'react';
// import { AppBar, Toolbar, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Header = () => {
//   const navigate = useNavigate();

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
//           🛒 My E-Commerce
//         </Typography>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { blue } from '@mui/material/colors';

const Header = () => {
  const navigate = useNavigate();
  const cartItemsCount = useSelector(state => state.cart.items.reduce((sum, i) => sum + i.quantity, 0));

  return (
    <AppBar position="static" sx={{bgcolor: blue[900]}}>
      <Toolbar>
        <Typography variant="h6" onClick={() => navigate('/')} sx={{ cursor: 'pointer', flexGrow: 1 }}>
          🛒 My E-Commerce
        </Typography>
        <IconButton color="inherit" onClick={() => navigate('/cart')}>
          <Badge badgeContent={cartItemsCount} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
export default Header;