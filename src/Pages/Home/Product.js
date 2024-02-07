import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { notificationSelector, resetNotification } from "../../redux/reducers/notificationReducer"
import { actions, getInitialState, productSelector } from "../../redux/reducers/productReducer"
import css from "./Product.module.css"

export const Product = ()=>{
    const [editMode, setEditMode] = useState(null)
    const [editedValues, setEditedValues] = useState({});
    const [priceFilter, setPriceFilter] = useState(false);
    const products = useSelector(productSelector);
    const dispatch = useDispatch()

    const message = useSelector(notificationSelector)

    if(message){
        setTimeout(()=>{
            dispatch(resetNotification())
        },3000)
    }

    useEffect(()=>{
        dispatch(getInitialState())
    },[dispatch])

    const handleEdit = (productID)=>{
        setEditMode(productID);
        // console.log("editedValues",editedValues)
        setEditedValues(
            {...editedValues, 
                [productID]:{
                    name:products.find((product,i)=>product.id===productID).name,
                    price:products.find((product,i)=>product.id===productID).price,
                    description: products.find((product,i)=>product.id===productID).description
                }
            
            })
        // console.log("editedValues",editedValues)
    }

    const handleCancel = ()=>{
        setEditMode(null);
        setEditedValues({})
    }

    const handleSave = (productID)=>{
        let {name, price, description} = editedValues[productID]
        let params = {productID,name, price, description }
        dispatch(actions.update(params))
        // console.log("Saved", params)
        setEditMode(null);
    }

    const handleDelete = (productID)=>{
        // console.log("deleted")
        dispatch(actions.delete(productID));
    }

    const handleSort = ()=>{
        setPriceFilter(true)
        dispatch(actions.sort())
    }

    const removeSort = ()=>{
        setPriceFilter(false)
        dispatch(getInitialState())
    }

    return(
        <div className={css.product_container}>
            {
                message && 
                <div className="alert alert-success" role="alert">
                {message}
                </div>
            }
            <div className={css.sort_btn_div}>
                <div className={css.sort_btn}>
                    {priceFilter?(
                        <span>
                            <span>Remove filter</span>
                            <img src="https://cdn-icons-png.flaticon.com/128/1617/1617543.png" alt="cross-btn" onClick={removeSort} />
                         </span>
                    ):( <span className={css.sort_price} onClick={handleSort}>Sort by price</span>)}
                </div>
            </div>
            <div className={css.product_div}>
                {products.map((product,i)=>(
                    <div className={css.product} key={product.id}>
                    <div className={css.img_container}>
                        <NavLink to={`/${product.id}`} >
                            <img src={product.imgUrl} alt="" height="150px"/>
                        </NavLink>
                    </div>
                    <div className={css.prdTitle}>
                        {editMode===product.id?(
                            <div>
                                <input type="text" 
                                value={editedValues[product.id].name || ""}
                                onChange={(e)=>setEditedValues({...editedValues,[product.id]:{...editedValues[product.id],name: e.target.value}})}
                                />
                                <input type="text" 
                                value={editedValues[product.id].price || ""}
                                onChange={(e)=>setEditedValues({...editedValues,[product.id]:{...editedValues[product.id],price: e.target.value}})}
                                />
                            </div>
                        )
                        :(
                            <div>
                                <h3 className={css.prdName}>
                                    <NavLink to={`/${product.id}`} >
                                        {product.name}
                                    </NavLink>
                                </h3>
                                <span>{product.price}</span>
                            </div>
                        )
                        }
  
                        <div className={css.stars}>
                            {[...Array(Math.floor(product.rating))].map((_,i)=>(
                                <img 
                                key={i+10001}
                                src="https://cdn-icons-png.flaticon.com/128/1828/1828884.png"
                                alt={`star-${i}`}
                                />
                            ))}
                        </div>
                        
                    </div>
                    <div className={css.prd_desc}>
                        
                        { editMode === product.id?(<>
                                <textarea
                                    value={editedValues[product.id].description || ""}
                                    onChange={(e)=>setEditedValues({...editedValues,[product.id]:{...editedValues[product.id],description: e.target.value}})}
                                />
                                <div>
                                    <button onClick={handleCancel}> cancel</button>
                                    <button onClick={()=>handleSave(product.id)}> save</button>
                                </div>
                            </>):
                            (<>
                            <span>{product.description}</span>
                            <div>
                                <img src="https://cdn-icons-png.flaticon.com/128/1160/1160515.png" alt="Edit-icon" height="20px" onClick={()=>{handleEdit(product.id)}} />
                                <img src="https://cdn-icons-png.flaticon.com/128/11003/11003153.png" alt="Delete-icon" height="20px" onClick={()=>{handleDelete(product.id)}}/>
                            </div>
                            </> )
                        }

                        
                    </div>
                </div>
                    )
                )}

            </div>
        </div>
    )
}