import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Badge, Box, CardMedia, Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../../src/assets/logo.png';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useAppSelector } from 'app/hooks';
import { getNumberItems } from 'components/Cart/cartSlice';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: 'relative',
      
      
    },
    appbar:{
        backgroundColor: 'white',
        color: "#555",
        zIndex:999,
       
    },
    toolbar:{
      display:'flex',
      justifyContent:'space-between',
      margin: '0px '
    },

    title: {
      flexGrow: 1,
      marginLeft: '24px',
      textDecoration: 'none',
      color: '#333',
      fontSize: '18px',
      fontWeight: 500
    },
    logo:{
      marginLeft: '0px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textDecoration:'none',
      color: 'unset'
    },
    logoImg:{
      width: '52px !important',
      height: '52px !important',
      objectFit: 'contain!important' as 'contain',
      // marginLeft: '90px'
    },
    menu:{
        display: 'flex',
        marginLeft: '22px'
      // flexGrow: 1,
        
    }
  }),
);

interface HeaderUserProps {
}

const HeaderUser = (props: HeaderUserProps) => {
    const classes = useStyles();
    const numberItems = useAppSelector(getNumberItems)
  
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appbar}>
          <Container>
          <Toolbar className={classes.toolbar}>
            <Box>
              <Link to="/"  className={classes.logo}>
                <CardMedia className={classes.logoImg}
                          component="img"
                          alt="Aka shop"
                          image={logo}
                          title="Aka shop"
                          />
                  <Typography variant="h6" >
                    Aka
                  </Typography>
              </Link>
            </Box>
            <div className={classes.menu} >
              <Link to="/shop"  className={classes.title}>
                  Shop
              </Link>
              <Link to="/about"  className={classes.title}>
                  About
              </Link>
              <Link to="/blog"  className={classes.title}>
                  Blog
              </Link>
              <Link to="/contact"  className={classes.title}>
                  Contact
              </Link>

              <Link to="/cart">
                <Badge badgeContent={numberItems} color="secondary" className={classes.title}>
                    <ShoppingCartIcon />
                </Badge>
              </Link>
              
            </div>          
          </Toolbar>
          </Container>
        </AppBar>
      </div>
    );
}

export default HeaderUser
