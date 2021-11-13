import React, { useContext, useEffect, useState } from "react";
import { db, collection, where, query, getDocs, addDoc } from '../configs/firebase';
import { GlobalContext } from "../context/context";

export default function CustDeliveredOrders() {
    let uid = localStorage.getItem('restId');
    const [deliveredOrders, setDeliveredOrders] = useState([]);
    const { state, dispatch } = useContext(GlobalContext);
    let authUserId = localStorage.getItem('authUserId')
    useEffect(async () => {
        try {
            const q = query(collection(db, "ordersDelivered"), where("uid", "==", state.authUser.uid));
            let orderRef = await getDocs(q);
            let deliveredOrdersClone = deliveredOrders.slice(0);
            orderRef.forEach((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                deliveredOrdersClone.push(obj)
            })
            setDeliveredOrders(deliveredOrdersClone)
        }
        catch (e) {
            console.log(e)
        }

    }, [state.authUser])


    return (
        <div style={{ marginTop: "0vh" }}>
            <h1 style={{ textAlign: "center", fontWeight: "800", color: "#fff", textShadow: "2px 2px 2px black" }}>Delivered</h1>
            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap" }}>
                {deliveredOrders.map(({ foodname, foodImg, category, price, custID, id }, index) => {
                    return (
                        <div key={index} className='border mt-5 p-2 bg-light' style={{ backgroundColor: "#fff", height: "fit-content", width: "30%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "start", borderRadius: "10px" }} id={id}>
                            <img src={foodImg} className='h-50 w-100' />
                            <h2>{foodname}</h2>
                            <h3>{category}</h3>
                            <p>{price}</p>
                            <p style={{ display: 'none' }}>{custID}</p>

                        </div>
                    )

                })
                }
            </div>


        </div>
    )
}