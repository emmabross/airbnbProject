import { useState } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { updateSpotThunk, createSpotThunk } from "../../store/spots";

const SpotForm = ({ spot, formType }) => {
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
        <form onSubmit={handleSubmit}>
            <h2>{formType}</h2>
            <div className="errors">{errors.country}</div>
            <label>
                Country:
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
            </label>
            <div className="errors">{errors.address}</div>
            <label>
                Street Address:
                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </label>
            <button type="submit">{formType}</button>
        </form>
    );
};

export default SpotForm;
