import { useDispatch, useSelector } from "react-redux";
import { cartSelector, cartActions } from "../../redux/reducers/cartReducer";
import { NavLink } from "react-router-dom";

const Cart = () => {
    const cart = useSelector(cartSelector)
    const dispatch = useDispatch()

    const handleIncreaseCount = (id)=>{
      dispatch(cartActions.increaseCount(id))
    }

    const handleDecreaseCount = (id)=>{
      dispatch(cartActions.decreaseCount(id))
    }

    const handleDelete =(id)=>{
      dispatch(cartActions.delete(id))
    }

    return (
      <section className="h-100 h-custom" style={{ backgroundColor: "#d2c9ff" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div className="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-lg-8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                          <h6 className="mb-0 text-muted">
                            {cart.reduce((total, item)=>{
                                return total+ item.qty
                            },0)} items
                            </h6>
                        </div>
                        <hr className="my-4" />
                        {cart.map((item, ind)=>(
                                <div key={ind}>
                                {/* Item */}
                                <div className="row mb-4 d-flex justify-content-between align-items-center" >
                                <div className="col-md-2 col-lg-2 col-xl-2">
                                    <img
                                    src={item.imgUrl}
                                    className="img-fluid rounded-3"
                                    alt={item.name}
                                    />
                                </div>
                                <div className="col-md-3 col-lg-3 col-xl-3">
                                    <h6 className="text-muted">{item.category}</h6>
                                    <h6 className="text-black mb-0">{item.name}</h6>
                                </div>
                                <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                    <button className="btn btn-link px-2" onClick={() => {handleDecreaseCount(item.id)}}>
                                    <i className="fas fa-minus"></i>
                                    </button>
        
                                    <input
                                    id="form1"
                                    min="0"
                                    name="quantity"
                                    value={item.qty}
                                    type="number"
                                    className="form-control form-control-sm"
                                    />
        
                                    <button className="btn btn-link px-2" onClick={() => {handleIncreaseCount(item.id)}}>
                                    <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                    <h6 className="mb-0">₹ {item.price}</h6>
                                </div>
                                <div className="col-md-1 col-lg-1 col-xl-1 text-end" onClick={()=>handleDelete(item.id)}>
                                    <a href="#!" className="text-muted">
                                    <i className="fas fa-times"></i>
                                    </a>
                                </div>
                                </div>
        
                                <hr className="my-4" />
                                
                                </div>
                        ))}
  
                        <div className="pt-5">
                          <h6 className="mb-0">
                            <NavLink to="/" className="text-body">
                              <i className="fas fa-long-arrow-alt-left me-2"></i>Back to shop
                            </NavLink>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 bg-grey" style={{backgroundColor:"bg-grey"}}>
                      <div className="p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr className="my-4" />
  
                        {/* ... rest of the code for summary and total price ... */}

                        <div className="d-flex justify-content-between mb-5">
                            <h5 className="text-uppercase">Total price</h5>
                            <h5>₹ {cart.reduce((total, item)=>{
                                return total+ item.price *item.qty
                            },0)}</h5>
                        </div>
  
                        <button
                          type="button"
                          className="btn btn-dark btn-block "
                          data-mdb-ripple-color="dark"
                        > Proceed</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

export default Cart;
  