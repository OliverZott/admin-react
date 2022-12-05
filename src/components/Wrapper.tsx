import axios from "axios";
import { connect } from "react-redux";
import React, { Dispatch, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Menu from "./Menu";
import Nav from "./Nav";
import { User } from "../models/User";
import { setUserAction } from "../redux/actions/setUserAction";


const Wrapper = (props: any) => {
    const [redirect, setRedirect] = useState(false);

    /**
     * Async not working here directly --> using function to wrap async axios-call:
     * This implementation of anonymous function executing directly
     */
    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await axios.get("user", { withCredentials: true });        // credentials are set global as well

                    // dispatch props
                    props.setUser(new User(
                        data.id,
                        data.first_name,
                        data.last_name,
                        data.email,
                        data.role
                    ));

                } catch (e) {
                    console.log(e);
                    setRedirect(true);
                }
            }
        )();
    }, [])

    if (redirect) {
        return <Navigate to={"/login"}></Navigate>
    }

    return (
        <div>
            <Nav />

            <div className="container-fluid">
                <div className="row">
                    <Menu />

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {props.children}
                    </main>
                </div>
            </div>
        </div>
    )
}


// get user in every component (get events from other components)
const mapStateToProps = (state: { user: User }): { user: User } => {
    return {
        user: state.user
    };
}


// send event to other components
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUserAction(user))  // "setUser" is accessed via "props" in component
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);