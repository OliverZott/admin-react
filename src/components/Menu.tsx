import React from "react";
import { NavLink } from "react-router-dom";

// Second variant of creating component (hooks-method)
const Menu = () => {
    return (
        <div id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link active">
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/users" className="nav-link active">
                            Users
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/roles" className="nav-link active">
                            Roles
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/products" className="nav-link active">
                            Products
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/orders" className="nav-link active">
                            Orders
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Menu;
