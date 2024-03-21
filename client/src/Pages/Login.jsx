import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:1337/api/auth/login/";

export const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const { storeTokenInLS, userAuthentication } = useAuth();
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try { 
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            const res_data = await response.json();
            if (response.ok) {
                storeTokenInLS(res_data.token);
                toast.success("login Successful");
                navigate("/");
                userAuthentication();
            } else {
                console.log(response.status);
                toast.error(res_data.extradetails ? res_data.extradetails : res_data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <section>
                <main>
                    <div className="section-login">
                        <div className="container grid grid-two-cols">
                            <div className="login-image">
                                <img src="/images/Sukhoi.png" alt="Sukhoi" width="auto" height="500" />
                            </div>
                            <div className="login-form">
                                <h1 className="main-heading mb-3" >Login</h1>
                                <br />
                                <form onSubmit={handleLoginSubmit}>
                                    <div>
                                        <label htmlFor="email">Email ID: </label>
                                        <input type="email" name="email" placeholder="Email ID" id="email" required autoComplete="off" value={user.email} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="passowrd">Password: </label>
                                        <input type="password" name="password" placeholder="Password" id="password" required autoComplete="off" value={user.password} onChange={handleInput} />
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-submit">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};