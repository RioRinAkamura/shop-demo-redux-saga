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
        //get all product without listparams
        fetchProductListData(state){
            state.loading = true
        },

        fetchProductListDataSuccess(state, action :PayloadAction<Product[]>){
            state.list = action.payload;
            // console.log('action.payload from productSlice:', action.payload);
            state.loading = false
        },
        fetchProductListDataFailed(state){
            state.loading = false
        },




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

        fetchProductById(state, action: PayloadAction<string>){
            state.loading = true
            
        },

        fetchProductByIdSuccess(state, action :PayloadAction<Product>){
            state.list = [];
            state.list.push(action.payload)
            state.loading = false
        },
        fetchProductByIdFailed(state){
            state.loading = false
        },

        setFilter(state, action: PayloadAction<ListParams>){
            state.filter = action.payload
        },

        setFilterWithDebounce(state, action: PayloadAction<ListParams>){},
    }
})

//Actions
export const productActions = productSlice.actions;

//Selectors
export const selectProductList = (state: RootState) => state.productReducer.list;
export const selectProductLoading = (state: RootState) => state.productReducer.loading;
export const selectProductFilter = (state: RootState) => state.productReducer.filter;
export const selectProductPagination = (state: RootState) => state.productReducer.pagination;

//Reducer
const productReducer = productSlice.reducer;
export default productReducer; 