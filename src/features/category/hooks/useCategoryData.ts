import {useQuery} from 'react-query'
import axios from 'axios'

interface CategoryId {
    categoryId: string 
}

const fetchCategory = ({queryKey}:any) =>{
    const categoryId = queryKey[1]
    return axios.get(`https://api-json-sever-demo.herokuapp.com/api/categories/${categoryId}`)
}


export const useCategoryData =({categoryId }: CategoryId)=>{
    return useQuery(['category', categoryId], fetchCategory)
}

export const useSingleCategoryData =({categoryId }: CategoryId)=>{

}