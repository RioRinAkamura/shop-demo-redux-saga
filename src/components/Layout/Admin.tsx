

import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/material';
import { Header, Sidebar } from 'components/Common';
import Category from 'features/category/Category';
import  Dashboard  from 'features/dashboard/Dashboard';
import {Product} from 'features/product/Product';
import React from 'react';
import { Route, Switch } from 'react-router';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '250px 1fr',
        gridTemplateAreas: `"header header" "sidebar main"`,

        minHeight: '100vh',

    },

    header:{
        gridArea: 'header',

    },
    sidebar:{
        gridArea: 'sidebar',
      backgroundColor: theme.palette.background.paper,
      borderRight: '1px solid #999',



    },
    main:{
        gridArea: 'main',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2,3)
    },
}))


export const AdminLayout = () => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Box className={classes.header}>
                <Header/>
            </Box>
            <Box className={classes.sidebar}>
                <Sidebar/>
            </Box>
            <Box className={classes.main}>
                <Switch>
                    <Route path="/admin/dashboard">
                        <Dashboard/>                        
                    </Route>

                    <Route path="/admin/products">
                        <Product/>
                    </Route>

                    <Route path="/admin/categories">
                        <Category />
                    </Route>
                </Switch>
            </Box>
        </Box>
    )
}
