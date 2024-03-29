/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paginator from "../../components/Paginator";
import Wrapper from "../../components/Wrapper";
import { User } from "../../models/User";


const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);


    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`users?page=${page}`);
                setUsers(data.data);
                setLastPage(data.meta.last_page)
            }
        )()
    }, [page])  // defines what states it depends on; empty array, to get called only once!


    const deleteUser = async (id: number) => {
        if (window.confirm("Are you sure to delete this record?")) {
            await axios.delete(`users/${id}`)

            // also delete from state
            setUsers(users.filter((user: User) => user.id !== id));
        }
    }


    const renderUsers = () => {
        return users.map((user: User) => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name} {user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.role ? user.role.name : '-'}</td>
                    <td>
                        <div>
                            <Link to={`/users/${user.id}/edit`} state={{ user }} className="btn btn-sm btn-outline-secondary">Edit</Link>
                            <a href="#" className="btn btn-sm btn-outline-secondary" onClick={() => deleteUser(user.id)}>Delete</a>
                        </div>
                    </td>
                </tr >
            )
        })
    }


    return (
        <Wrapper>

            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to={"/users/create"} className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderUsers()}
                    </tbody>
                </table>
            </div>

            <Paginator lastPage={lastPage} page={page} pageChanged={page => setPage(page)}></Paginator>

        </Wrapper >
    )
}

export default Users;
