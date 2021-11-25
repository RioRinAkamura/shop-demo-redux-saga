import { PayloadAction } from "@reduxjs/toolkit"; 
import { take, fork, delay, call, put } from "@redux-saga/core/effects";
import { authActions, LoginPayload } from "./authSlice";
import { push } from "connected-react-router";

function* handleLogin(payload: LoginPayload){
    try {
        console.log('Handle Login', payload);
        yield delay(700)
        localStorage.setItem('access_token', 'fake_login')

        yield put(authActions.loginSuccess({
            id: 1,
            name: 'Rio'
        }))
      
        yield put(push('/admin/dashboard'))

    } catch (error: any) {
        yield put(authActions.loginFailed(error.message)) 
    }
}

function* handleLogout(){
    yield delay(500);
    // console.log('Handle logout');
    localStorage.removeItem('access_token')

    //Redirect to Login page
    yield put(push('/login'))
}

function* watchLoginFlow(){
    while(true){
        // console.log('Watch login');
        
        const isLoggedIn = Boolean(localStorage.getItem('access_token'));
        if(!isLoggedIn){
            const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
            yield fork(handleLogin, action.payload)
        }

        yield take(authActions.logout.type);
        yield call(handleLogout)
    }
}


export default function* authSaga() {
    yield fork(watchLoginFlow);

    
}