import { csrfFetch } from "./csrf";

// export const FETCH_REVIEWS = "reviews/FETCH_REVIEWS";
// export const FETCH_REVIEW = "reviews/FETCH_REVIEW";
export const CREATE_REVIEW = "reviews/CREATE_REVIEW";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

//Action Creators
export const createReview = (review) => ({
    type: CREATE_REVIEW,
    review,
});

export const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
})

export const removeReviewThunk = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        dispatch(removeReview(reviewId));
    } else {
        const errors = await res.json();
        return errors;
    }
};

const initialState = { spot: {}, user: {}, bookings: {} }

function reviewsReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_REVIEW: {
            const newState = { ...state, spot: {}, user: {}, bookings: {} };
            newState[action.review.id] = action.review
            return newState
        }
        case REMOVE_REVIEW: {
            const newState = { ...state, spot: { ...state.spot }, user: {}, bookings: {} }
            delete newState.review[action.reviewId]
            return newState
        }
        default: return state
    }
}

export default reviewsReducer;