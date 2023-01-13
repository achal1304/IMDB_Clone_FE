export const updateProducers = producers => {
    return{
        type: "ADD_ALL_PRODUCER",
        payload: producers,
    }
}
