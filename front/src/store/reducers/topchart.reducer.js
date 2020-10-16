const initialState = {
    chartSongs: {}
}

function chartReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_HOT_CHART":
            return {
                ...state,
                chartSongs: action.payload.tracks
            };
        default:
            return state;
    }
}

export default chartReducer;