
import { act } from "@testing-library/react";

const initialState = {
    movies : []
}

const movieReducer = (state = initialState, action) => {
    console.log("Adding movies",state,action.type)
    switch (action.type) {
        case "ADD_MOVIES":
            console.log("Adding movies case",action.payload)
            return { ...state, movies: action.payload };
        default:
            return state;
    }
}
export default movieReducer;
