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

        let isPayloadValid = true;
        let itemFound = false;
        const genericFailMessage = `Something went wrong. Please try again.`;
        const itemNotFoundMessage = `Item not found.`;

        if (isPayloadValid && !Number.isInteger(payload.quantity)) {
            isPayloadValid = false;
            addToCartFailNotification(isPayloadValid, genericFailMessage);
        }

        if (isPayloadValid && payload.quantity < 1) {
            isPayloadValid = false;
            addToCartFailNotification(isPayloadValid, genericFailMessage);
        }

        if (isPayloadValid && payload.quantity > 10) {
            isPayloadValid = false;
            addToCartFailNotification(isPayloadValid, genericFailMessage);
        }

        if (isPayloadValid) {
            for (let i = 0; i < context.state.productData.length; i++) {
                if (context.state.productData[i].id === payload.id) {
                    itemFound = true;
                    break;
                }
            }

            // (itemFound)
            //     ? addToCartFailNotification(isPayloadValid, itemNotFoundMessage)
            //     : addToCartSuccessNotification(payload);
        }

        if (isPayloadValid && itemFound) {
            context.commit('addToCart', payload);
        }
	},
}