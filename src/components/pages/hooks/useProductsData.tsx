
import axios from 'axios'
import { StringMap } from 'i18next'
import { useQuery } from 'react-query'
interface ProductPaginate{
    categoryId: string
    pageNumber: number
}

const fetchProducts = async ()=>{
    const response = await axios.get('https://api-json-sever-demo.herokuapp.com/api/products')
    return response.data  
}

const fetchProductPaginated = async(pageNumber: number)=>{
    const response = await axios.get(`https://api-json-sever-demo.herokuapp.com/api/products?_limit=20&_page=${pageNumber}`)
    return response.data
}

const fetchProductByCateId = async({categoryId, pageNumber}: ProductPaginate)=>{
    const response = await axios.get(`https://api-json-sever-demo.herokuapp.com/api/products?_page=${pageNumber}&_limit=10&categoryId=${categoryId}`)
    return response.data
}

export const useProductsData = ({onSuccess, onError}: any) => {
    return useQuery('products', fetchProducts, {
        onSuccess,
        onError
    })
}

export const useProductsPaginated = (pageNumber: number) =>{
    return useQuery(['products', pageNumber], ()=> fetchProductPaginated(pageNumber))
}

export const useProductsByCateId = ({categoryId, pageNumber}: ProductPaginate)=>{
    return useQuery(['products', {categoryId, pageNumber}], ()=>fetchProductByCateId({categoryId, pageNumber}))
}