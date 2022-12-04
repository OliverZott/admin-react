/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { Order } from "../../models/Order";
import Paginator from "../../components/Paginator";
import { OrderItem } from "../../models/OrderItem";


export default function Orders() {
    const [orders, setOrders] = useState([])
    const [lastPage, setLastPage] = useState(1)
    const [page, setPage] = useState(0)



    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`orders?page=${page}`);
                setOrders(data.data)
                setLastPage(data.meta.last_page)
            }
        )();
    }, [page]);




    function renderOrders() {
        return (
            orders.map((order: Order) => {
                return (
                    <>
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.first_name} {order.last_name}</td>
                            <td>{order.email}</td>
                            <td>{order.total}</td>
                            <td>
                                <div>
                                    <a href="#" className="btn btn-sm btn-outline-secondary">View</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={5}>
                                <div>
                                    <table className="table table-sm">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Product</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.order_items.map((item: OrderItem) => {
                                                return (
                                                    <tr >
                                                        <td>{item.id}</td>
                                                        <td>{item.product_title}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.price}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </>
                )
            })
        );
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
                            <th scope="col">Total</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderOrders()}
                    </tbody>
                </table>
            </div>

            <Paginator lastPage={lastPage} page={page} pageChanged={page => setPage(page)}></Paginator>

        </Wrapper>
    )
}