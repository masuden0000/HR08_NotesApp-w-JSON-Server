import React from "react";
import SearchBar from "./searchBar";
import { NavLink } from "react-router-dom";
import '../style/navbar.css'

const Navbar = () => {
    return (
        <div className="container p-0">
            <div className="d-flex flex-row justify-content-between align-items-center mt-4 pb-4 navbarComponent">
                <h2>My Notes</h2>
                <div>
                    <ul className="nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">
                                General Notes
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/archieve">
                                Archive
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <SearchBar />
            </div>
        </div>

    );
};

export default Navbar;
