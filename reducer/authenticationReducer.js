const authenticationReducer = (state = "not_set", action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return action.payload;
        default:
            return state;
    }
};
export default authenticationReducer
