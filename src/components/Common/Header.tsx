import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import React from 'react';

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
  }),
);

export const Header = (props: HeaderProps) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    return (
        <div className={classes.root}>
            <AppBar position="static" >
                <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    AKA Shop
                </Typography>
                
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
