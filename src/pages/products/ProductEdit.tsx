import axios from "axios";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";
import Wrapper from "../../components/Wrapper"

export default function ProductEdit(props: any) {
    const [productTitle, setProductTitle] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImage, setProductImage] = useState("");
    const [redirect, setRedirect] = useState(false);

    const location = useLocation();
    const id = location.state.product.id;

    useEffect(() => {
        (
            async () => {
                const product = await axios.get(`products/${id}`)
                setProductDescription(product.data.description)
                setProductImage(product.data.image)
                setProductPrice(product.data.price)
                setProductTitle(product.data.title)
            }
        )()
    }, [id])

    async function submit(e: SyntheticEvent) {
        e.preventDefault();

        await axios.put(`products/${id}`, {
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
                    <input className="form-control" required onChange={e => setProductTitle(e.target.value)} defaultValue={productTitle} />
                </div>

                <div className="mb-3">
                    <label>Description</label>
                    <textarea className="form-control" onChange={e => setProductDescription(e.target.value)} defaultValue={productDescription} />
                </div>

                <div className="mb-3">
                    <label>Price</label>
                    <input className="form-control" required onChange={e => setProductPrice(e.target.value)} defaultValue={productPrice} />
                </div>

                <div className="mb-3">
                    <label>Image</label>
                    <div className="input-group">
                        <input className="form-control" value={productImage} onChange={e => setProductImage(e.target.value)} defaultValue={productImage} />
                        <ImageUpload uploaded={setProductImage} />
                    </div>
                </div>

                <button className="btn btn-outline-secondary">Save</button>

            </form>
        </Wrapper>
    )
}