import axios from 'axios'
import { Category } from 'models'
import { useMutation, useQuery, useQueryClient } from 'react-query'



const fetchCategories = async () =>{
    const response = await axios.get('https://api-json-sever-demo.herokuapp.com/api/categories')
    return response.data
}

const getSingleCategory = async (id: string) =>{
    const response = await axios.get(`https://api-json-sever-demo.herokuapp.com/api/categories/${id}`)
    return response.data
}

const addCategory = async( name : string )=>{
    const response = await axios.post('https://api-json-sever-demo.herokuapp.com/api/categories', name)
    return response.data
}

const removeCategory = async(id: string)=>{
    const response = await axios.delete(`https://api-json-sever-demo.herokuapp.com/api/categories/${id}`)
    return id
}

const updateCategory = async (editCategory : Category)=>{
    const response = await axios.put(`https://api-json-sever-demo.herokuapp.com/api/categories/${editCategory.id}`, editCategory)
    // console.log('response', response.data.name);
    // console.log('editCategory', editCategory);
    
    return response.data

}

export const useCategoriesData = ({onSuccess, onError}: any)  => {
    return useQuery('categories', fetchCategories, {
        onSuccess,
        onError
    }) 
}

export const useSingleCategoryData = ( id:string)  => {
    return useQuery(['categories', {id}], () => getSingleCategory(id))
}



export const useAddCategoryData = () => {
    const queryClient = useQueryClient()
    return useMutation(addCategory, {
        onSuccess:(data)=>{
            const newCategory = data
            console.log('newCategory', newCategory);    
            
            queryClient.setQueryData('categories', (oldQueryData:any) =>{
                return [...oldQueryData, newCategory]
            })
        },
        onError: (error: any)=>{
            console.log(error.message);
                
        },
        onSettled: () => {queryClient.invalidateQueries('categories')}
    })
}

export const useRemoveCategoryData =()=>{
    const queryClient = useQueryClient()
    return useMutation(removeCategory, { 
        onSuccess: (data)=> {            
            queryClient.removeQueries(data)
        },
        onSettled: () => {queryClient.invalidateQueries('categories')}
    })
}

export const useUpdateCategoryData =()=>{
    const queryClient = useQueryClient()
    return useMutation(updateCategory, {
        onSuccess:(data)=>{
            const newCategory = data
            // console.log('data from query', data);
            console.log('newCategory', newCategory);  
            queryClient.setQueryData(['categories', {id: data.id}], data)
        },
        onError: (error: any)=>{
            console.log(error.message);
        },
        onSettled: () => {queryClient.invalidateQueries('categories')}
    })

}