import { makeStyles } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { Box, Typography } from '@mui/material';
import productApi from 'api/productApi';
import { Product } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductForm from '../components/ProductForm';
import { useTranslation } from 'react-i18next';

export interface AddEditPageProps {}

const useStyles = makeStyles(theme =>({
    root: {},
    backLink:{
        textDecoration: 'none',
        width: '100%'
    },
}))


const AddEditPage = (props: AddEditPageProps) => {
    const history = useHistory()

    const classes = useStyles()
    const {productId} = useParams<{productId: string}>()
    const isEdit = Boolean(productId)
    const [product, setProduct] = useState<Product>()
    const {t} = useTranslation()

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

    const handleProductFormSubmit = async (formValues: Product)=>{
        //Call api to add, edit product info
        if(isEdit){
            await productApi.update(formValues)
        } else{
            await productApi.add(formValues)
        }

        // const message = isEdit ? 'Edit product success': 'Add product succes';
        toast.success('Save product success')

        //Redirect to productsList
        history.push('/admin/products')
    }

    const initialValues: Product ={
        name: '',
        color: '',
        price: '',
        categoryId: '',
        thumnailUrl: '',
        ...product,
    } as Product
    

    return (
        <Box>
            <Link to="/admin/products" className={classes.backLink}>
                <Typography variant="caption" style={{display: 'flex', alignItems:'center', fontSize: '16px'}} mb={2}>
                    <ChevronLeft/> {t("Product List")}
                </Typography>
            </Link>

            <Typography variant="h5">
                {/* {isEdit ? 'Update Product' : 'Add new product'}  */}
                {isEdit ? t("Update Product") : t("Add new product") } 
            </Typography>

            {(!isEdit || Boolean(product)) &&(
                <Box mt={3}>
                    <ProductForm 
                        initialValues={initialValues} 
                        onSubmit={handleProductFormSubmit}
                    />
                </Box>
            )}

        </Box>
    )
}

export default AddEditPage
