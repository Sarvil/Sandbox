import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_BACKEND_URL+"/api/auth/register/";

export const Registration = () => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        phoneNo: "",
        password: ""
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
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
            console.log(res_data);

            if (response.ok) {
                //storeTokenInLS(res_data.token);
                setUser({
                    username: "",
                    email: "",
                    phoneNo: "",
                    password: ""
                });
                toast.success("Email has been sent to your email\nPlease Verify.");
                navigate("/Login");
            } else {
                toast.error(res_data.extradetails ? res_data.extradetails : res_data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Registration Form</h1>
                            <br />
                            <form onSubmit={handleFormSubmit}>
                                <div>
                                    <label htmlFor="username">Username: </label><br/>
                                    <input type="text" name="username" placeholder="Username" id="username" required autoComplete="off" value={user.username} onChange={handleInput} />
                                </div>
                                <div>
                                    <label htmlFor="email">Email ID: </label><br/>
                                    <input type="email" name="email" placeholder="Email ID" id="email" required autoComplete="off" value={user.email} onChange={handleInput} />
                                </div>
                                <div>
                                    <label htmlFor="phoneNo">Phone No: </label><br/>
                                    <input type="number" name="phoneNo" placeholder="Phone No" id="phoneNo" required autoComplete="off" value={user.phoneNo} onChange={handleInput} />
                                </div>
                                <div>
                                    <label htmlFor="password">Password: </label><br/>
                                    <input type="password" name="password" placeholder="Password" id="password" required autoComplete="off" value={user.password} onChange={handleInput} />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-submit">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    </>
};