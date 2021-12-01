import { CircularProgress, Input, TextField } from '@material-ui/core'
import { Alert, Box, Button, Typography } from '@mui/material'
import axios from 'axios'
import { InputField } from 'components/FormFields'
import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useMutation, useQuery } from 'react-query'
import { Category } from 'models'
import { useCategoryData } from '../hooks/useCategoryData'
import { useHistory, useParams } from 'react-router'
import { useAddCategoryData } from '../hooks/useCategoriesData'



interface RqAddCategoryProps {
    initialValues? : Category;
    onSubmit? : (formValues : Category) => void;
}

interface CategoryId{
    categoryId : string
}

// export function useQuery<
//   TQueryFnData = unknown,
//   TError = unknown,
//   TData = TQueryFnData,
//   TQueryKey extends QueryKey = QueryKey
// >

const RqAddCategory = ({initialValues, onSubmit}: RqAddCategoryProps) => {
    const [name, setName] = useState('')
    const history= useHistory()

    const schema = yup.object({
        name: yup.string().required('Please enter name of category'),
      }).required();

      const { register, handleSubmit } = useForm<Category>({
        defaultValues: initialValues,
        resolver: yupResolver(schema)
    });

    const {mutate: addNewCate} = useAddCategoryData()
    const handleFormSubmit= async (formValues: any)=>{
        addNewCate(formValues)
        
        
        history.push('/admin/categories') 
    }

    return (
        <Box width={400}>
            <Typography variant="h4">Add new category</Typography>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                
                    <Input  
                        {...register("name")}
                    />                   
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary">
                        Save
                        </Button>
                    </Box>
                </form>            
        </Box>
    )
}

export default RqAddCategory
