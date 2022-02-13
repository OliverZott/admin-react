import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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


    const logout = async () => {
        const data = await axios.post('logout', {});
        console.log(data);
    }


    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>

            <ul className="my-2 my-md-0 mr-md-3">
                <Link to={"/profile"} className="p-2 text-white" >{user?.user}</Link>
                <Link to={"/login"} className="p-2 text-white" onClick={logout}>Sign Out</Link>
            </ul>
        </nav>
    )
}

export default Nav;
