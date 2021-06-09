export default {
	navigate(context, payload) {
		context.commit('navigate', payload);
	},

	async productDataAPIFetch(context, payload) {
        try {
            const data = (await import('../../data/data.js')).default;
			context.commit('productDataAPIFetch', data);
        } catch (error) {
            console.log(`Error @ deataFetch:`, error);
        }
    },

    addToCart(context, payload) {

        payload.name = payload.name.replace(" Headphones", "");
        payload.name = payload.name.replace(" Earphones", "");
        payload.name = payload.name.replace(" Wireless", "");

        let isPayloadValid = true;
        let itemExists = false;
        let isItemDistinct = true;

        const genericFailMessage = `Something went wrong. Please try again.`;
        const itemNotFoundMessage = `Item not found.`;

        // Checking if the payload quantity is a number
        // If not, the payload is not valid
        if (isPayloadValid && !Number.isInteger(payload.quantity)) {
            isPayloadValid = false;
            addToCartFailNotification(isPayloadValid, genericFailMessage);
        }

        // Checking if the payload's quantity is below 1
        // If it is, the payload is not valid
        if (isPayloadValid && payload.quantity < 1) {
            isPayloadValid = false;
            addToCartFailNotification(isPayloadValid, genericFailMessage);
        }

        // Checking if the payload's quantity is above 10
        // If it is, the payload is not valid
        if (isPayloadValid && payload.quantity > 10) {
            isPayloadValid = false;
            addToCartFailNotification(isPayloadValid, genericFailMessage);
        }

        // Checking if the payload's quantity + thy quantity of the same item in the cart is above 10
        // If it is, the payload is not valid
        // THIS DOES ALLOW THE CUSTOMER/USER TO OVERWRITE AN OLD AMOUNT WITH A NEW AMOUNT
        // WHEN CLICKING ADD TO CART
        if (isPayloadValid) {
            context.state.cartItems.forEach((cartItem) => {
                if (cartItem.id === payload.id) {
                    if ((cartItem.quantity + payload.quantity) > 10) {
                        isPayloadValid = false;
                        addToCartFailNotification(isPayloadValid, genericFailMessage);
                    }
                }
            });
        }

        // Checking if the item id to see if exists among the store.state.productData
        if (isPayloadValid) {
            for (let i = 0; i < context.state.productData.length; i++) {
                if (context.state.productData[i].id === payload.id) {
                    itemExists = true;
                    break;
                }
            }

            // (itemExists)
            //     ? addToCartFailNotification(isPayloadValid, itemNotFoundMessage)
            //     : addToCartSuccessNotification(payload);
        }

        if (isPayloadValid && itemExists) {
            const calculations = {};
            calculations.totalCost = Number(context.state.cartCalculations.totalCost);
            calculations.numberOfDistinctItems = Number(context.state.cartCalculations.numberOfDistinctItems);            

            context.state.cartItems.forEach((item) => {
                if (item.id === payload.id) {
                    isItemDistinct = false;
                }
            });

            if (isItemDistinct) {
                calculations.numberOfDistinctItems++;
                calculations.totalCost += (payload.price * payload.quantity);
                context.commit('addToCart', payload);
                context.commit('updateCartCalculations', calculations);
            } else {
                const cartItems = context.state.cartItems;
                const cartCalculations = context.state.cartCalculations;

                for (let i = 0; i < cartItems.length; i++) {
                    if (cartItems[i].id === payload.id) {
                        cartItems[i].quantity++;
                        calculations.totalCost += (payload.price * payload.quantity);
                        context.commit('updateQuantity', cartItems);
                        context.commit('updateCartCalculations', cartCalculations);
                        break;
                    }
                }
            }
        }
	},

    incrementQuantity(context, payload) {
        console.log(`INCREMENTING`);
        const cartItems = context.state.cartItems;
        const cartCalculations = context.state.cartCalculations;

        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].id === payload.id && cartItems[i].quantity < 10) {

                cartCalculations.totalCost += cartItems[i].price;
                cartItems[i].quantity++;
                context.commit('updateQuantity', cartItems);
                context.commit('updateCartCalculations', cartCalculations);
                break;
            }
        }
    },

    decrementQuantity(context, payload) {
        console.log(`DECREMENTING`);
        const cartItems = context.state.cartItems;
        const cartCalculations = context.state.cartCalculations;

        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].id === payload.id && cartItems[i].quantity > 1) {

                cartCalculations.totalCost -= cartItems[i].price;
                cartItems[i].quantity--;
                context.commit('updateQuantity', cartItems);
                context.commit('updateCartCalculations', cartCalculations);
                break;
            }
        }
    },

    clearCart(context) {
        const cartItems = [];
        const cartCalculations = { totalCost: 0, numberOfDistinctItems: 0 };

        context.commit('updateQuantity', cartItems);
        context.commit('updateCartCalculations', cartCalculations);
    }
}