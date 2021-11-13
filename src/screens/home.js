import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";
export default function Home(){
    return (
        <div className='container' style={{backgroundColor:"transparent"}}>


        <div className='w-75 mx-auto p-5' id="main-form" style={{marginTop:'10%',backgroundColor:"transparent"}}>
        <h1 className='text-white text-center rounded' style={{fontWeight:"700",textShadow:"2px 2px 2px black"}}>Join us as</h1>
    <Link to='/rest-reg'><button className="btn btn-warning shadow-none mt-5 w-100" style={{color:"#fff",textShadow:"1px 1px 4px black"}}>Restaurant</button></Link>
    <Link to='/cust-reg'><button className="btn btn-success shadow-none mt-4 w-100">Customer</button></Link>
            <p className='text-center mt-4' style={{color:"#fff",textShadow:"2px 2px 2px black"}}>Already have an account ? <Link to='/' style={{color:"green",textShadow:"2px 2px 2px black",textDecoration:"none",fontWeight:"700"}}>Login here</Link></p>
        </div>


    </div>

    )
}