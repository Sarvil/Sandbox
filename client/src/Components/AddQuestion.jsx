import { useState } from "react";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";
import FormData from 'form-data'
import axios from "axios";

const URL = "http://localhost:1337/api/upload/question";

export const AddQuestion = () => {

const {user} = useAuth();

const [question, setQuestion] = useState({
    "email": user.email,
    "question": "",
    "answer": "",
    "timestamp": Date.now().toString()
});

const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setQuestion({
        ...question,
        "email": user.email,
        [name]: value,
    });
};

const [file, setFile] = useState();
    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post("http://localhost:1337/api/upload/images/", formData);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }

    }

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(URL,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(question),
        });
        if(response.ok){
            console.log(question);
            toast.success("Question Successfully Added");
        }
    }catch(error){
        console.log(error);
    }
};

    return(
        <>
            <div className="question-form">
            <h1>Add Question</h1>
                <div>
                    <label>Username : {user.username}</label>
                </div>
            <form onSubmit={handleSubmit}>
            <div className="question-heading">
                <div>
                    <label htmlFor="email">EMail: </label>
                    <input type="email" name="email" id="email" required autoComplete="off" value={user.email} disabled/>
                </div>
                <div>
                    <label htmlFor="question">Enter the Question: </label>
                    <textarea name="question" placeholder="Enter Question here.." id="question" required autoComplete="off" value={question.question} onChange={handleInput} />
                </div>
                <div>
                    <label htmlFor="answer">Enter the Answer: </label>
                    <textarea name="answer" placeholder="Enter Question here.. or leave blank" id="answer" required autoComplete="off" value={question.answer} onChange={handleInput} />
                </div>
                <br/>
                <button type="submit" >Submit Question</button>
            </div>
            <div className="image-container">
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <br/>
                <button type="button" onClick={upload}>Upload</button>
            </div>
            </form>
            </div>
        </>
    );
}