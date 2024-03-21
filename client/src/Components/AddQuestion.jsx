import { useState } from "react";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";

const URL = "https://dev-n9lp.onrender.com/api/upload/question";

export const AddQuestion = () => {

const {user} = useAuth();

const [question, setQuestion] = useState({
    "email": "",
    "question": "",
    "answer": "",
    "timestamp": Date.now().toString()
});

const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setQuestion({
        ...question,
        [name]: value,
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setQuestion({
        ...question,
        "email": user.email,
    });
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
                    <label>Username</label>
                    <input type="text" name="username" id="username" required autoComplete="off" value={user.username} disabled/>
                </div>
            <form onSubmit={handleSubmit}>
            <div className="question-heading">
                <div>
                    <label htmlFor="email">EMail</label>
                    <input type="email" name="email" id="email" required autoComplete="off" value={user.email} disabled/>
                </div>
                <div>
                    <label htmlFor="question">Enter the Question</label>
                    <input type="text" name="question" placeholder="Enter Question here.." id="question" required autoComplete="off" value={question.question} onChange={handleInput} />
                </div>
                <div>
                    <label htmlFor="answer">Enter the Answer</label>
                    <input type="text" name="answer" placeholder="Enter Question here.. or leave blank" id="answer" required autoComplete="off" value={question.answer} onChange={handleInput} />
                </div>
                <br/>
                <button type="submit" >Submit Question</button>
            </div>
            </form>
            </div>
        </>
    );
}