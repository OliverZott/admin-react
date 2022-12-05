/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { Order } from "../../models/Order";
import Paginator from "../../components/Paginator";
import { OrderItem } from "../../models/OrderItem";


const hide = {
    maxHeight: 0,
    transition: '500ms ease-in'
}
const show = {
    maxHeight: '150px',
    transition: '500ms ease-out'
}


export default function Orders() {
    const [orders, setOrders] = useState([])
    const [lastPage, setLastPage] = useState(1)
    const [page, setPage] = useState(0)
    const [selectedOrder, setSelectedorder] = useState(0)


    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`orders?page=${page}`);
                setOrders(data.data)
                setLastPage(data.meta.last_page)
            }
        )();
    }, [page]);


    function selectView(id: number) {
        setSelectedorder(id !== selectedOrder ? id : 0)
    }


    function renderOrders() {
        return (
            orders.map((order: Order) => {
                return (
                    <>
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.name}</td>
                            <td>{order.email}</td>
                            <td>{order.total}</td>
                            <td>
                                <div>
                                    <a href="#" className="btn btn-sm btn-outline-secondary"
                                        onClick={() => selectView(order.id)}>View</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={5}>
                                <div className="overflow-hidden" style={selectedOrder === order.id ? show : hide}>
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

    async function handleExport() {
        const { data } = await axios.post(`export`, {}, { responseType: 'blob' });

        new Blob([data], { type: 'text/csv' });  // what for??

        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');

        link.href = url;
        link.download = 'orders.csv';

        link.click();
    }


    return (
        <Wrapper>

            <div className="pt-3 pb-2 mb-3 border-bottom">
                <a href="#" className="btn btn-sm btn-outline-secondary" onClick={handleExport}>Export</a>
            </div>

            <div className="table-responsive">
                <table className="table table-sm">
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