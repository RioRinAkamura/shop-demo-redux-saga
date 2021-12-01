import { Box } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Route, Switch, useRouteMatch } from 'react-router'
import CategoryTable from './components/CategoryTable'
import RqAddCategory from './components/RqAddCategory'
import RqEditCategory from './components/RqEditCategory'

interface Category {
    id:string,
    name: string
}

// const fetchCategories = () =>{
//     return axios.get('https://api-json-sever-demo.herokuapp.com/api/categories')
// }

const Category = () => {

    const match=useRouteMatch()

    // const {isLoading, data, isError, error, isFetching, refetch} = useQuery(
    //     'categories',
    //     fetchCategories,
    //     {
            // staleTime: 30000,
            // refetchOnMount: true,
            // refetchOnWindowFocus: true
            // refetchInterval: 4999,
            // enabled: false
            // select: (data)=>{
            //     const categoryName = data.data.map((category: Category ) => category.name)
            //     return categoryName
            // }
        // }
        // )

    // console.log('RQ',isLoading, isFetching);
    
    // if(isLoading){
    //     return <h3>Loading categories</h3>
    // }
    // if(isError){
    //     return <h2>Failed to fetch data</h2>
    // }

    return (
        <Box>
            <Switch>
                <Route path={match.path} exact>
                    {/* <CategoryTable categoryList={data?.data}/> */}
                    <CategoryTable />
                </Route>

                <Route path={`${match.path}/add`}>
                    <RqAddCategory />
                </Route>

                <Route path={`${match.path}/:categoryId`} exact>
                    <RqEditCategory />
                </Route>
            </Switch>
            
            {/* {data?.data.map((category: CategoriesProps)=>
                    <div key={category.id}>{category.name}</div>
                )} */}
        </Box>
    )
}

export default Category
