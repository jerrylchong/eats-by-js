const locationReducer = (state = {hasLocation : false, coords : {}}, action) => {
    switch (action.type) {
        case 'SET_LOCATION':
            return {
                hasLocation : true,
                coords : {lat: action.payload.coords.latitude, lng: action.payload.coords.longitude}
            }
        case 'UNSET_LOCATION':
            return {
                hasLocation : false,
                coords : {lat: null, lng: null}
            }

        default:
            return state;
    }
};
export default locationReducer;
