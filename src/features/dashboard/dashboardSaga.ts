import productApi from 'api/productApi';
import { ListResponse, Product } from 'models';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { dashboardActions } from './dashboardSlice';


function* fetchStatistics(){
    const responseList: Array<ListResponse<Product>> = yield all([
        call(productApi.getAll, { _page: 1, _limit: 1, _categoryId: '' }),
        call(productApi.getAll, { _page: 1, _limit: 1, _categoryId: '' }),
        call(productApi.getAll, { _page: 1, _limit: 1, _categoryId: '' }),
        call(productApi.getAll, { _page: 1, _limit: 1, _categoryId: '' }),

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