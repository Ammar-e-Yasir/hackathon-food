import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/context";
import { db, collection, where, query, getDocs, doc, setDoc, addDoc, auth, getDoc } from '../configs/firebase'


export default function RestDishes() {

    const { state } = useContext(GlobalContext);
    const [allDishes, setAllDish] = useState([]);
    let uid = localStorage.getItem("restId");


    useEffect(async () => {
        try {
            const q = query(collection(db, "dishes"), where("uid", "==", uid));

            let dishRef = await getDocs(q);
            let allDishClone = allDishes.slice(0);
            dishRef.forEach((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                allDishClone.push(obj)

            })

            setAllDish(allDishClone);
        }

        catch (e) {

        }


    }, []);


    const orderItem = async (element) => {
        let a = doc(db, "dishes", element.id);
        let b = await getDoc(a);

        let obj = b.data();
        obj.custID = state.authUser.uid;

        let orderRef = collection(db, 'orders');
        await addDoc(orderRef, obj)
        alert('Order has been done !')



    }

    return (
        <div style={{ marginTop: "0vh" }}>
            <h1 style={{ textAlign: "center", color: "#fff", fontWeight: "800", textShadow: "2px 2px 2px black" }} >Our Food</h1>
            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap", marginTop:"5vh" }} className="row row-cols-1 row-cols-md-2 g-4">
                {allDishes.map(({ foodname, foodImg, category, delivery, price, id }, index) => {
                    return (
                        <div key={index} className='border rounded mt-5 mx-1 p-2 row' style={{ backgroundColor: "#fff", overflow: "hidden", textAlign: "left" }} id={id}>
                            <div className="card">
                                <img className="card-img-top" src={foodImg} style={{ width: "100%" }} />
                                <div className="card-body">
                                    <h3 className="card-title">Dish : {foodname}</h3>
                                    <h5>Category : {category}</h5>
                                    <p className="card-text">Price : {price}</p>
                                    <p className="card-text">Delivery : {delivery}</p>
                                    <button className='btn btn-success w-100' onClick={(e) => { orderItem(e.target.parentNode) }}>Order</button>
                                </div>
                            </div>
                        </div>
                    )

                })
                }
            </div>
        </div>
    )
}