import { useEffect } from "react";
import { createContext, useContext, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    const [services, setServices] = useState([]);
    const [questions, setQuestions] = useState([]);

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem('token', serverToken);
    };

    let isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken("");
        setUser("");
        return localStorage.removeItem('token');
    };

    // To get currently logged in userData

    const userAuthentication = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token != null) {
                const tokenStr = "Bearer " + token;
                const response = await fetch("http://localhost:1337/api/auth/user", {
                    method: "GET",
                    headers: {
                        Authorization: tokenStr,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.userData);
                }
                else {
                    console.log("Error in " + token);
                }
            }
        } catch (error) {
            console.log("Error fetching user data");
        }
    }

    // To fetch Services data from back end
    const getServices = async () => {
        try {
            const response = await fetch("http://localhost:1337/api/data/service", {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                setServices(data.response);
            }
        } catch (error) {
            console.log("Error while fetching Services from Back end");
        }
    }

    const getQuestions = async () => {
        try {
            const response = await fetch("http://localhost:1337/api/data/questions", {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                setQuestions(data.response);
                console.log(data.response);
            }
        } catch (error) {
            console.log("Error while fetching Questions from Back end")
        }
    }

    useEffect(() => {
        getServices();
        getQuestions();
        userAuthentication();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services, getQuestions, questions, userAuthentication }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the provider");
    }
    return authContextValue;
}