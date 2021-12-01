import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@material-ui/core'
import { Box, Button, Typography } from '@mui/material'
import { InputField } from 'components/FormFields'
import { Category } from 'models'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router'
import * as yup from "yup"
import { useSingleCategoryData, useUpdateCategoryData } from '../hooks/useCategoriesData'


interface RqEditCategoryProps {
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

const RqEditCategory = ({initialValues, onSubmit}: RqEditCategoryProps) => {
    const {categoryId} = useParams<{categoryId: string}>()
    // const isEdit = Boolean(categoryId)
    // const {isLoading, data, isError, error} = useCategoryData({categoryId})
    const history = useHistory()
    const {data} = useSingleCategoryData(categoryId)
    const [name, setName] = useState(data)

    
    
    console.log('data', data);

    
    // useEffect(()=>{
    //     if(data){
    //         setName(data.name)
    //     }
    // },[data])
    
    const schema = yup.object({
        name: yup.string().required('Please enter name of product'),
      }).required();

      const { register, handleSubmit } = useForm<Category>({
        defaultValues: initialValues,
        resolver: yupResolver(schema)

    });

    const {mutate: updateCate} = useUpdateCategoryData()

    const handleFormSubmit= async (formValues: Category)=>{
        formValues.id = categoryId

        updateCate(formValues)
        history.push('/admin/categories')
    
    }

    return (
        <Box width={400}>
            <Typography variant="h4">Update Category</Typography>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Input {...register("name")}
                        defaultValue={name}
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

export default RqEditCategory
