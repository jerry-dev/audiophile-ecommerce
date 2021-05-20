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
}