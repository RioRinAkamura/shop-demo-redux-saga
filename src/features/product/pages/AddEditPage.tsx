import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { Product } from 'models';
import productApi from 'api/productApi';

export interface AddEditPageProps {}

const useStyles = makeStyles(theme =>({
    root: {},
    backLink:{
        textDecoration: 'none',
        width: '100%'
    },
}))


const AddEditPage = (props: AddEditPageProps) => {

    const classes = useStyles()
    const {productId} = useParams<{productId: string}>()
    const isEdit = Boolean(productId)
    const [product, setProduct] = useState<Product>()

    useEffect(()=>{
        if(!productId) return;
        //IFFE
        (async ()=>{
            try {
                const data : Product = await productApi.getById(productId)
                setProduct(data)

            } catch (error) {
                console.log('Failed to fetch product detail', error);
                
            }
        })();

    },[productId]);

    console.log('Found Product', product);
    

    return (
        <Box>
            <Link to="/admin/products" className={classes.backLink}>
                <Typography variant="caption" style={{display: 'flex', alignItems:'center', fontSize: '16px'}} mb={2}>
                    <ChevronLeft/> Product List
                </Typography>
            </Link>

            <Typography variant="h5">
                {isEdit ? 'Update Product' : 'Add new product'}
            </Typography>

        </Box>
    )
}

export default AddEditPage
