import { Select } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Chip, MenuItem } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
    
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    langBtn: {
      color: "white",
      width: '16px'
    }
  }),
);

export const Header = (props: HeaderProps) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const { i18n } = useTranslation();

    const handleChangeLang=(lang: string)=>{
      i18n.changeLanguage(lang)
    }
    return (
        <div className={classes.root}>
            <AppBar position="static" >
                <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    AKA Shop
                </Typography>

                <Button className={classes.langBtn} onClick={()=> handleChangeLang('en')}>en</Button>
                <Button className={classes.langBtn} onClick={()=> handleChangeLang('vi')}>vi</Button>
                &nbsp;
                
                <Button 
                    color="inherit" 
                    onClick={()=> dispatch(authActions.logout())}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}
