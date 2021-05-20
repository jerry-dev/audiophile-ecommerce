export default {
	navigate(state, payload) {
		const {...newState} = state;
		newState.path = payload;
		return newState;
	},

	productDataAPIFetch(state, payload) {
		const {...newState} = state;
		newState.productData = payload;
		sessionStorage.setItem('productData', JSON.stringify(newState));
		return newState;
	},
}