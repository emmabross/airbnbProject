import SpotForm from "../SpotForm";

const UpdateSpot = () => {
    const spot = {
        country: "",
        address: "",
        city: "",
        state: "",
        description: "",
        name: "",
        price: "",
        previewImage: "",
        image: ""
    };

    return <SpotForm spot={spot} formType="Update Spot" />;
};

export default UpdateSpot;