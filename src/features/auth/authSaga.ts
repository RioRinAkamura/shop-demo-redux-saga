import { PayloadAction } from "@reduxjs/toolkit"; 
import { take, fork, delay, call, put } from "@redux-saga/core/effects";
import { authActions, LoginPayload } from "./authSlice";
import { push } from "connected-react-router";

function* handleLogin(payload: LoginPayload){
    try {

        // yield delay(700)
        // localStorage.setItem('access_token', 'fake_login')
        console.log('payload: ', payload);
        
        localStorage.setItem('username', payload.username)


        yield put(authActions.loginSuccess({
            id: 1,
            name: 'Rio'
        }))
        console.log('login success');
        
      
        // yield put(push('/admin/dashboard'))

    } catch (error: any) {
        yield put(authActions.loginFailed(error.message)) 
    }
}

function* handleLogout(){
    yield delay(500);
    // localStorage.removeItem('access_token')
    localStorage.removeItem('username')

    //Redirect to Login page
    yield put(push('/login'))
}

function* watchLoginFlow(){
    while(true){        
        // const isLoggedIn = Boolean(localStorage.getItem('access_token'));
        const isLoggedIn = Boolean(localStorage.getItem('username'));
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