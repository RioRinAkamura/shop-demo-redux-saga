
import axios from 'axios'
import { useQuery } from 'react-query'

const fetchProducts = async ()=>{
    const response = await axios.get('https://api-json-sever-demo.herokuapp.com/api/products')
    return response.data
   
}

export const useProductsData = ({onSuccess, onError}: any) =>{
    return useQuery('products', fetchProducts, {
        onSuccess,
        onError
    })
}