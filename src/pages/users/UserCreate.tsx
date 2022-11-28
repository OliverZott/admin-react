import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { Role } from "../../models/Role";


export const UserCreate = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [roleId, setRoleId] = useState("");
    const [roles, setRoles] = useState([]);
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        (
            async () => {

                const { data } = await axios.get("roles");
                setRoles(data);
            }
        )()
    }, [])


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post("users", {
            first_name: firstName,
            last_name: lastName,
            email: email,
            role_id: roleId
        });
        setRedirect(true);
    };


    if (redirect) {
        return <Navigate to={'/users'} />;
    }


    return (
        <Wrapper>
            <form onSubmit={submit}>

                <div className="mb-3">
                    <label>First Name</label>
                    <input className="form-control" required onChange={e => setFirstName(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label>Last Name</label>
                    <input className="form-control" required onChange={e => setLastName(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label>E-Mail</label>
                    <input className="form-control" required onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label>Role</label>
                    <select className="form-control" onChange={e => setRoleId(e.target.value)} placeholder="Please Select">
                        <option value="" disabled selected>Select your option</option>

                        {roles.map((role: Role) => {
                            return (
                                <option key={role.id} value={role.id}>{role.name}</option>

                            )
                        })}

                    </select>
                </div>

                <button className='w-100 btn bnt-lg btn-primary' type='submit' >Submit</button>
            </form>
        </Wrapper>
    )
};
