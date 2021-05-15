import { take, fork  } from 'redux-saga/effects';

export const actionHelper = function(type, args) {
	return {
		type,
		...args
	};
};

export const sagaWatcherHelper = function(worker, type) {
	return function*() {
		while (true) {
			const action = yield take(type);
			yield fork(worker, action);
		}
	};
};