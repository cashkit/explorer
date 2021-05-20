import { put  } from 'redux-saga/effects';
import { sagaWatcherHelper } from '../../utils';
import { BASE_URL } from '../../configs';
import { GrpcManager } from '../../managers';
 
// Error types
enum ClientErrors{
    NOT_INITIATED = "NOT_INITIATED",
    UNABLE_TO_CONNECT = "UNABLE_TO_CONNECT",
	NOT_AVAILABLE = "NOT_AVAILABLE"
}

// Types
const CREATE_GRPC_CLIENT = 'CREATE_GRPC_CLIENT';
const CREATE_GRPC_CLIENT_SUCCESS = 'CREATE_GRPC_CLIENT_SUCCESS';
const CREATE_GRPC_CLIENT_FAILED = 'CREATE_GRPC_CLIENT_FAILED';
const UPDATE_ERROR_STATE = "UPDATE_ERROR_STATE";

const INITIAL_STATE = {
	client: undefined,
	clientError: ClientErrors.NOT_INITIATED
};

// Actions

export const createNewClient = () => {
	return {
		type: CREATE_GRPC_CLIENT
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
			return { clientError: action.payload }
			// break;
		case CREATE_GRPC_CLIENT_SUCCESS:
		case CREATE_GRPC_CLIENT_FAILED:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};

// Sagas

export function* workerCreateNewClient() {
	try {
		const client = new GrpcManager({
			url: BASE_URL,
			testnet: false,
			options: null
		})
		if (client){
			yield put({
				type: CREATE_GRPC_CLIENT_SUCCESS,
				payload: { client, clientError: null }
			});
		} else {
			yield put({
				type: CREATE_GRPC_CLIENT_FAILED,
				payload: { clientError: ClientErrors.UNABLE_TO_CONNECT }
			});
		}
	} catch (e) {
		console.log(e);
	}
}


export const watcherCreateNewClient = sagaWatcherHelper(workerCreateNewClient, CREATE_GRPC_CLIENT);