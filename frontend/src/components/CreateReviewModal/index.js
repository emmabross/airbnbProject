import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function CreateReviewModal() {
    const [description, setDescription] = useState("");
    const { closeModal } = useModal();

    return (
        <>
            <h1>How was your stay?</h1>
            <label>
                <textarea
                    placeholder="Leave your review here..."
                    
                />
            </label>
        </>
    )
}