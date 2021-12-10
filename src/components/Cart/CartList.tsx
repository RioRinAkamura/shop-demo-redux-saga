import { Card, makeStyles, Paper, TextField } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Box, Button, CardContent, CardMedia, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { productActions } from 'features/product/productSlice';
import React, { useEffect } from 'react';

interface Props {
    
}

const useStyles = makeStyles({
    root: {
      width: '100%',
      display: 'flex',
      marginTop:'12px',
      justifyContent: 'space-between'

    },
    media: {
        flex: 3,

      objectFit: 'contain',
    },
    cartContent:{
        flex: 9,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '12px'
    },
    quantity:{
        width: '32px',
        padding: '6px'
    }
  });

const CartList = (props: Props) => {
    const classes = useStyles()

    const dispatch = useAppDispatch()
    const cart = useAppSelector((state)=> state.cartReducer.items)
    const products = useAppSelector((state)=> state.productReducer.list)

    useEffect(() => {
       dispatch(productActions.fetchProductListData())
    }, [dispatch])

    
    console.log('product from cart list: ', products);

    const cartList = Object.entries(cart).map(([id, quantity]) => {
        const productInCart = products.find((product) => product.id === id)
        console.log('productInCart',productInCart);

        return productInCart
           
    })

    console.log('cartList', cartList);
    
                
            
    
    return (
        <Box>
            <Typography variant="h5">Cart list</Typography>
            {cartList.map((item, index) =>(
                <Paper elevation={3}>
                <Card className={classes.root}>
                    <CardMedia
                        className={classes.media}
                        image={item?.thumnailUrl}
                        title={item?.name}
                        
                    />
                    <CardContent className={classes.cartContent}>
                        <Box>
                            <Typography  variant="h6" component="h6">
                                {item?.name}
                            </Typography>

                            <Typography >
                                {item?.description}
                            </Typography>

                            <Typography >
                                Price: {item?.price} ($)
                            </Typography>
                        </Box>

                        <Box>
                            <input
                                className={classes.quantity}
                                // variant="outlined"
                                // size="small"
                                type="number"
                                id="qty"
                                name="qty"
                                defaultValue={1}
                                min ={1}
                                
                            />

                            <Button size="small" >
                                <DeleteForeverIcon/>
                            </Button>
                        </Box>
                    </CardContent>

                </Card>
            </Paper>
            ) )}
        </Box>
    )
}

export default CartList
