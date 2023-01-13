import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
const allReducers = combineReducers({
    movies: movieReducer
})

export default allReducers;