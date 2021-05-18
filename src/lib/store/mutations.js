export default {
	navigate(state, payload) {
		const {...newState} = state;
		newState.path = payload;
		return newState;
	}
}