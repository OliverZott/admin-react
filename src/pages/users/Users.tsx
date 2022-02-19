import axios from "axios";
import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { User } from "../../models/user";


const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);


    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`users?page=${page}`);
                setUsers(data.data);
                setLastPage(data.meta.lastPage)
            }
        )()
    }, [page])  // defines what states it depends on; empty array, to get called only once!




    const next = () => {
        if (page < lastPage) {
            setPage((page + 1));
        }
    }


    const previous = () => {
        if (page > 1) {
            setPage((page - 1));
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
                    <td>{user.name}</td>
                    <td></td>
                </tr>
            )
        })
    }


    return (
        <Wrapper>
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

            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <a href="#" className="page-link mx-auto" onClick={previous}>Previous</a>
                    </li>
                    <li className="page-item">
                        <a href="#" className="page-link mx-auto" onClick={next}>Next</a>
                    </li>
                </ul>
            </nav>

        </Wrapper>
    )
}


export default Users;
