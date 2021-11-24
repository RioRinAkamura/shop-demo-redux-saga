import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Product } from "models";

export interface DashboardStatistics {
    homeCount: number;
    electronicCount: number;
    bookCount: number;
    sportCount : number;
}

export interface DashboardState{
    loading: boolean;
    statistics: DashboardStatistics;
    highestProductList: Product[]
    lowestProductList: Product[]
}

const initalState : DashboardState={
    loading: false,
    statistics:{
        homeCount:0,
        electronicCount: 0,
        bookCount: 0,
        sportCount: 0
    },
    highestProductList: [],
    lowestProductList: []
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initalState,
    reducers: {
        fetchData(state){
            state.loading = true;
        },
        fetchDataSuccess(state){
            state.loading = false
        },
        fetchDataFailed(state){
            state.loading = false
        },

        setStatistics(state, action: PayloadAction<DashboardStatistics>){
            state.statistics= action.payload;
        },
        setHighestProductList(state, action: PayloadAction<Product[]>){
            state.highestProductList = action.payload
        },
        setLowestProductList(state, action: PayloadAction<Product[]>){
            state.lowestProductList = action.payload
        },
        
    }
})

//Actions
export const dashboardActions = dashboardSlice.actions;


//Selectors
export const selectDashboardLoading = (state: RootState)=> state.dashboard.loading;
export const selectDashboardStatistics = (state: RootState)=> state.dashboard.statistics;
export const selectHighestProductList = (state: RootState)=> state.dashboard.highestProductList;
export const selectLowestProductList = (state: RootState)=> state.dashboard.lowestProductList;


//Reducers
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;