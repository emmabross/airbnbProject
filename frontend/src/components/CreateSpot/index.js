// import  SpotForm  from "./components/SpotForm";
import SpotForm from "../SpotForm";

const CreateSpot = () => {
    console.log('inside create spot component')
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
    return  <SpotForm spot={spot} formType="Create Spot" formTitle="Create a New Spot" />;
};

export default CreateSpot;
