import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpotsThunk } from "../../store/spots";
import { useHistory } from "react-router-dom";

import "./GetAllSpots.css";

const GetAllSpots = () => {
    const dispatch = useDispatch();
//figure out how to use history here or something

    const spotsObj = useSelector(state => state.spots.allSpots)
    const spots = Object.values(spotsObj); //populates store
    useEffect(() => {
        dispatch(fetchSpotsThunk())
    }, [dispatch])
    const history = useHistory()
    const handleClick = () => {
        history.push(`/spots/${spots.spotId}`)
    }
    console.log("spots", spots);
    return (
        <div className="landing-page-container">
            <div className="spots-container">
                <ul>
                    {
                        spots.map(spot => (
                            <>
                                <div className="spot-card">
                                    <button className="spot-button" onClick={handleClick}>
                                    <div className="tooltip">
                                        <span className="tooltiptext">{spot.name}</span>
                                    </div>
                                    <img className="spot-img" src={spot.previewImage} alt={"Image"} title={spot.name} />
                                    <div className="spot-info-container">
                                        <p className="spot-location">{spot.city}, {spot.state}</p>
                                        <p className="spot-price">${spot.price} night</p>
                                        <div className="spot-rating">
                                            {spot?.avgRating >= 5 ? `${spot.avgRating}.0` : 'New'}
                                        </div>
                                    </div>
                                    </button>
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