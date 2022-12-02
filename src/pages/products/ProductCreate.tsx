import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import Wrapper from "../../components/Wrapper"

export default function ProductCreate() {
    const [productTitle, setProductTitle] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImage, setProductImage] = useState("");
    const [redirect, setRedirect] = useState(false);


    async function submit(e: SyntheticEvent) {
        e.preventDefault();

        await axios.post("products", {
            title: productTitle,
            description: productDescription,
            image: productImage,
            price: productPrice
        });
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={`/products`}></Navigate>
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>

                <div className="mb-3">
                    <label>Title</label>
                    <input className="form-control" required onChange={e => setProductTitle(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label>Description</label>
                    <input className="form-control" required onChange={e => setProductDescription(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label>Price</label>
                    <input className="form-control" required onChange={e => setProductPrice(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label>Image</label>
                    <input className="form-control" required onChange={e => setProductImage(e.target.value)} />
                </div>

                <button className="btn btn-outline-secondary">Save</button>

            </form>
        </Wrapper>
    )
}