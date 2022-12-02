/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paginator from "../../components/Paginator";
import Wrapper from "../../components/Wrapper";
import { Product } from "../../models/Product";


const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);


    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`products?page=${page}`);
                setProducts(data.data);
                setLastPage(data.meta.last_page)
            }
        )()
    }, [page])


    const deleteProducts = async (id: number) => {
        if (window.confirm("Are you sure to delete this record?")) {
            await axios.delete(`products/${id}`)

            // also delete from state
            setProducts(products.filter((product: Product) => product.id !== id));
        }
    }


    const renderProducts = () => {
        return products.map((product: Product) => {
            return (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td><img alt="#" src={product.image} width="50"></img> </td>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td>
                        <div>
                            <Link to={`/products/${product.id}/edit`} state={{ product }} className="btn btn-sm btn-outline-secondary">Edit</Link>
                            <a href="#" className="btn btn-sm btn-outline-secondary" onClick={() => deleteProducts(product.id)}>Delete</a>
                        </div>
                    </td>
                </tr >
            )
        })
    }


    return (
        <Wrapper>

            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to={"/products/create"} className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderProducts()}
                    </tbody>
                </table>
            </div>

            <Paginator lastPage={lastPage} page={page} pageChanged={page => setPage(page)}></Paginator>

        </Wrapper>
    )
}

export default Products;
