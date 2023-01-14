export const updateMovies = movies => {
    return{
        type: "ADD_MOVIES",
        payload: movies,
    }
}