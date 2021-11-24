import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import React from 'react';
import { NavLink } from 'react-router-dom';
import CategoryIcon from '@material-ui/icons/Category';

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


export const Sidebar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">

        <NavLink to="/admin/dashboard" className={classes.link} >
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>

        <NavLink to="/admin/products" className={classes.link} >
          <ListItem button>
            <ListItemIcon>
              <LocalMallIcon color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
        </NavLink>

        <NavLink to="/admin/categories" className={classes.link} >
          <ListItem button>
            <ListItemIcon>
              <CategoryIcon color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem>
        </NavLink>
      </List>
      
    </div>
  );
}
