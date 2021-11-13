import React, { useContext, useEffect, useState } from "react";
import { db, collection, where, query, getDocs } from '../configs/firebase'
import { GlobalContext } from "../context/context";
import { useHistory } from "react-router";
import "../styles/style.css";


export default function CustomerHome() {
    const { state, dispatch } = useContext(GlobalContext);
    const [allRestaurant, setAllRestaurant] = useState([]);
    const [userId, setUserId] = useState({});

    let history = useHistory();
    useEffect(() => {
        setUserId(state.authUser)
    }, [])


    useEffect(async () => {
        const q = query(collection(db, "users"), where("userRole", "==", "restaurant"));

        let restRef = await getDocs(q);
        let allRestaurantClone = allRestaurant.slice(0);
        restRef.forEach((doc) => {
            let obj = doc.data();
            obj.id = doc.id;
            allRestaurantClone.push(obj)
        })

        setAllRestaurant(allRestaurantClone);

    }, [])

    const selectRest = (e) => {
        let restID = e.target.parentNode.id;
        localStorage.setItem('restId', restID)
        history.push('/rest-dish')






    }


    return (
        <>
            <div id="cus-home">
                <h1>Available Restaurants</h1>
                <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",flexWrap:"wrap"}}>
                    {allRestaurant.map(({ res_name, country, city, id }, index) => {
                        return (
                            <div key={index} id={id} className='mt-5 mx-1 p-2' style={{backgroundColor:"#fff",height:"fit-content",width:"30%",display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"start",borderRadius:"10px"}}>
                                <h2>{res_name}</h2>
                                <h4>{country}</h4>
                                <h4>{city}</h4>
                                <button  className='btn btn-success w-100' onClick={selectRest}>Explore</button>

                            </div>
                        )

                    })
                    }
                </div>
            </div>
        </>

    )
}