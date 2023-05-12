import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpotThunk, fetchSpotsThunk } from "../../store/spots";
import { Link } from "react-router-dom";

import "./GetAllSpots.css";

const GetAllSpots = () => {
    const dispatch = useDispatch();


    const spotsObj = useSelector(state => state.spots.allSpots)
    const spots = Object.values(spotsObj); //populates store
    useEffect(() => {
        dispatch(fetchSpotsThunk())
    }, [dispatch])

    console.log("spots", spots);
    return (
        <div className="landing-page-container">
            <div className="spots-container">
                <ul>
                    {
                        spots.map(spot => (
                            <>
                                <div className="spot-card">
                                    <Link to={`/spots/${spot.id}`}>
                                    <span className="tooltip">
                                        <span className="tooltiptext">{spot.name}</span>
                                    </span>
                                    <img className="spot-img" src={spot.previewImage} alt={"Image"} title={spot.name} />
                                    <div className="spot-info-container">
                                        <span className="spot-location">{spot.city}, {spot.state}</span>
                                        <span className="spot-price">${spot.price} night</span>
                                        <div className="spot-rating">
                                            <i className="fa-solid fa-star" />
                                            {spot?.avgRating >= 5 ? `${spot.avgRating}.0` : 'New'}
                                        </div>
                                    </div>
                                    </Link>
                                </div>
                            </>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default GetAllSpots;