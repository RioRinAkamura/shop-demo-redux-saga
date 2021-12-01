import { CircularProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Box, Button } from '@mui/material'
import { InputField } from 'components/FormFields'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Category from '../Category'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface CategoryFormProps {
    initialValues? : Category;
    onSubmit? : (formValues : Category) => void;
}

const CategoryForm = ({initialValues, onSubmit}: CategoryFormProps) => {
    const {t} = useTranslation()
    const [error, setError] = useState<string>('')

    const schema = yup.object({
        name: yup.string().required('Please enter name of product'),
      }).required();

      const { control, handleSubmit, formState:{isSubmitting} } = useForm<Category>({
        defaultValues: initialValues,
        resolver: yupResolver(schema)
    });

    const handleFormSubmit= async (formValues: Category)=>{
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
        <Box width={400}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                {/* Form field */}
                <InputField name="name" control={control} label={t("category name")}/>                            
                
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

export default CategoryForm
