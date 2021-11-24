import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ListParams, ListResponse, PaginationParams, Product } from "models";

export interface ProductState{
    loading: boolean;
    list: Product[];
    filter: ListParams;
    pagination: PaginationParams;
}

const initialState: ProductState={
    loading: false,
    list: [],
    filter: {
        _page: 1,
        _limit:10,
    },
    pagination: {
        _page: 1,
        _limit:10,
        _totalRows: 10
    }
}

const productSlice = createSlice({
    name:'product',
    initialState: initialState,
    reducers:{
        fetchProductList(state, action: PayloadAction<ListParams>){
            state.loading = true
        },

        fetchProductListSuccess(state, action :PayloadAction<ListResponse<Product>>){
            state.list = action.payload.data;
            state.pagination = action.payload.pagination;
            state.loading = false
        },
        fetchProductListFailed(state){
            state.loading = false
        },

        setFilter(state, action: PayloadAction<ListParams>){
            state.filter = action.payload
        },
    }
})

//Actions
export const productActions = productSlice.actions;

//Selectors
export const selectProductList = (state: RootState) => state.product.list;
export const selectProductLoading = (state: RootState) => state.product.loading;
export const selectProductFilter = (state: RootState) => state.product.filter;
export const selectProductPagination = (state: RootState) => state.product.pagination;


//Reducer
const productReducer = productSlice.reducer;
export default productReducer;