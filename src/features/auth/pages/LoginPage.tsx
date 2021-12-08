import {
  Avatar,
  Box,
  Button, CircularProgress, Container,
  CssBaseline, TextField, Typography
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { FormEvent } from 'react';
import { authActions, LoginPayload } from '../authSlice';
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from 'models';
import { Input } from '@material-ui/core';
import { useHistory } from 'react-router';


interface LoginPageProps {}

const LoginPage = (props: LoginPageProps) => {
  const { register, handleSubmit } = useForm();
  const history = useHistory()

  // const classes = useStyles()
  const dispatch = useAppDispatch();
  const isLogging =useAppSelector(state => state.auth.logging)

  const handleLogin: SubmitHandler<LoginPayload> =(data, event)=> {

    event?.preventDefault()
    console.log('user: ' ,data);
    dispatch(authActions.login(data))
    console.log('da di toi day roi');
    
    history.push('/admin')
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
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
          
            <Input
              {...register("username", { required: true, maxLength: 20 })}
              required
              fullWidth
              id="email"
            />
            <Input
              {...register("password", { required: true, maxLength: 20 })}
              required
              fullWidth
              type="password"
              id="password"
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {isLogging && <CircularProgress size={20} color="info" />}&nbsp;
               Sign In
            </Button>
          </Box>
        
      </Container>
    </form>
  );
};

export default LoginPage;
