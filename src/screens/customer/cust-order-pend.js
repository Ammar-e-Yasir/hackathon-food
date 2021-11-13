import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, db, auth, getDocs } from "../../configs/firebase";
import { GlobalContext } from "../../context/context";
import "../../styles/style.css";



export default function CustPendingOrders() {
    const { state } = useContext(GlobalContext);
    const [ordersPending, setPendingOrders] = useState([]);



    useEffect(async () => {

        try {
            const q = query(collection(db, "orders"), where("custID", "==", state.authUser.uid));

            const querySnapshot = await getDocs(q);
            let ordersPendingClone = ordersPending.slice(0);
            querySnapshot.forEach((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                ordersPendingClone.push(obj)

            });

            setPendingOrders(ordersPendingClone)
        }


        catch (e) {
            console.log(e)
        }

    }, [])


    return (
        <div style={{ marginTop: "0vh" }}>
            <h1 style={{ textAlign: "center", color: "#fff", fontWeight: "800", textShadow: "2px 2px 2px black" }}>Pending</h1>
            <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",flexWrap:"wrap"}}>
                {ordersPending.map(({ foodname, foodImg, category, price, custID, id }, index) => {
                    return (
                        <div key={index} className='border mt-5 p-2 bg-light' style={{backgroundColor:"#fff",height:"fit-content",width:"30%",display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"start",borderRadius:"10px"}} id={id}>
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
