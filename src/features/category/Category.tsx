import { Box } from '@mui/material'
import React from 'react'
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
