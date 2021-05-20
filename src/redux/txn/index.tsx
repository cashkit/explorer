// Types


const UPDATE_TX_HASH = "UPDATE_TX_HASH";

const INITIAL_STATE = {
	txHash: undefined,
};

// Actions


export const updateTxHash = ({txHash}) => {
	return {
		type: UPDATE_TX_HASH,
		payload: txHash
	};
};


// Reducer


export const TxReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UPDATE_TX_HASH:
			return { txHash: action.payload }
		default:
			return state;
	}
};
