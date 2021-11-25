import { Box } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { categoryActions } from 'features/category/categorySlice';
import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';


export const Product=()=> {
  const match = useRouteMatch();
  const dispatch = useAppDispatch();

  useEffect(()=>{
     dispatch(categoryActions.fetchCategoryList())
  },[dispatch])

  return (
    <Box>
      <Switch>
        <Route path={match.path} exact>
          <ListPage/>
        </Route>

        <Route path={`${match.path}/add`}>
          <AddEditPage/>
        </Route>

        <Route path={`${match.path}/:productId`} exact>
          <AddEditPage/>
        </Route>
      </Switch>
        
    </Box>
  );
}


