import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';


import { AppReducer, watcherCreateNewClient, createNewClient, updateErrorState } from './client';

// **********
// Reducers.
// **********

const reducers = combineReducers({
	AppReducer,
});

// **********
// Sagas.
// **********

const rootSaga = function*() {
	yield all([
		fork(watcherCreateNewClient),
	]);
};

// **********
// Store Implementation
// **********


// Setup Redux-Saga
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(sagaMiddleware)));

// Initiate root saga.
sagaMiddleware.run(rootSaga);

export {
	store,
	createNewClient,
	updateErrorState
};