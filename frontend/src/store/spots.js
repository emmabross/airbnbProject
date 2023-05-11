export const FETCH_SPOTS = "spots/FETCH_SPOTS";
export const FETCH_SPOT = "spots/FETCH_SPOT";
export const CREATE_SPOT = "spots/CREATE_SPOT";
export const UPDATE_SPOT = "spots/UPDATE_SPOT";
export const REMOVE_SPOT = "spots/REMOVE_SPOT";

/**  Action Creators: */
export const fetchSpots = (spots) => ({
    type: FETCH_SPOTS,
    spots
});

export const fetchSpot = (spot) => ({
    type: FETCH_SPOT,
    spot
});

export const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot,
});

export const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot,
});

export const removeSpot = (spotId) => ({
    type: REMOVE_SPOT,
    spotId,
});

/** Thunk Action Creators: */
export const fetchSpotsThunk = () => async (dispatch) => {
    const res = await fetch("/api/spots");

    if (res.ok) {
        const spots = await res.json();
        console.log('this is spots', spots)
        dispatch(fetchSpots(spots.Spots));
    }
};

export const fetchSpotThunk = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`);

    if (res.ok) {
        const spot = await res.json();
        console.log('thisis one spot', spot)
        dispatch(fetchSpot(spot));
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const createSpotThunk = (spot) => async (dispatch) => {
    const res = await fetch("/api/spots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot),
    });

    if (res.ok) {
        const newSpot = await res.json();
        dispatch(createSpot(newSpot));
        return newSpot;
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const updateSpotThunk = (spot) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spot.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot),
    });

    if (res.ok) {
        const updatedSpot = await res.json();
        dispatch(updateSpot(updatedSpot));
        return updatedSpot;
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const removeSpotThunk = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        dispatch(removeSpot(spotId));
    } else {
        const errors = await res.json();
        return errors;
    }
};


const initialState = {allSpots: {}, singleSpot: {}}

function spotsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SPOTS: {
            const newState = { ...state, allSpots: {}, singleSpot: {} };
            console.log('ACTIONNNNNN', action)
            action.spots.forEach(spot => newState.allSpots[spot.id] = spot)
            console.log('action SPOTS', action.spots)
            return newState
        }
        case REMOVE_SPOT: {
            const newState = { ...state, allSpots: {...state.allSpots}, singleSpot: {}}
            delete newState.allSpots[action.spotId]
            return newState
        }
        case FETCH_SPOT: {
            const newState = { ...state, allSpots: {}, singleSpot: {} }
            newState.singleSpot[action.spot.id] = action.spot
            return newState
        }
        case CREATE_SPOT: {
            const newState = { ...state }
            newState[action.spot.id] = action.spot
            return newState
        }
        case UPDATE_SPOT: {
            const newState = { ...state }
            newState[action.spot.id] = action.spot
            return newState
        }
        default:
            return state
    }
}

export default spotsReducer;