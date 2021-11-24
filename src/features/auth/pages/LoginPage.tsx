import {
  Avatar,
  Box,
  Button, CircularProgress, Container,
  CssBaseline, TextField, Typography
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React from 'react';
import { authActions } from '../authSlice';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         color: '#333'
//     },
// }));

interface LoginPageProps {}

const LoginPage = (props: LoginPageProps) => {
  // const classes = useStyles()
  const dispatch = useAppDispatch();
  const isLogging =useAppSelector(state => state.auth.logging)

  const handleLogin =()=>{
    // Todo: get username + password from login form

    dispatch(authActions.login({
        username:'',
        password: ''
    }))
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogin}>
              {isLogging && <CircularProgress size={20} color="info" />}&nbsp;
               Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default LoginPage;
