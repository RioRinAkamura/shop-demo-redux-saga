import { Card, makeStyles, Paper, TextField } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Box, Button, CardContent, CardMedia, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { productActions } from 'features/product/productSlice';
import { Product } from 'models';
import React, { useEffect } from 'react';
import { cartActions, getTotalPrice } from './cartSlice';
import { Link } from 'react-router-dom';

interface Props {}

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    marginTop: '12px',
    justifyContent: 'space-between',
  },
  media: {
    flex: 3,

    objectFit: 'contain',
  },
  cartContent: {
    flex: 9,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '8px',
  },
  quantity: {
    width: '32px',
    padding: '6px',
  },
  link: {
    textDecoration: 'none',
    color: 'unset',
  },
});

const CartList = (props: Props) => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cartReducer.items);
  const products = useAppSelector((state) => state.productReducer.list);
  useEffect(() => {
    dispatch(productActions.fetchProductListData());
  }, [dispatch]);

  const cartList = Object.entries(cart).map(([id, quantity]) => {
    const productIncart = {
      items: products.find((product) => product.id === id),
      qty: quantity,
    };
    return productIncart;
  });

  console.log('product from cart list: ', cartList);

  const quantityChange = (id: string, quantity: number) => {
    dispatch(cartActions.updateQuantity({ id, quantity }));
  };

  return (
    <Box>
      <Typography variant="h5">Cart list</Typography>
      {cartList.map((cart) => (
        <Paper elevation={3} key={cart.items?.id}>
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image={cart.items?.thumnailUrl}
              title={cart.items?.name}
            />
            <CardContent className={classes.cartContent}>
              <Box>
                <Link to={`/products/${cart.items?.id}`} className={classes.link}>
                  <Typography variant="h6" component="h6">
                    {cart.items?.name}
                  </Typography>
                </Link>

                <Typography>{cart.items?.description}</Typography>

                <Typography>Price: {cart.items?.price} ($)</Typography>
              </Box>

              <Box>
                <input
                  className={classes.quantity}
                  type="number"
                  id="qty"
                  name="qty"
                  defaultValue={cart.qty}
                  min={1}
                  onChange={(e) => quantityChange(String(cart.items?.id), Number(e.target.value))}
                />
                <Button
                  size="small"
                  onClick={() => dispatch(cartActions.removeFromCart(cart.items?.id as string))}
                >
                  <DeleteForeverIcon />
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Paper>
      ))}
    </Box>
  );
};

export default CartList;
