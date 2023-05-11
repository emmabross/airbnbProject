import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import { useDispatch } from "react-redux";
import { updateSpotThunk, createSpotThunk } from "../../store/spots";

const SpotForm = ({ spot, formType, user }) => {
    const history = useHistory();
    const [country, setCountry] = useState(spot?.country);
    const [address, setAddress] = useState(spot?.address);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [description, setDescription] = useState(spot?.description);
    const [name, setName] = useState(spot?.name);
    const [price, setPrice] = useState(spot?.price);
    const [previewImage, setPreviewImage] = useState(spot?.previewImage);
    const [image, setImage] = useState(spot?.image)
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        spot = { ...spot, country, address, city, state, description, name, price, previewImage, image };

        if (formType === "Update Spot") {
            const updatedSpot = await dispatch(updateSpotThunk(spot));
            spot = updatedSpot;
        } else if (formType === "Create Spot") {
            const newSpot = await dispatch(createSpotThunk(spot));
            spot = newSpot;
        }

        if (spot.errors) {
            setErrors(spot.errors);
        } else {
            //redirects to new spot page
            history.push(`/spots/${spot.id}`);
        }
    };


    return (
        <form className="spot-form" onSubmit={handleSubmit}>
            <h2>{formType}</h2>
            <div className="spot-location-container">
                <label>
                    Country:
                    <input
                        placeholder="Country"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                <p className="errors">{errors.country}</p>
                <label>
                    Street Address:
                    <textarea
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <p className="errors">{errors.address}</p>
                <label>
                    City:
                    <textarea
                        placeholder="City"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <p className="errors">{errors.city}</p>
                <label>
                    State:
                    <p className="errors">{errors.state}</p>
                    <textarea
                        placeholder="STATE"
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className="spot-description-container">
                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amentities like
                    fast wif or parking, and what you love about the neighborhood.</p>
                <label>
                    <textarea
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <p className="errors">{errors.description}</p>
            </div>
            <div className="spot-title-container">
                <h3>Create a title for your spot</h3>
                <label>
                    <p>Catch guests' attention with a spot title that highlights what makes
                        your place special.</p>
                    <textarea
                        type="text"
                        placeholder="Name of your spot"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <p className="errors">{errors.name}</p>
            </div>
            <div className="spot-price-container">
                <h3>Set a base price for your spot</h3>
                <label>
                    <p>Competitive pricing can help your listing stand out and rank higher
                        in search results.</p>
                    <textarea
                        placeholder="Price per night (USD)"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
                <p className="errors">{errors.price}</p>
            </div>
            <div className="spot-images-container">
                <h3>Liven up your spot with photos</h3>
                <label>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <textarea
                        placeholder="Preview Image Url"
                        type="text"
                        value={previewImage}
                        onChange={(e) => setPreviewImage(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Image Url"
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Image Url"
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <textarea
                        placeholder="Image Url"
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <textarea
                        placeholder="Image Url"
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </label>
                <p className="errors">{errors.image}{errors.previewImage}</p>
            </div>
            <button type="submit">Create Spot</button>
        </form>
    );
};

export default SpotForm;
