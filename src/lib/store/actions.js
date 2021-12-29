import data from '../../data/data.js';

export default {
	productDataAPIFetch(context, payload) {
        try {
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

        // VALIDATION STEP
        // Checking if the payload quantity is a number
        // If not, the payload is not valid
        if (isPayloadValid && !Number.isInteger(payload.quantity)) {
            isPayloadValid = false;
            addToCartFailNotification(isPayloadValid, genericFailMessage);
        }

        // VALIDATION STEP
        // Checking if the payload's quantity is below 1
        // If it is, the payload is not valid
        if (isPayloadValid && payload.quantity < 1) {
            isPayloadValid = false;
            addToCartFailNotification(isPayloadValid, genericFailMessage);
        }

        // VALIDATION STEP
        // Checking if the payload's quantity is above 10
        // If it is, the payload is not valid
        if (isPayloadValid && payload.quantity > 10) {
            isPayloadValid = false;
            addToCartFailNotification(isPayloadValid, genericFailMessage);
        }

        // VALIDATION STEP
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

        // VALIDATION STEP
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

        // Processing the valid payload
        if (isPayloadValid && itemExists) {
            const calculations = {};
            ///Grabbing the existing total cost
            calculations.totalCost = Number(context.state.cartCalculations.totalCost);
            //Grabbing the existing number of distinct items
            calculations.numberOfDistinctItems = Number(context.state.cartCalculations.numberOfDistinctItems);
            //Grabbing the existing cart items
            calculations.cartItems = context.state.cartItems;

            // Checking if item is distinct
            context.state.cartItems.forEach((item) => {
                if (item.id === payload.id) {
                    isItemDistinct = false;
                }
            });

            if (isItemDistinct) {
                calculations.numberOfDistinctItems++;
                calculations.totalCost = (calculations.totalCost + (payload.price * payload.quantity));
                context.commit('addToCart', payload); //Adds unique items to the cart
                context.commit('updateCartCalculations', calculations);
            } else {
                for (let i = 0; i < calculations.cartItems.length; i++) {
                    if (calculations.cartItems[i].id === payload.id) {
                        calculations.cartItems[i].quantity += payload.quantity; //Updating quantity
                        calculations.totalCost += (payload.price * payload.quantity); //Updating total cost
                        context.commit('updateQuantity', calculations.cartItems);
                        context.commit('updateCartCalculations', calculations);
                        break;
                    }
                }
            }
        }
	},

    incrementQuantity(context, payload) {
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
        const payload = {}
        payload.cartCalculations = { totalCost: 0, numberOfDistinctItems: 0 };
        payload.order = {};
        payload.cartItems = [];

        context.commit('clearCart', payload);
    },

    processOrder(context, payload) {
        context.commit('processOrder', payload);
    },

    openShoppingCart(context) {
        const payload = {};
        payload.shoppingCartState = 'visible';
        context.commit('shoppingCartStateUpdate', payload);
    },

    closeShoppingCart(context) {
        const payload = {};
        payload.shoppingCartState = 'hidden';
        context.commit('shoppingCartStateUpdate', payload);
    },
}