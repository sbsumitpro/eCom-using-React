import { Provider } from "react-redux";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import {Navbar} from "./components/Navbar/Navbar";
import {store} from "./redux/store"
import { Product } from "./Pages/Home/Product";
import {AddProduct} from "./Pages/Add-Product/AddProduct"
import { ProductDetails } from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart"

function App() {

  const router = createBrowserRouter([
    {path:"/",element:<Navbar/>,
    children:[
      {index:true,element:<Product/>},
      {path:":id",element:<ProductDetails/>},
      {path:"/add-product",element:<AddProduct/>},
      {path:"/cart", element:<Cart/>}
    ]}
  ]);

  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </div>
  );
}

export default App;
