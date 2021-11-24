import { call, put, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import productApi from "api/productApi";
import { ListParams, ListResponse, Product } from "models";
import { productActions } from "./productSlice";

function* fetchProductList(action: PayloadAction<ListParams>){
    try {
        const response: ListResponse<Product> = yield call(productApi.getAll, action.payload)
        yield put(productActions.fetchProductListSuccess(response))
        
    } catch (error) {
        console.log('failed to fetch product list', error);
        yield put(productActions.fetchProductListFailed())
    }

}

export default function* productSaga(){
    //watch fetch product action
    yield takeLatest(productActions.fetchProductList, fetchProductList)
}