import axios from "axios";
import {addPurchaseUrl, failureMessage, serverUnreachableMessage, successMessage} from "../../consts/consts";
import {ACTION_TYPES} from "./ACTION_TYPES"
export const INITIAL_STATE = {
    firstName:'',
    lastName:'',
    email:'',
    message:'',
}

const purchaseReducer = (state,action) =>{
    switch(action.type){
        case ACTION_TYPES.RESET_FORM:
            return {
                ...state,
                firstName:'',
                lastName:'',
                email:'',
                message:'',
            }
        case ACTION_TYPES.CHANGE_INPUT:
            return {
                ...state,
                [action.payload.name] : action.payload.value
            };
        case ACTION_TYPES.HANDLE_SUBMIT:
            state.message='';
            const purchase = action.payload.purchase;
            //addPurchaseUrl
            axios.post(addPurchaseUrl, null, {
                params: purchase
            })
                .then(() => {
                    state.message = successMessage;
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.data && error.response.data.message) {
                            state.message = failureMessage + error.response.data.message
                        } else {
                            state.message = failureMessage +error.message;
                        }} else if (error.request) {
                        state.message = serverUnreachableMessage;
                    }
                })
            return{
                ...state,
                firstName:'',
                lastName:'',
                email:'',
                message:'',
            }
        default:
            return state;
    }
}

export default purchaseReducer;
