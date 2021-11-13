import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { storage, ref, uploadBytes, getDownloadURL } from "../configs/firebase";
import { GlobalContext } from "../context/context";
import { db, addDoc, collection } from "../configs/firebase";

export default function AddDish() {
    const { state } = useContext(GlobalContext);
    const [dishImg, setDishImg] = useState('');
    const [foodname, setFoodName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [delivery, setDelivery] = useState('');
    const [errMsg, setErrMsg] = useState('');

    async function addDish() {
        try {
            const storageRef = ref(storage, `images/${state.authUser.uid}/${dishImg.name}`);
            await uploadBytes(storageRef, dishImg);
            let imgURL = await getDownloadURL(ref(storage, `images/${state.authUser.uid}/${dishImg.name}`));

            let dish = {
                foodImg: imgURL,
                foodname,
                price,
                category,
                delivery,
                uid: state.authUser.uid
            }
            let docRef = await addDoc(collection(db, 'dishes'), dish);
            console.log(docRef.id)
        }
        catch (e) {
            console.log(e)

        }
    }
    return (
        <div className='container' style={{marginTop:"0vh"}}>
                    <h1 className='text-white text-center ' style={{fontWeight:"800",textShadow:"2px 2px 2px black"}}>Add Dish</h1>


            <div className='w-75 mx-auto p-5' >
                <div className="form-group">

                    <input type="file" style={{ backgroundColor: "#fff", width: "100%" }} className="form-control shadow-none" onChange={(e) => { setDishImg(e.target.files[0]) }} />




                    <input type="text" className="form-control shadow-none mt-4" placeholder="Dish name" value={foodname} onChange={(ev) => { setFoodName(ev.target.value) }} />
                    {errMsg ? <small className="form-text text-muted">{errMsg}</small> : null}


                    <input type="number" className="form-control shadow-none mt-4" placeholder="Price" value={price} onChange={(ev) => { setPrice(ev.target.value) }} />
                    {errMsg ? <small className="form-text text-muted">{errMsg}</small> : null}


                    <input type="text" className="form-control shadow-none mt-4" placeholder="Category" value={category} onChange={(ev) => { setCategory(ev.target.value) }} />
                    {errMsg ? <small className="form-text text-muted">{errMsg}</small> : null}



                    <input type="text" className="form-control shadow-none mt-4" placeholder="Delivery type" value={delivery} onChange={(ev) => { setDelivery(ev.target.value) }} />
                    {errMsg ? <small className="form-text text-muted">{errMsg}</small> : null}

                    <button className="btn btn-success mt-4 shadow-none" style={{ width: "100%" }} onClick={addDish}>Add</button>
                </div>



            </div>
        </div>




    )
}


