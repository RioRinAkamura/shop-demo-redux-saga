import productApi from 'api/productApi';
import { ListResponse, Product } from 'models';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { dashboardActions } from './dashboardSlice';


function* fetchStatistics(){
    const responseList: Array<ListResponse<Product>> = yield all([
        call(productApi.getAll, { _page: 1, _limit: 1, _categoryId: '3752d0c9-556f-4832-a4e2-6cefd7f6a105' }),
        call(productApi.getAll, { _page: 1, _limit: 1, _categoryId: '153cd45b-9bb5-408a-a005-fd4deb48ef89' }),
        call(productApi.getAll, { _page: 1, _limit: 1, _categoryId: '043690d0-0176-42b3-bf1a-8e8272579be6' }),
        call(productApi.getAll, { _page: 1, _limit: 1, _categoryId: '36e37395-4813-4af0-95aa-b5c9cd131416' }),

    ]);

    const statisticList = responseList.map(x=> x.pagination._totalRows)
    const [homeCount, electronicCount, bookCount, sportCount] = statisticList
    yield put(dashboardActions.setStatistics({homeCount, electronicCount, bookCount, sportCount}))
}

function* fetchHighestProductList(){
    const {data}: ListResponse<Product> = yield call(productApi.getAll,{
        _page: 1,
        _limit: 5,
        _sort: 'price',
        _order: 'desc'
    })

    yield put(dashboardActions.setHighestProductList(data))
}

function* fetchLowestProductList(){
    const {data}: ListResponse<Product> = yield call(productApi.getAll,{
        _page: 1,
        _limit: 5,
        _sort: 'price',
        _order: 'asc'
    })

    yield put(dashboardActions.setLowestProductList(data))
}

function* fetchDashboardData(){
    try {
        yield all([
            call(fetchStatistics),
            call(fetchHighestProductList),
            call(fetchLowestProductList)
        ])
        yield put(dashboardActions.fetchDataSuccess())
    } catch (error) {
        console.log('Failed to fetch dashboard data', error);
        yield put(dashboardActions.fetchDataFailed())        
    }
}

export default function* dashboardSaga(){

    yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData)
}