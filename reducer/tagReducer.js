const tagReducer = (state = {tagData: [], isEmpty: true}, action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return {
                tagData : action.payload,
                isEmpty: false
            }
        case 'UNSET_TAGS':
            return {
                tagData : [],
                isEmpty: true
            }

        default:
            return state;
    }
};
export default tagReducer;
