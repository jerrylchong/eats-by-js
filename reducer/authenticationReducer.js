const authenticationReducer = (state = "not_set", action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return action.payload;
        case 'UNSET_TOKEN':
            return "not_set";
        default:
            return state;
    }
};
export default authenticationReducer
