export const mapReduxStateToProps = state => ({
    token : state.token,
    user : state.user,
    location : state.location,
    tags: state.tags
});
export const mapReduxDispatchToProps = dispatch => ({ 
    updateToken: (token) => dispatch({type: "SET_TOKEN", payload:token}),
    removeToken: () => dispatch({type: "UNSET_TOKEN"}),
    updateUser: (user_data) => dispatch({type: "SET_USER", payload:user_data}),
    removeUser: () => dispatch({type: "UNSET_USER"}),
    updateLocation: (location) => dispatch({type: "SET_LOCATION", payload:location}),
    removeLocation: () => dispatch({type: "UNSET_LOCATION"}),
    updateTags: (tagData) => dispatch({type: "SET_TAGS", payload:tagData}),
    removeTags: () => dispatch({type: "UNSET_TAGS"}),
});
