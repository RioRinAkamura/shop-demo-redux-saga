import { Box, Button } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { InputField, SelectField } from 'components/FormFields';
import { selectCategoryOptions } from 'features/category/categorySlice';
import { Product } from 'models'
import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';



export interface ProductFormProps {
    initialValues? : Product;
    onSubmit? : (formValues : Product) => void;
}

const ProductForm = ({initialValues, onSubmit}: ProductFormProps) => {
    const [error, setError] = useState<string>('')

    const schema = yup.object({
        name: yup.string().required('Please enter name of product'),
        color: yup.string().required('Please enter color'),
        price: yup.number().positive('Please enter price').required('Please enter price').typeError('Please enter a valid number'),
        categoryId: yup.string().required('Please select category')
      }).required();

    const caetgoryOptions = useAppSelector(selectCategoryOptions)

    const { control, handleSubmit, formState:{isSubmitting} } = useForm<Product>({
        defaultValues: initialValues,
        resolver: yupResolver(schema)
    });

    const handleFormSubmit= async (formValues: Product)=>{
        console.log('Submit', formValues);

        try {
            //Clear previous submitsion error
            setError('')
            await onSubmit?.(formValues);
        } catch (error: any) {
            // console.log('Failed to add/update product');
            setError(error.message)
            
        }
        
    }

    return (
        <Box maxWidth={400}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                {/* Form field */}
                <InputField name="name" control={control} label="Product's name"/>
                <InputField name="color" control={control} label="Color"/>
                <InputField name="price" control={control} label="Price" type="number" />
                <SelectField name="categoryId" control={control} label="Category" options={caetgoryOptions}/>
                
                {error && <Alert severity="error">{error}</Alert>}
                <Box mt={2}>
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                      {isSubmitting && <CircularProgress size={16} />}  Save
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default ProductForm
