/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Wrapper from '../../components/Wrapper'
import { Role } from '../../models/Role';

export default function Roles() {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`roles`);
                setRoles(data);
            }
        )()
    }, [])


    const deleteRole = async (id: number) => {
        if (window.confirm("Are you sure to delete this record?")) {
            await axios.delete(`roles/${id}`)

            // also delete from state
            setRoles(roles.filter((role: Role) => role.id !== id));
        }
    }

    const renderRoles = () => {
        return roles.map((role: Role) => {
            return (
                <tr key={role.id}>
                    <td>{role.id}</td>
                    <td>{role.name}</td>
                    <td>
                        <div>
                            <Link to={`/roles/${role.id}/edit`} state={{ role }} className="btn btn-sm btn-outline-secondary">Edit</Link>
                            <a href="#" className="btn btn-sm btn-outline-secondary" onClick={() => deleteRole(role.id)}>Delete</a>
                        </div>
                    </td>
                </tr >
            )
        })
    }


    return (
        <Wrapper>

            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to={"/roles/create"} className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRoles()}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    )
}