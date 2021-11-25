
import { all } from "redux-saga/effects";
import counterSaga from "features/counter/counterSaga";
import  authSaga  from "features/auth/authSaga";
import dashboardSaga from "features/dashboard/dashboardSaga";
import productSaga from "features/product/productSaga";
import categorySaga from "features/category/categorySaga";


export default function* rootSaga() {
    
    yield all([counterSaga(),authSaga(), dashboardSaga(), productSaga(), categorySaga()]);
}