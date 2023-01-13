export const updateMovies = movies => {
    console.log("Inside updatemovies", movies);
    return{
        type: "ADD_MOVIES",
        payload: movies,
    }
}

// export const updateCompletedMerchantPayment = iscompleted => {
//     return{
//         type: "UPDATE_COMPLETED_PAYMENT",
//         payload: iscompleted,
//     }
// }

// export const setLoggedInCustomer = custId => {
//     return{
//         type: "SET_LOGGEDIN_USER",
//         payload: custId,
//     }
// }