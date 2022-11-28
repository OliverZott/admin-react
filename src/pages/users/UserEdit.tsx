import axios from "axios";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { Role } from "../../models/role";


export const UserEdit = (props: any) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [roleId, setRoleId] = useState("");
    const [roles, setRoles] = useState([]);
    const [redirect, setRedirect] = useState(false);

    // ----------------------------------------------------------------------
    // To get the User object from url param in react-router-dom Link from Users.tsx
    const location = useLocation();

    // ----------------------------------------------------------------------
    // To persist mutable objects current state
    let id = useRef(null)
    id = location.state.user.id;


    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get("roles");
                setRoles(data);

                const user = await axios.get(`users/${id}`);
                setFirstName(user.data.first_name);
                setLastName(user.data.last_name);
                setEmail(user.data.email);
                setRoleId(user.data.role.id);
            }
        )()
    }, [])


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put(`users/${id}`, {
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
                    <input className="form-control" required onChange={e => setFirstName(e.target.value)} defaultValue={firstName} />
                </div>

                <div className="mb-3">
                    <label>Last Name</label>
                    <input className="form-control" required onChange={e => setLastName(e.target.value)} defaultValue={lastName} />
                </div>

                <div className="mb-3">
                    <label>E-Mail</label>
                    <input className="form-control" required onChange={e => setEmail(e.target.value)} defaultValue={email} />
                </div>

                <div className="mb-3">
                    <label>Role</label>
                    <select className="form-control" onChange={e => setRoleId(e.target.value)} value={roleId}>
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
