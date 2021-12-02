import { call, delay, put, takeEvery } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { fetchCount } from "./counterAPI";
import { incrementSaga, incrementSagaSuccess } from "./counterSlice";

// export function* log(action: PayloadAction) {
//     console.log('Log', action);
    
// }

// function* test(){
//     yield fetchCount(2)

//     //and
//     yield call(fetchCount, 2)
// }

function* handleIncreasementSaga(action:PayloadAction<number>){
    console.log('Waiting 2s');
    //wait 2s
    yield delay(2000)
    console.log('waiting done, dispatch action');
    

    //dispatch action success
    yield put(incrementSagaSuccess(action.payload))
    
}

export default function* counterSaga() {
    // console.log('counter Saga')
    yield takeEvery(incrementSaga.toString(), handleIncreasementSaga)
}