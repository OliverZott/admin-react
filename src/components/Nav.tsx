import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { User } from "../models/User";


const Nav = (props: { user: User }) => {

    const logout = async () => {
        const data = await axios.post('logout', {});
        console.log(data);
    }

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>

            <ul className="my-2 my-md-0 mr-md-3">
                <Link to={"/profile"} className="p-2 text-white" >{props.user.name}</Link>
                <Link to={"/login"} className="p-2 text-white" onClick={logout}>Sign Out</Link>
            </ul>
        </nav>
    )
}


const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    };
}


export default connect(mapStateToProps)(Nav);