import React from "react";


// Second variant of creating component (hooks-method)
const Menu = () => {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link active">
                            Dashboard
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Menu;
