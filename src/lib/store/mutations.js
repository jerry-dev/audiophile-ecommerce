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

	addToCart(state, payload) {
		const {...newState} = state;
		newState.cart[newState.cart.length] = payload;
		sessionStorage.setItem('shoppingCart', JSON.stringify(newState));
		return newState;
	},
}