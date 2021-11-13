import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import {useHistory } from 'react-router';
import { auth, createUserWithEmailAndPassword, db, setDoc, doc, } from '../configs/firebase';


function CustomerReg() {
    // let history = useHistory()
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [errMsg, setErrMsg] = useState('');


    const register = async () => {

        try {
            let { user } = await createUserWithEmailAndPassword(auth, email, password);
            let dataRef = doc(db, 'users', user.uid);
            await setDoc(dataRef, {
                cust_name: username,
                email: user.email,
                number: number,
                country: country,
                city: city,
                userRole: 'customer',
                uid: user.uid,
            });

        }

        catch (err) {
  
            setErrMsg(err.message);
            setTimeout(() => {
                setErrMsg('');
            }, 2000)

        }

    }


    return (
        <div className='container'>


            <div className='w-75 mx-auto p-5 ' style={{ }}>
                <div className="form-group">
                    <h1 className='text-white text-center rounded mt-3' style={{fontWeight:"800",textShadow:"2px 2px 2px black"}}>Create your account</h1>
                    {errMsg ? <p className="text-danger text-center" style={{ backgroundColor: 'pink' }}>{errMsg}</p> : null}

                  
                    <input type="text" className="form-control shadow-none mt-4" placeholder="Enter username" value={username} onChange={(ev) => { setUserName(ev.target.value) }} />
                   
                
                  
                    <input type="email" className="form-control shadow-none mt-4" placeholder="Enter email address" value={email} onChange={(ev) => { setEmail(ev.target.value) }} />
                   
               
              
                    <input type="password" className="form-control shadow-none mt-4" placeholder="Enter password" value={password} onChange={(ev) => { setPassword(ev.target.value) }} />
                   

                
       
                    <input type="number" className="form-control shadow-none mt-4" placeholder="Enter your phone number" value={number} onChange={(ev) => { setNumber(ev.target.value) }} />


               
      
                    <input type="text" className="form-control shadow-none mt-4" placeholder="Enter your country" value={country} onChange={(ev) => { setCountry(ev.target.value) }} />
                    {errMsg ? <small className="form-text text-muted">{errMsg}</small> : null}
                    
                

                    <input type="text" className="form-control shadow-none mt-4" placeholder="Enter your city" value={city} onChange={(ev) => { setCity(ev.target.value) }} />


                <button className="btn btn-success mt-4 shadow-none mt-4" style={{width:"100%"}} onClick={() => {
                    if (username != '' && email != '' && password != '' && number != '' && country != '' && city != '') {
                        register();
                    }
                    else {
                        setErrMsg('All field are required');
                        setTimeout(() => {
                            setErrMsg('');
                        }, 2000)
                    }
                }}>Register</button>
                <p className='text-center mt-3' style={{textShadow:"2px 2px 2px black",color:"#fff"}}>Already have an account ? <Link to='/' style={{fontWeight:"800",textShadow:"2px 2px 2px black",color:"green",textDecoration:"none"}}>Login here</Link></p>
                </div>
            </div>


        </div>
    )
}

export default CustomerReg;