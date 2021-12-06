import { yupResolver } from '@hookform/resolvers/yup'
import { Input, makeStyles } from '@material-ui/core'
import { Box, Button, Typography } from '@mui/material'
import { Category } from 'models'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useLocation, useParams } from 'react-router'
import * as yup from "yup"
import { useSingleCategoryData, useUpdateCategoryData } from '../hooks/useCategoriesData'


interface RqEditCategoryProps {
    initialValues? : Category;
    onSubmit? : (formValues : Category) => void;
}

const useStyles = makeStyles({
    input:{
        width: '300px',
        borders: '1px solid #888'
    }
})

// interface CategoryId{
//     categoryId : string
    
// }
 

// export function useQuery<
//   TQueryFnData = unknown,
//   TError = unknown,
//   TData = TQueryFnData,
//   TQueryKey extends QueryKey = QueryKey
// >

const RqEditCategory = ({initialValues, onSubmit}: RqEditCategoryProps) => {
    const classes = useStyles()
    const {categoryId} = useParams<{categoryId: string}>()
    // const isEdit = Boolean(categoryId)
    // const {isLoading, data, isError, error} = useCategoryData({categoryId})
    const history = useHistory()
    // const {data} = useSingleCategoryData(categoryId)
    // const [name, setName] = useState(data)

    const location = useLocation()
    const category: any = location.state
    console.log(category);
    const cateName = category.category.name
    console.log(cateName);

    
    
        // useEffect(() => {
        //     if(data){
        //         setName(data.name)
        //     }
        //     return () => {}
        // }, [data])

        // console.log('cate name: ', data);
        // const cateName = data.name
        // console.log('newcate Name', cateName);
        
        
    
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
            <Typography variant="h4" mb={2}>Update Category</Typography>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Input className={classes.input} {...register("name")}
                        defaultValue={cateName}
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
