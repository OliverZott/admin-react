import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { Permission } from "../../models/Permission";


export default function RoleEdit() {
    const [permissions, setPermissions] = useState([]);
    const [selected, setSelected] = useState([] as number[]);
    const [roleName, setRoleName] = useState("");
    const [redirect, setRedirect] = useState(false);

    // Use Role-Object instead useState for each property ???
    // const [role, setRole] = useState({});

    const location = useLocation();
    let id = location.state.role.id;


    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`permissions`);
                setPermissions(data);

                const role = await axios.get(`roles/${id}`);
                setRoleName(role.data.name)
                setSelected(role.data.permissions.map((p: Permission) => p.id));
            }
        )()
    }, [id])


    function checkedPermissions(id: number) {
        if (selected.some(s => s === id)) {
            setSelected(selected.filter(s => s !== id))
            return;
        }
        setSelected([...selected, id]);  // spread current selected values and append new id
    }


    async function submit(e: SyntheticEvent) {
        e.preventDefault();

        await axios.put(`roles/${id}`, {
            name: roleName,
            permissions: selected

        });
        setRedirect(true);
    }


    if (redirect) {
        return <Navigate to="/roles" />
    }


    return (
        <Wrapper>
            <form onSubmit={submit}>

                <div className="mb-3 mt-3 row">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input className="form-control" required onChange={e => setRoleName(e.target.value)} defaultValue={roleName} />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Permissions</label>
                    <div className="col-sm-10">
                        {permissions.map((p: Permission) => {
                            return (
                                <div className="form-check form-check-inline col-3" key={p.id}>
                                    <input className="form-check-input" type="checkbox"
                                        value={p.id}
                                        checked={selected.some(s => s === p.id)}
                                        onChange={() => checkedPermissions(p.id)}
                                    />
                                    <label className="form-check-label">{p.name}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <button className="btn btn-outline-secondary">Save Changes</button>
            </form>
        </Wrapper>
    )
}
