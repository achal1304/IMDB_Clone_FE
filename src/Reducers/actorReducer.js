
import { act } from "@testing-library/react";

const initialState = {
    actors : []
}

const actorReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_ALL_ACTOR":
            return { ...state, actors: action.payload };
        default:
            return state;
    }
}
export default actorReducer;
