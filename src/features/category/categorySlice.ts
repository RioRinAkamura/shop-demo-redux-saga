import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Category, ListResponse } from "models";

export interface CategoryState{
    loading: boolean;
    list: Category[];
}

const initialState: CategoryState={
    loading: false,
    list: []
}

const categorySlice= createSlice({
    name: 'category',
    initialState: initialState,
    reducers:{
        fetchCategoryList(state){
            state.loading = true;
        },
        fetchCategoryListSuccess(state, action:PayloadAction<ListResponse<Category>>){
            state.loading = false;
            state.list = action.payload.data;
        },
        fetchCategoryListFailed(state){
            state.loading = false;
        },
    }
})


//actions
export const categoryActions = categorySlice.actions;

//selectors
export const selectCategoryList = (state:RootState)=>state.category.list;
export const selectCategoryMap = createSelector(selectCategoryList, (categoryList) =>
    categoryList.reduce((map : {[key:string] : Category}, category) => {
        map[category.id] = category
            return map;
        },{})
    );

//reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer;