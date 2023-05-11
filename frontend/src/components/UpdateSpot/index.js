import SpotForm from "./SpotForm";

const UpdateSpotForm = () => {
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

    /* **DO NOT CHANGE THE RETURN VALUE** */
    return <SpotForm spot={spot} formType="Update Spot" />;
};

export default UpdateSpotForm;