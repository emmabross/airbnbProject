import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpotsThunk } from "../../store/spots";
import "./GetAllSpots.css";

const GetAllSpots = () => {
    console.log('inside the get all spots component')
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots)
    const spots = Object.values(spotsObj); //populates store
    useEffect(() => {
        dispatch(fetchSpotsThunk())
    }, [dispatch])
    console.log("spots", spots);
    return (
        <section className="spots-container">
            <ul>
                {
                    spots.map(spot => (
                        <>
                        <div className="spot-card">
                            <img className="spot-img"src={spot.previewImage} alt={"Image"}/>
                            <div className="spot-info-container">
                                <p className="spot-location">{spot.city}, {spot.state}</p>
                                <p className="spot-price">${spot.price} night</p>
                            </div>
                        </div>
                        </>
                    ))
                }
            </ul>
        </section>
    )
}

export default GetAllSpots;