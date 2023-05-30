import * as consts from "../../consts/consts";
import axios from "axios";
import {ACTION_TYPES} from "./ACTION_TYPES";

export const INITIAL_STATE = {
 cartData: null,
 cartSize:0,
 showModal: false,
 selectedImage:'',
 showPurchases:false,
    totalPrice:0,
}

const cartReducer = (state,action)=>{
    switch (action.type){
        case ACTION_TYPES.UPDATE_CART:
            return{
                ...state,
                cartData: action.payload.cart,
                cartSize: action.payload.cartSize,
                totalPrice: getTotalPrice(action.payload.cart),
            }
        case ACTION_TYPES.EMPTY_CART:
            const res = emptyCart();
            if(!res) {
                return{
                    ...state
                }
            }
             return{
                ...state,
                cartData: null,
                cartSize:0
            }
        case ACTION_TYPES.HANDLE_IMAGE_CLICK:
            return{
                ...state,
                selectedImage: action.payload.selectedImage,
                showModal: true,
            }
        case ACTION_TYPES.CLOSE_MODAL:
        {
            return{
                ...state,
                showModal: false,
            }
        }
        case ACTION_TYPES.CHECKOUT:
            return{
                ...state,
                showPurchases: true,
            }
    }
}
export default cartReducer;

const emptyCart =  () => {
    const emptyCartURL = consts.serverCartAPI + '/clear'
    const res =  axios.post(emptyCartURL)
        .then((res)=>{
            if(!res.ok)
                throw new Error();
            return true;
        }).catch(()=>{
        return false;
        });
    return res;
};


const getTotalPrice = (cartData) => {
    if (cartData) {
        const totalPrice = cartData.reduce((total) => total + 3.99, 0);
        return totalPrice.toFixed(2);
    }
    return '0.00';
};