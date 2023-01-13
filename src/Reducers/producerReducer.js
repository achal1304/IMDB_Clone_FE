
import { act } from "@testing-library/react";

const initialState = {
    producers : []
}

const producerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_ALL_PRODUCER":
            return { ...state, producers: action.payload };
        default:
            return state;
    }
}
export default producerReducer;
