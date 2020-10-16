const initialState = {
    searchResults: {}
}

function searchReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_SEARCH_RESULTS":
            return {
                ...state,
                searchResults: action.payload
            };
        default:
            return {...state, searchResults: {}};
    }
}

export default searchReducer;