import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpotThunk, fetchSpotsThunk } from "../../store/spots";
import { Link, NavLink } from "react-router-dom";
import "./ManageSpots.css";

const ManageSpots = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)
    const spotsObj = useSelector(state => state.spots.allSpots)
    const spots = Object.values(spotsObj); //populates store

    useEffect(() => {
        dispatch(fetchSpotsThunk())
    }, [dispatch])

    console.log("spots", spots);
    console.log("owner Id", spots.ownerId);
    console.log("USER", user)
    return (
        <div className="manage-spots-body">
            <div className="manage-spots-header">
                <h1>Manage Your Spots</h1>
                <button type="submit">
                    <NavLink exact to="/spots/new">Create a New Spot</NavLink>
                </button>
            </div>
        <span className="spots-container">
            <div className="spot-container">
                {
                    spots.map(spot => (
                        <>
                        {spot.ownerId === user.id ? (
                            <div className="spot-card">
                                <Link to={`/spots/current`}>
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
                                <div className="spot-buttons-container">
                                    <button type="submit">
                                        <NavLink exact to="/spots/:spotId/edit">Update Spot</NavLink>
                                    </button>
                                </div>
                            </div>
                           ) : (null)
                        }
                        </>
                    ))
                }
            </div>
        </span>
        </div>
    )
}

export default ManageSpots;