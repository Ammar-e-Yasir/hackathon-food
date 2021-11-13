export let data = {
    authUser:null,
    pendingOrders:[],
    acceptedOrders : [],
    deliveredOrders :[]


}

export function reducer(state, action) {
    switch (action.type) {
        case "AUTH_USER": {
            return {
                ...state,
                authUser: action.payload
            }
        }

       
        case "PENDING_ORDERS": {
            let pendingOrdersClone = state.pendingOrders.slice(0);
            pendingOrdersClone.push(action.payload)
            console.log(pendingOrdersClone)
            return {
                ...state,
                pendingOrders: pendingOrdersClone
            }
        }

        case "ACCEPTED_ORDERS": {
            let acceptedOrdersClone = state.acceptedOrders.slice(0);
            acceptedOrdersClone.push(action.payload)
            console.log(acceptedOrdersClone)
            return {
                ...state,
                acceptedOrders: acceptedOrdersClone
            }
        }


        case "DELIVERED_ORDERS": {
            let deliveredOrdersClone = state.deliveredOrders.slice(0);
            deliveredOrdersClone.push(action.payload)
            console.log(deliveredOrdersClone)
            return {
                ...state,
                deliveredOrders: deliveredOrdersClone
            }
        }

        default:
            return state;

    }
}


