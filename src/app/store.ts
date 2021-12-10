import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga';
import authReducer from 'features/auth/authSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { combineReducers } from 'redux'
import { history } from 'utils';
import dashboardReducer from 'features/dashboard/dashboardSlice';
import productReducer from 'features/product/productSlice';
import categoryReducer from 'features/category/categorySlice';
import cartReducer from 'components/Cart/cartSlice';

const rootReducer = combineReducers({
  router: connectRouter(history),
  counter: counterReducer,
  
  authReducer,
  dashboardReducer,
  productReducer,
  categoryReducer,
  cartReducer,
 
})

const sagaMiddleware = createSagaMiddleware()
  
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history))
});

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
