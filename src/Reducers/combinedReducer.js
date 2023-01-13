import { combineReducers } from "redux";
import actorReducer from "./actorReducer";
import movieReducer from "./movieReducer";
import producerReducer from "./producerReducer";
const allReducers = combineReducers({
    movies:movieReducer,
    actors: actorReducer,
    producers:producerReducer
})

export default allReducers;