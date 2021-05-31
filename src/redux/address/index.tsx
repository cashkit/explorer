// Types


const UPDATE_ADDRESS = "UPDATE_ADDRESS";

const INITIAL_STATE = {
	address: undefined,
};

// Actions

interface address {
	address: string | undefined
}

export const updateAddress = ({address}: address) => {
	return {
		type: UPDATE_ADDRESS,
		payload: address
	};
};


// Reducer


export const AddressReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UPDATE_ADDRESS:
			return { address: action.payload }
		default:
			return state;
	}
};
