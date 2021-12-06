
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Typography } from '@mui/material';
import { Category } from 'models';
import React, { useState } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import Body from './Body';



interface SidebarUserProps {
    categoryList : Category[]
}

interface CateParam{
    cateId: string
}

// function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
//   return <ListItem button component="a" {...props} />;
// }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    link:{
      textDecoration:'none',
      color: 'inherit',

      '&.active > div':{
        backgroundColor: theme.palette.action.focus,
      }
    },
    
  }),
);

const SidebarUser = ({categoryList}: SidebarUserProps) => {
    const classes = useStyles()
    // console.log('category List: ', categoryList);


    return (
        <Box style={{marginTop: '64px'}}>
            <Typography mb={2} mt={1}>Filter</Typography>
            <Divider/>
            <Typography mt={2}>Categories</Typography>
            <Box>
                <List component="nav" aria-label="main mailbox folders">
                    {categoryList && categoryList.map((category : Category) => (
                        <ListItem button key={category.id}>
                            <NavLink to={`/products/${category.id}`} className={classes.link}>                        
                                <ListItemText primary={category.name}/>
                            </NavLink>
                        </ListItem>
                    ))}

                </List>
            </Box>
          
        
        </Box>
    )
}

export default SidebarUser
