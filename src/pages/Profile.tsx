import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { User } from "../models/User";


export default function Profile() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')


    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`user`)
                setFirstName(data.first_name)
                setLastName(data.last_name)
                setEmail(data.email)
                setPassword(data.Password)
            }
        )()
    }, [])


    async function submitInfo(e: SyntheticEvent) {
        e.preventDefault();

        await axios.put(`user/info`, {
            first_name: firstName,
            last_name: lastName,
            email,
        })
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