import { Box, makeStyles } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { Typography } from '@mui/material';
import categoryApi from 'api/categoryApi';
import { Category } from 'models';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryForm from '../components/CategoryForm';



interface AddEditCategoryDialogProps {
    // categoryList: Category[];
    // onEdit?: (category: Category) => void;
    // onRemove?: (category: Category) => void;
}

const useStyles = makeStyles(theme =>({
    root: {},
    backLink:{
        textDecoration: 'none',
        width: '100%'
    },
}))

const AddEditCategory = (props: AddEditCategoryDialogProps) => {
    const history = useHistory()
    const {categoryId} = useParams<{categoryId: string}>()
    const isEdit = Boolean(categoryId)
    const [category, setCategory] = useState<Category>()
    const {t} = useTranslation()
    const classes = useStyles()

    

    useEffect(()=>{
        if(!categoryId) return;
        //IFFE
        (async ()=>{
            try {
                const data : Category = await categoryApi.getById(categoryId)
                setCategory(data)

            } catch (error) {
                console.log('Failed to fetch category detail', error);
                
            }
        })();

    },[categoryId]);

    const handleCategoryFormSubmit = async (formValues: Category)=>{
        //Call api to add, edit category info
        if(isEdit){
            await categoryApi.update(formValues)
        } else{
            await categoryApi.add(formValues)
        }

        // const message = isEdit ? 'Edit category success': 'Add category succes';
        toast.success('Save category success')

        //Redirect to categoryList
        history.push('/admin/categories')
    }

    const initialValues: Category ={
        name: '',
        ...category,
    } as Category


    return (
        <Box>
            <Link to="/admin/categories" className={classes.backLink}>
                <Typography variant="caption" style={{display: 'flex', alignItems:'center', fontSize: '16px'}} mb={2}>
                    <ChevronLeft/> {t("Product List")}
                </Typography>
            </Link>

            <Typography variant="h5">

                {isEdit ? t("Update category") : t("Add new category") } 
            </Typography>
            {(!isEdit || Boolean(category)) && (
                <CategoryForm 
                    initialValues={initialValues} 
                    onSubmit={handleCategoryFormSubmit}
                />
            )}
        </Box>
                        
              
    )
}

export default AddEditCategory
