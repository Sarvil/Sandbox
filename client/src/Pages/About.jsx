import { useAuth } from "../store/auth";


export const About = () => {

    const { user } = useAuth();
    return (
        <>
            <div className="center-page">
                <p>hello, {user.username ? user.username + " To the Website" : "Welcome to the Website"}</p>
                <h1>ABOUT PAGE</h1>
            </div>
        </>
    );
};