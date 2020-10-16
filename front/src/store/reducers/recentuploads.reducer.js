const initialState = {
    recentUploads: {}
}

function recentUploadsReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_RECENT":
            return {
                ...state,
                recentUploads: action.payload
            };
        default:
            return state;
    }
}

export default recentUploadsReducer;