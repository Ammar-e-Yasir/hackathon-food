import React, { useContext, useEffect, } from "react";
import { useState } from "react";
import { db, collection, where, query, getDocs, addDoc, deleteDoc, doc, getDoc } from '../configs/firebase';
import { GlobalContext } from "../context/context";

export default function PendingOrders() {
    let uid = localStorage.getItem('restId');

    const { state, dispatch } = useContext(GlobalContext);
    const [pendingOrders, setAllPendingOrders] = useState([]);
    const [custId, setCustId] = useState();

    useEffect(async () => {
        try {
            const q = query(collection(db, "orders"), where("uid", "==", state.authUser.uid));
            let orderRef = await getDocs(q);
            let pendingOrdersClone = pendingOrders.slice(0);
            orderRef.forEach((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                pendingOrdersClone.push(obj)
            })
            setAllPendingOrders(pendingOrdersClone)
        }
        catch (e) {
            console.log(e)
        }
    }, [state.authUser])


    const acceptedOrder = async (element) => {
        try {
            let a = doc(db, "orders", element.id);
            let b = await getDoc(a);
            let orderAccRef = collection(db, 'ordersAccepted');
            await addDoc(orderAccRef, b.data());
            let docDel = doc(db, "orders", element.id);
            await deleteDoc(docDel);
        }
        catch (e) {
            console.log(e)
        }

    }



    return (
        <div style={{ marginTop: "0vh" }}>
            <h1 style={{ textAlign: "center", color: "#fff", fontWeight: "800", textShadow: "2px 2px 2px black" }}>Pending</h1>
            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap" }}>
                {pendingOrders.map(({ foodname, foodImg, category, price, custID, id }, index) => {
                    return (
                        <div key={index} className='border mt-5 p-2 bg-light' style={{backgroundColor:"#fff",height:"fit-content",width:"30%",display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"start",borderRadius:"10px"}} id={id}>
                            <img src={foodImg} className='h-50 w-100' />
                            <h3>{category}</h3>
                            <h2>{foodname}</h2>
                            <p>{price}</p>
                            <p style={{ display: 'none' }}>{custID}</p>
                            <button className='btn btn-success w-100' onClick={(e) => { acceptedOrder(e.target.parentNode) }}>Accept</button>

                        </div>
                    )

                })
                }
            </div>

        </div>
    )
}