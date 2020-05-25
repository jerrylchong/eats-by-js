export const mapReduxStateToProps = state => ({
    token : state.token,
    user : state.user
});
export const mapReduxDispatchToProps = dispatch => ({ 
    updateToken: (token) => dispatch({type: "SET_TOKEN", payload:token}),
    removeToken: () => dispatch({type: "UNSET_TOKEN"}),
    updateUser: (user_data) => dispatch({type: "SET_USER", payload:user_data}),
    removeUser: () => dispatch({type: "UNSET_USER"}),
});
