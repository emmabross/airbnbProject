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
        lat: 1,
        lng: 1,
        previewImage: "",
        image: ""
    };

    return <SpotForm spot={spot} formType="Update Spot" formTitle="Update Spot" />;
};

export default UpdateSpot;