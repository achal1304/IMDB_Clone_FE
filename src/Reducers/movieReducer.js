
import { act } from "@testing-library/react";

const initialState = {
    movies : []
}

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_MOVIES":
            return { ...state, movies: action.payload };
        default:
            return state;
    }
}
export default movieReducer;
