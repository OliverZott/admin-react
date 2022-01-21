import React from "react";
import {Link} from "react-router-dom";

// Second variant of creating component (hooks-method)
const Menu = () => {
    return (
        <div id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/" className="nav-link active">
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/users" className="nav-link active">
                            Users
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Menu;
