import React, { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../context/context";
import { useHistory } from "react-router";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import SignIn from '../screens/signin';
import { auth, onAuthStateChanged, db, doc, getDoc, collection, getDocs } from './firebase';

import Nav from "../components/navbar"
import CustomerReg from "../screens/cust-register";
import RestaurantReg from "../screens/rest-reg";
import Home from "../screens/home";
import ResDashboard from "../screens/rest-dashboard";
import CustomerHome from "../screens/cust-home";
import AddDish from "../screens/add-dish";
import RestDishes from "../screens/res-dish";
import Logout from "../screens/logout";
import RestDashboard from "../screens/rest-dashboard";
import PendingOrders from "../screens/pending-orders";
import AcceptedOrders from "../screens/accepted-orders";
import DeliveredOrders from "../screens/delivered-orders";
import CustPendingOrders from "../screens/customer/cust-order-pend";
import CustAcceptOrders from "../screens/customer/cust-order-accept";
import CustDeliveredOrders from "../screens/customer/cust-order-deliv";
export default function App() {
    const { state, dispatch } = useContext(GlobalContext);
    let history = useHistory();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                fetchUserInfo(user.uid);
                
            }

            else {
                
                dispatch({ type: "AUTH_USER", payload: null });
            }
        });

    }, []);

    const fetchUserInfo = async (uid) => {
        let userRef = doc(db, 'users', uid);
        let userInfo = await getDoc(userRef);
        userInfo = userInfo.data();
        dispatch({ type: "AUTH_USER", payload: userInfo });


    }



    return (
        <Router>
            <div>
                <Nav />
                <Switch>
                   
                    {state?.authUser ?
                        null : <>
                            <Route exact path='/' component={SignIn} />
                            <Route path='/home' component={Home} />
                            <Route path='/rest-reg' component={RestaurantReg} />
                            <Route path='/cust-reg' component={CustomerReg} />
                        </>}
                    {state.authUser?.userRole === 'customer' ?
                        <>
                            <Route path='/' exact component={CustomerHome} />
                            <Route path='/rest-dish' component={RestDishes} />
                            <Route path='/cust-order-pend' component={CustPendingOrders} />
                            <Route path='/cust-order-deliv' component={CustDeliveredOrders} />
                            <Route path='/cust-order-accept' component={CustAcceptOrders} />
                        </> : null
                    }

                    {state.authUser?.userRole === 'restaurant' ?
                        <>
                            <Route path='/' exact component={AddDish} />
                            <Route path='/pending-orders' component={PendingOrders} />
                            <Route path='/accepted-orders' component={AcceptedOrders} />
                            <Route path='/delivered-orders' component={DeliveredOrders} />
                        </> : null
                    }

                </Switch>
            </div>
        </Router>
    );
}