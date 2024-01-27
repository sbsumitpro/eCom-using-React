import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { productSelector } from "../../redux/reducers/productReducer";
import css from "./ProductDetails.module.css"


export const ProductDetails = ()=>{
    const [addCart, setAddCart] = useState(false)

    const pid = Number(useParams().id);
    const products = useSelector(productSelector);
    const product = products.find((product)=>product.id===pid)
    console.log(css)

    const handleAddToCart = ()=>{
        setAddCart(!addCart)
    }
 

    return(
        <>
            <div className={css.container}>
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
            </div>
        </>
    )
}