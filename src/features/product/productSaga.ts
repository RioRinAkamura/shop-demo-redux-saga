import { call, debounce, put, takeLatest } from "@redux-saga/core/effects";
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

function* fetchProductListData(){
    try {
        const response: Product[] = yield call(productApi.getAllProduct)
        yield put(productActions.fetchProductListDataSuccess(response))
        
    } catch (error) {
        console.log('failed to fetch product list data', error);
        yield put(productActions.fetchProductListDataFailed())
    }

}

function* fetchProductById(action: PayloadAction<string>){
    try {
        const response: Product = yield call(productApi.getById, action.payload)
        console.log('response from product saga: ', response);
        
        yield put(productActions.fetchProductByIdSuccess(response))
        
    } catch (error) {
        console.log('failed to fetch product by Id', error);
        yield put(productActions.fetchProductByIdFailed())
    }

}

function* handleSearchDeboune(action: PayloadAction<ListParams>){
    // console.log('product saga');
    
    yield put(productActions.setFilter(action.payload));
}

export default function* productSaga(){

    yield takeLatest(productActions.fetchProductList, fetchProductList)

    yield takeLatest(productActions.fetchProductListData, fetchProductListData)

    yield takeLatest(productActions.fetchProductById, fetchProductById)

    yield debounce(500, productActions.setFilterWithDebounce.type, handleSearchDeboune)
}