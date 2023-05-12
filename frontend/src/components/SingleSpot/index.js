import { NavLink, useParams } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { fetchSpotThunk } from "../../store/spots";
import "./SingleSpot.css"

const SingleSpot = () => {
    console.log('inside the single spot component')
    const { spotId } = useParams();
    // const report = {};
    //checks spots store for singleSpot object, if present returns spot
    const spot = useSelector((state) =>
        // state.spots.singleSpot ? state.spots.singleSpot[spotId] : null
        state.spots.singleSpot[spotId]
    );
    const dispatch = useDispatch();
    console.log('spotttt', spot)

    const images = [];

    const showAlert = () => {
        alert("Feature coming soon");
    }

    useEffect(() => {
        dispatch(fetchSpotThunk(spotId));
    }, [dispatch, spotId]);


    if (spot === undefined) { return null };

    if (spot.SpotImages === "No images for this spot") {
            console.log('am i in here')
            return <h1>Loading</h1>};

    return (
        <div className="spot-page-container">
            <div className="spot-container">
                <div className="spot-header-container">
                    <div className="spot-title">
                        <h1>{spot?.name}</h1>
                    </div>
                    <div className="spot-location">
                        <p>{spot?.city}, {spot?.state}</p>
                    </div>
                </div>
                <div className="spot-images-container">
                    <span className="spot-images">
                        <ul>
                            {
                                spot?.SpotImages.map(image => (
                                    <>
                                        <img className="spot-img" src={image.url} alt="image" />
                                    </>
                                ))
                            }
                        </ul>
                    </span>
                </div>
                <div className="spot-details-container">
                    <h2>Hosted by {spot?.Owner.firstName} {spot?.Owner.lastName}</h2>
                    <p className="spot-description">{spot?.description}</p>
                </div>
                <div className="spot-reserve-container">
                    <p className="spot-price">{spot?.price} night</p>
                    <div className="spot-rating">
                        <i className="fa-solid fa-star" />
                        {spot?.avgStarRating >= 5 ? `${spot.avgStarRating}.0` : 'New'}
                    </div>
                    <span className="spot-reviews">
                        {spot?.numReviews === 1 ? `${spot.numReviews} review` : `${spot.numReviews} reviews`}
                    </span>
                    <div className="reserve-button">
                        <button type="button" onClick={showAlert}>Reserve</button>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default SingleSpot;