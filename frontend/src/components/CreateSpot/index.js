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
        previewImage: "",
        image: ""
    };
    return  <SpotForm spot={spot} formType="Create a New Spot" />;
};

export default CreateSpot;
