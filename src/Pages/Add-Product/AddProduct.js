import { useState } from "react";
import css from "./AddProduct.module.css";
import {actions} from "../../redux/reducers/productReducer"
import { useDispatch, useSelector } from "react-redux";
import { notificationSelector, resetNotification } from "../../redux/reducers/notificationReducer";
 /* console.log(css) */

export const AddProduct = ()=>{
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("")
    const[desc, setDesc] = useState("")
    const message = useSelector(notificationSelector)

    const dispatch = useDispatch();

    if(message){
        setTimeout(()=>{
            dispatch(resetNotification())
        },3000)
    }

    const handleAdd =(e)=>{
        e.preventDefault();
        console.log(name, price, rating, desc)
        dispatch(actions.add({name, price, rating, desc}));
    }
    return(
        <>
            {
            message && 
            <div className="alert alert-success" role="alert">
            {message}
            </div>
            }
        <div className={css.container}>
        <div className={css.addProduct_form_container} >
            <h1>Add a Product</h1>
            <form action="">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <label htmlFor="price">Price</label>
                <input type="text" id="price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                <label htmlFor="rating">Rating</label>
                <input type="text" id="rating" value={rating} onChange={(e)=>setRating(e.target.value)} />
                <label htmlFor="desc">Description</label>
                <textarea cols="2" rows="5" id="desc" value={desc} onChange={(e)=>setDesc(e.target.value)}></textarea>
                <button onClick={handleAdd}>Add Product</button>
            </form>
        </div>
        </div>
        </>
    )
}