const userReducer = (state = {isLoggedIn: false, user_data:{}}, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                isLoggedIn : true,
                user_data : action.payload
            }
        case 'UNSET_USER':
            return {
                isLoggedIn : false,
                user_data : {}
            }

        default:
            return state;
    }
};
export default userReducer;
