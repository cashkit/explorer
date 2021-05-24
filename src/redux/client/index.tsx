import { put  } from 'redux-saga/effects';
import { sagaWatcherHelper } from '../../utils';
import { GrpcManager } from '../../managers';
 
// Error types
enum ClientErrors{
  NOT_INITIATED = "NOT_INITIATED",
  UNABLE_TO_CONNECT = "UNABLE_TO_CONNECT",
  NOT_AVAILABLE = "NOT_AVAILABLE"
}

// Types
const CHECK_GRPC_CLIENT = 'CHECK_GRPC_CLIENT';
const CREATE_GRPC_CLIENT_SUCCESS = 'CREATE_GRPC_CLIENT_SUCCESS';
const CREATE_GRPC_CLIENT_FAILED = 'CREATE_GRPC_CLIENT_FAILED';
const UPDATE_ERROR_STATE = "UPDATE_ERROR_STATE";

const INITIAL_STATE = {
	clientError: ClientErrors.NOT_INITIATED
};

// Actions

export const checkClient = () => {
	return {
		type: CHECK_GRPC_CLIENT
	};
};

export const updateErrorState = ({clientError}) => {
	return {
		type: UPDATE_ERROR_STATE,
		payload: clientError
	};
};


// Reducer

export const AppReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UPDATE_ERROR_STATE:
			// Make sure to pass the state to retain other value in the props of components.
			// For example if you only set the clientError here then all the other props
			// will be set to undefined in the next render of the components.
			return { ...state, clientError: action.payload }
		case CREATE_GRPC_CLIENT_SUCCESS:
		case CREATE_GRPC_CLIENT_FAILED:
			return { ...state, ...action.payload };
		default:
			// If there is no specific event that says the error should be updated.
			// This probably means that either the error has been resolved or never occured.
			// In case of the error being resolved reset this to null.
			// For sepcifict cases where we might need to retain the error state we can
			// update state accordingly.
			// return state
			return { ...state, clientError: null};
	}
};

// Sagas

export function* workerCheckClient() {
	try {
		const client = GrpcManager.Instance
		if (!client){
			yield put({
				type: CREATE_GRPC_CLIENT_FAILED,
				payload: { clientError: ClientErrors.UNABLE_TO_CONNECT }
			});
		}
	} catch (e) {
		console.log(e);
	}
}


export const watcherCheckClient = sagaWatcherHelper(workerCheckClient, CHECK_GRPC_CLIENT);