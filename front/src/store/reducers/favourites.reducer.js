const initialState = {
    favouriteSongs: {}
}

function favouriteReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_FAVOURITES":
            return {
                ...state,
                favouriteSongs: action.payload
            };
        default:
            return state;
    }
}

export default favouriteReducer;