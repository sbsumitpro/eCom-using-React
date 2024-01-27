import css from "./Navbar.module.css"
import {NavLink, Outlet } from "react-router-dom"
console.log("---active..",css)

export const Navbar = ()=>{
    return(
        <>
        <div className={css.header}>
            <div className={css.nav}>
            <h1>eCom</h1>
                <ul>
                    <li><NavLink to="/" className={css.navLink} style={(({isActive})=>(isActive?{color:"bisque", fontWeight:"bold"}:undefined))}>Product</NavLink></li>
                    <li><NavLink to="/add-product" className={css.navLink} style={(({isActive})=>(isActive?{color:"bisque",fontWeight:"bold"}:undefined))}>Add a Product</NavLink> </li>
                </ul>
            </div>
            <div className={css.icons_container}>
                <span>
                    S Biswas
                </span>
                <img src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" alt="Account" height="30px"/>
                <img src="https://cdn-icons-png.flaticon.com/128/3144/3144456.png" alt="cart" height="30px" />
            </div>
        </div>
            <Outlet/>
        </>
    )
}