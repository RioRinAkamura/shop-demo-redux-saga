import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@mui/material';
import React from 'react';
import logo from '../../../../src/assets/logo.png'

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
    logoImg:{
      width: '52px !important',
      height: '52px !important',
      objectFit: 'contain!important' as 'contain'
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
          <CardMedia className={classes.logoImg}
                    component="img"
                    alt="Aka shop"
                    image={logo}
                    title="Aka shop"
                    />
            <Typography variant="h6" className={classes.logo}>
              Aka
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
