import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: 'relative'
    },
    appbar:{
        backgroundColor: 'white',
        color: "#555",
        position: 'fixed',
        zIndex:999
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      marginLeft: '24px'
    },
    logo:{
      marginLeft: '0px',
    },
    menu:{
        display: 'flex',
        marginLeft: '126px'
      // flexGrow: 1,
        
    }
  }),
);

interface HeaderUserProps {
}

const HeaderUser = (props: HeaderUserProps) => {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

  
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            
            <Typography variant="h6" className={classes.logo}>
              ShopDemo
            </Typography>
              <div className={classes.menu} >
                <Typography variant="h6" className={classes.title}>
                    Shop
                </Typography>
                <Typography variant="h6" className={classes.title}>
                    About
                </Typography>
                <Typography variant="h6" className={classes.title}>
                    Blog
                </Typography><Typography variant="h6" className={classes.title}>
                    Contact
                </Typography>
              </div>          
          </Toolbar>
        </AppBar>
      </div>
    );
}

export default HeaderUser
