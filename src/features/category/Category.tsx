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


const Category = () => {

    const match = useRouteMatch()
    console.log('match.path', match.path);
    
    
    return (
        <Box>
            <Switch>
                <Route path={`${match.path}/add`}>

                    <RqAddCategory />
                </Route>

                <Route path={`${match.path}/:categoryId`} exact>
                    <RqEditCategory />
                </Route>

                <Route path={match.path} exact>
                    <CategoryTable/>
                </Route>

                
            </Switch>
            
        </Box>
    )
}

export default Category
