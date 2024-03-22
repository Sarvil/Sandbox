import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";
import { CgMenu, CgCloseR } from "react-icons/cg";

export const Navbar = () => {
    const { isLoggedIn } = useAuth();

    return (
        <>
            <header>
                <div className="container">
                    <div className="logo-brand">
                        <NavLink to="/">LOGO</NavLink>
                    </div>
                    <nav >
                        <ul className="nav-list">
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/services">Services</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact">Contact Us</NavLink>
                            </li>
                            {isLoggedIn ? <li>
                                <NavLink to="/logout">Logout</NavLink>
                            </li>
                                : <>
                                    <li>
                                        <NavLink to="/registration">Registration</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/login">Login</NavLink>
                                    </li>
                                </>
                            }
                        </ul>
                        <div className="mobile-navbar-btn">
                            <CgMenu name="menu-outline" />
                            <CgCloseR name="close-outline" className="close-outline mobile-nav-icon" />
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
};