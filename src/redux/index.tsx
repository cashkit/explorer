import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'

import { AppReducer, watcherCheckClient, checkClient, updateErrorState } from './client';
import { BlockReducer, updateBlockHash } from './block';
import { AddressReducer, updateAddress } from './address';
import { TxReducer, updateTxHash } from './txn';

const reducers = combineReducers({
	AddressReducer,
	AppReducer,
	BlockReducer,
	TxReducer
});
const rootSaga = function*() {
	yield all([
		fork(watcherCheckClient),
	]);
};

// Setup Redux-Saga
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const devMode = process.env.NODE_ENV === 'development';
if (devMode) {
	const logger = createLogger({});
	middleware.push(logger);
}

// Create the store
const store = configureStore({
	reducer: reducers,
	middleware: middleware,
	devTools: devMode,
	preloadedState: {},
})
// Make sure to run the saga middleware.
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export {
	checkClient,
	store,
	updateAddress,
	updateBlockHash,
	updateErrorState,
	updateTxHash
};