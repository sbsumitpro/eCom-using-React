import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import { getInitialState, productSelector } from "../../redux/reducers/productReducer";
import css from "./ProductDetails.module.css"
import { cartActions } from "../../redux/reducers/cartReducer";


export const ProductDetails = ()=>{
    const [addCart, setAddCart] = useState(false)
    useEffect(()=>{
        dispatch(getInitialState())
    },[])

    const pid = Number(useParams().id);

    const products = useSelector(productSelector);
    const product = products.find((product)=>product.id===pid)

    const dispatch = useDispatch()

    const handleAddToCart = ()=>{
        if(!addCart){
            dispatch(cartActions.add({id:product.id, name:product.name, price:product.price, qty:1, imgUrl:product.imgUrl, category:product.category}))
            setAddCart(!addCart)
        }else{
            dispatch(cartActions.delete(product.id))
            setAddCart(!addCart)
        }
    }
 

    return(
        <>
            {product && <div className={css.container}>
                <div className={css.pdContainer}>
                    <div>{product.category}</div>
                    <div className={css.top}>
                        <div>
                            <img src={product.imgUrl} alt="" height="250px" />
                        </div>
                        <div className={css.prdTitle}>
                            <div>
                                <h3>{product.name}</h3>
                                <h5>{product.price}</h5>
                            </div>
                            <div className={css.stars}>
                                {[...Array(Math.floor(product.rating))].map((_,i)=>(
                                    <img 
                                    key={i+10001}
                                    src="https://cdn-icons-png.flaticon.com/128/1828/1828884.png"
                                    alt={`star-${i}`}
                                    height="20px"
                                    />
                                ))}
                            </div>
                            <div>
                                <button onClick={handleAddToCart}>
                                    {addCart?"Remove from cart":"Add to cart"}
                                </button>
                            </div>

                        </div>

                    </div>
                    <div>
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>}
        </>
    )
}