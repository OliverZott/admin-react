import axios from "axios";
import React, { useEffect, useState } from "react";

const Nav = () => {
    const [user, setUser] = useState({
        user: '',
    });

    useEffect(() => {
        /**
         * Async not working here directly --> using function to wrap async axios-call:
         * This implementation of anonymous function executing directly
         */
        (
            async () => {
                const { data } = await axios.get("user", { withCredentials: true });        // credentials are set global as well

                setUser(data);
                console.log("WOOOORKED =)")
            }
        )();

    }, [])




    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>

            <ul className="my-2 my-md-0 mr-md-3">
                <a className="p-2 text-white" href="#">{user?.user}</a>
                <a className="p-2 text-white" href="#">Sign Out</a>

            </ul>

            {/* <button className="navbar-toggler position-absolute d-md-none collapsed" type="button"
                data-bs-toggle="collapse"
                data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <input className="form-control form-control-dark w-100" type="text" placeholder="Search"
                aria-label="Search" />
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <a className="nav-link px-3">Sign out</a>
                </div>
            </div> */}

        </nav>
    )

}

export default Nav;
