import axios from "axios";
import { Dispatch, SyntheticEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import Wrapper from "../components/Wrapper";
import { User } from "../models/User";
import { setUserAction } from "../redux/actions/setUserAction";


const Profile = (props: { user: User, setUser: (user: User) => void }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')


    useEffect(() => {
        setFirstName(props.user.first_name)
        setLastName(props.user.last_name)
        setEmail(props.user.email)
    }, [props.user])


    async function submitInfo(e: SyntheticEvent) {
        e.preventDefault();

        const { data } = await axios.put(`user/info`, {
            first_name: firstName,
            last_name: lastName,
            email,
        });

        props.setUser(new User(
            data.id,
            data.first_name,
            data.last_name,
            data.email,
            data.role
        ));
    }


    async function submitPassword(e: SyntheticEvent) {
        e.preventDefault();

        if (password !== passwordConfirm) {
            return
        }

        await axios.put(`user/password`, {
            password: password,
            password_confirm: passwordConfirm
        })
    }


    return (
        <Wrapper>

            <h3>Account information</h3>
            <form onSubmit={submitInfo}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input className="form-control" onChange={e => setFirstName(e.target.value)} defaultValue={firstName}></input>
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input className="form-control" onChange={e => setLastName(e.target.value)} defaultValue={lastName}></input>
                </div>
                <div className="mb-3">
                    <label>EMail</label>
                    <input className="form-control" onChange={e => setEmail(e.target.value)} defaultValue={email}></input>
                </div>

                <button className="btn btn-outline-secondary" >Save</button>
            </form>

            <h3 className="mt-4">Change Password</h3>
            <form onSubmit={submitPassword}>
                <div className="mb-3">
                    <label>Password</label>
                    <input className="form-control" onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label>Password Confirm</label>
                    <input className="form-control" onChange={e => setPasswordConfirm(e.target.value)}></input>
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>

        </Wrapper>
    )
}


const mapStateToProps = (state: { user: User }): { user: User } => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUserAction(user))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);