import React, { useContext, useEffect, useState } from "react";
import { db, collection, where ,query,getDocs,addDoc,doc,deleteDoc,getDoc} from '../configs/firebase';
import { GlobalContext } from "../context/context";

export default function AccedtedOrders(){
    let uid =  localStorage.getItem('restId');
    const [acceptedOrders , setAcceptedOrders] = useState([]);


    const {state,dispatch } = useContext(GlobalContext);


    useEffect(async () => {
        try{
         const q = query(collection(db, "ordersAccepted"),where("uid", "==", state.authUser.uid));
        let orderRef = await getDocs(q);
        let acceptedOrdersClone = acceptedOrders.slice(0);

        orderRef.forEach((doc) => {
           let obj = doc.data();
            obj.id = doc.id;
            acceptedOrdersClone.push(obj)
        })
        setAcceptedOrders(acceptedOrdersClone)
    }
    catch(e){
        console.log(e)
    }

    }, [state.authUser])
  

    const deliveredOrder = async(element)=>{
        let a = doc(db, "ordersAccepted", element.id);
            let b = await getDoc(a);
            console.log(b.data())
        
        let orderDelivRef = collection(db,'ordersDelivered');
        await addDoc(orderDelivRef,b.data())
        let docDel = doc(db, "ordersAccepted", element.id);
        await deleteDoc(docDel);
    }

    return(
    <div style={{marginTop:"0vh"}}>
        <h1 style={{textAlign:"center",color:"#fff",fontWeight:"800",textShadow:"2px 2px 2px black"}}>Accepted</h1>
        <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",flexWrap:"wrap"}}>
        {acceptedOrders.map(({foodname,foodImg,category,price,custID,id},index)=>{
            return(
                <div key={index} className='border mt-5 p-2 bg-light' style={{backgroundColor:"#fff",height:"fit-content",width:"30%",display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"start",borderRadius:"10px"}} id={id}>
                            <img src={foodImg} className='h-50 w-100' />
                    <h2>{foodname}</h2>
                    <h3>{category}</h3>
                    <p>{price}</p>
                    <p style={{display:'none'}}>{custID}</p>

                    <button className='btn btn-success w-100' onClick={(e)=>{deliveredOrder(e.target.parentNode)}}>Delivered</button>

                </div>
            )
            
        })
    }
    </div>


        </div>
    )
}