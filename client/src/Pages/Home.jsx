import { useState } from "react";
import FormData from 'form-data'
import axios from "axios";
import { useAuth } from "../store/auth";
import { AddQuestion } from "../Components/AddQuestion";

export const Home = () => {
    const [file, setFile] = useState();
    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post("https://dev-n9lp.onrender.com/api/upload/images/", formData);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }

    }

    const { questions } = useAuth();
    const {isLoggedIn} = useAuth();
    console.log(isLoggedIn);

    return (
        <>
            <div className="center-page">
                <h1>HOME PAGE</h1>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <button type="button" onClick={upload}>Upload</button>
                    {
                        isLoggedIn ? <AddQuestion /> : <br/>
                    }
                        <div className="questions-page">
                            {
                                questions.map((curElem, index) => {
                                    const { email, question, answer, } = curElem;
                                    return (
                                        <div className="questions-page question-box" key={index}>
                                            <p>EMail: {email}</p>
                                            <p>Q: {question}</p>
                                            <p>A: {answer}</p>
                                            <br />
                                        </div>
                                    );
                                })
                            }
                        </div>
            </div>
            
        </>
    );
};