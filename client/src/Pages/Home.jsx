import { useAuth } from "../store/auth";
import { AddQuestion } from "../Components/AddQuestion";

export const Home = () => {

    const { questions, isLoggedIn, user } = useAuth();
    console.log(isLoggedIn);

    return (
        <>
            <div className="center-page">
                <div>
                    <h2>hello, {user.username ? user.username + " To the Website" : "Welcome to the Website"}</h2>
                </div>
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