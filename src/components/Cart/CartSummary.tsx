import { makeStyles, Paper } from '@material-ui/core';
import { Box, Button, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import React from 'react';
import { cartActions, getTotalPrice } from './cartSlice';

interface Props {}
const useStyles = makeStyles({
  root: {
    marginTop: '12px',
    textAlign: 'center',
    height: '124px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  summaryContent: {
    padding: '12px',
  },
  price: {
    marginBottom: '64px',
  },
  checkoutBtn: {
    marginTop: '64px',
  },
});

const CartSummary = (props: Props) => {
  const classes = useStyles();
  const cart = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useAppSelector(getTotalPrice);

  console.log('totalPrice', totalPrice);

  return (
    <Box>
      <Typography variant="h5">Cart summary</Typography>
      {cart && (
        <Paper elevation={3} className={classes.root}>
          <Box className={classes.summaryContent}>
            <Typography variant="h6" className={classes.price}>
              Total: {totalPrice} ($)
            </Typography>
            <Button variant="contained" color="primary" className={classes.checkoutBtn}>
              Process to checkout
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default CartSummary;
