import { makeStyles } from '@material-ui/core'
import { Box, Button, CardMedia, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { productActions } from 'features/product/productSlice'
import { Product } from 'models'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { cartActions } from './cartSlice'


interface Props {
    
}

const useStyles = makeStyles({
    root:{
        display: 'flex',
        marginTop: '12px'
    },
    productImg: {
        height: '300px',
        objectFit: 'contain',
        backgroundPosition: 'center',
        flex: 5,
        borderRadius: '5px'
    },
    productInfo: {
        flex: 7,
        padding: '16px',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
        
    },
    addToCartBtn:{
        
    }
})

const ProductInfo = (props: Props) => {
    const classes = useStyles()
    const {productId} = useParams<{productId: string}>()
    const productById = useAppSelector(state => state.productReducer.list)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(productActions.fetchProductById(productId))  
    },[productId, dispatch]);
    
    // console.log('Product by Id from Product info', productById);
    const singleProduct  = productById.find(obj => obj.id === productId)

    return (
        <Box style={{marginTop: 64}} >
            <Typography variant="h6">Product info</Typography>
            <Box className={classes.root}>
                <CardMedia className={classes.productImg}
                    image={singleProduct?.thumnailUrl}
                    title={singleProduct?.name}
                />
            
                <Box className={classes.productInfo}>
                    <Box>
                        <Typography variant="h6">{singleProduct?.name}</Typography>
                        <Typography><b>Description:</b> {singleProduct?.description}</Typography>
                        <Typography><b>Color:</b> {singleProduct?.color}</Typography>
                        <Typography><b>Price:</b> {singleProduct?.price} ($) </Typography>
                    </Box>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.addToCartBtn}
                        onClick={()=>dispatch(cartActions.addToCart(singleProduct?.id as string))}
                    >
                        Add to cart</Button>
                </Box>
            </Box>
            
        </Box>
    )
}

export default ProductInfo
