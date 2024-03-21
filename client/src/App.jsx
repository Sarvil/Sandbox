import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { About } from "./Pages/About";
import { Services } from "./Pages/Services";
import { Contact } from "./Pages/Contact";
import { Registration } from "./Pages/Registration";
import { Login } from "./Pages/Login";
import { Logout } from "./Pages/Logout";
import { Navbar } from "./Components/Navbar";
import GoToTop from "./Components/GoToTop";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
                <GoToTop />
            </BrowserRouter>
        </>
    );
};

export default App;