import {useQuery} from 'react-query'
import axios from 'axios'

interface ProductId{
    id: string
}

const fetchProduct = ({queryKey}:any) =>{
    const id = queryKey[1]
    return axios.get(`https://api-json-sever-demo.herokuapp.com/api/categories/${id}`)
}

export const useProductData = ({id}: ProductId) =>{
    return useQuery(['product', id], fetchProduct)
}