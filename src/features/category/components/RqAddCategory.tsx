import { yupResolver } from '@hookform/resolvers/yup'
import { Input, makeStyles } from '@material-ui/core'
import { Box, Button, Typography } from '@mui/material'
import { borders } from '@mui/material/node_modules/@mui/system'
import { Category } from 'models'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import * as yup from "yup"
import { useAddCategoryData } from '../hooks/useCategoriesData'



interface RqAddCategoryProps {
    initialValues? : Category;
    onSubmit? : (formValues : Category) => void;
}

// export function useQuery<
//   TQueryFnData = unknown,
//   TError = unknown,
//   TData = TQueryFnData,
//   TQueryKey extends QueryKey = QueryKey
// >

const useStyles = makeStyles({
    input:{
        width: '300px',
        borders: '1px solid #888'
    }
})

const RqAddCategory = ({initialValues, onSubmit}: RqAddCategoryProps) => {
    const classes = useStyles()
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
            <Typography variant="h4" mb={2}>Add new category</Typography>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                
                    <Input className={classes.input}
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
