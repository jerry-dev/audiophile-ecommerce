export default {
	productDataAPIFetch(state, payload) {
		const {...newState} = state;
		newState.productData = payload;
		sessionStorage.setItem('productData', JSON.stringify(newState));
		return newState;
	},

	addToCart(state, payload) {
		const {...newState} = state;
		newState.cartItems[newState.cartItems.length] = payload;
		sessionStorage.setItem('shoppingCart', JSON.stringify(newState));
		return newState;
	},

	updateQuantity(state, payload) {
		const {...newState} = state;
		newState.cartItems = payload;
		sessionStorage.setItem('shoppingCart', JSON.stringify(newState));
		return newState;
	},

	updateCartCalculations(state, payload) {
		const {...newState} = state;
		newState.cartCalculations.totalCost = payload.totalCost;
		newState.cartCalculations.numberOfDistinctItems = payload.numberOfDistinctItems;
		sessionStorage.setItem('cartCalculations', JSON.stringify(newState));
		return newState;
	},

	clearCart(state, payload) {
		const {...newState} = state;
		newState.order = payload.order;
		newState.cartItems = payload.cartItems;
		newState.cartCalculations = payload.cartCalculations;
		sessionStorage.setItem('shoppingCart', JSON.stringify(newState));
		return newState;
	},

	clearCartCalculations(state, payload) {
		const {...newState} = state;
		newState.cartCalculations.totalCost = payload.totalCost;
		newState.cartCalculations.numberOfDistinctItems = payload.numberOfDistinctItems;
		sessionStorage.setItem('cartCalculations', JSON.stringify(newState));
		return newState;
	},

	processOrder(state, payload) {
		const {...newState} = state;
		newState.order = payload;
		return newState;
	},

	shoppingCartStateUpdate(state, payload) {
		const {...newState} = state;
		newState.shoppingCartState = payload.shoppingCartState;
		return newState;
    },
}