import * as consts from "../../consts/consts";
import axios from "axios";
import { ACTION_TYPES } from "./ACTION_TYPES";

/**
 * The initial state of the cart.
 */
export const INITIAL_STATE = {
    cartData: null,
    cartSize: 0,
    showModal: false,
    selectedImage: "",
    showPurchases: false,
    totalPrice: 0,
};

/**
 * Reducer function for the cart state.
 *
 * @param {object} state - The current state of the cart.
 * @param {object} action - The action object that specifies the type and payload.
 * @returns {object} - The updated state of the cart.
 */
const cartReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.UPDATE_CART:
            return {
                ...state,
                cartData: action.payload.cart,
                cartSize: action.payload.cartSize,
                totalPrice: getTotalPrice(action.payload.cart),
            };
        case ACTION_TYPES.EMPTY_CART:
            const res = emptyCart();
            if (!res) {
                return {
                    ...state,
                };
            }
            return {
                ...state,
                cartData: null,
                cartSize: 0,
            };
        case ACTION_TYPES.HANDLE_IMAGE_CLICK:
            return {
                ...state,
                selectedImage: action.payload.selectedImage,
                showModal: true,
            };
        case ACTION_TYPES.CLOSE_MODAL:
            return {
                ...state,
                showModal: false,
            };
        case ACTION_TYPES.CHECKOUT:
            return {
                ...state,
                showPurchases: true,
            };
        default:
            return state;
    }
};

export default cartReducer;

/**
 * Clears the cart by making a request to the server.
 *
 * @returns {Promise<boolean>} - A promise that resolves to true if the cart is successfully cleared, false otherwise.
 */
const emptyCart = () => {
    const emptyCartURL = consts.serverCartAPI + '/clear';
    return axios.post(emptyCartURL)
        .then((res) => {
            if (!res.ok)
                throw new Error();
            return true;
        })
        .catch(() => {
            return false;
        });
};

/**
 * Calculates the total price of the items in the cart.
 *
 * @param {array} cartData - The array of cart items.
 * @returns {string} - The total price of the items formatted as a string with two decimal places.
 */
const getTotalPrice = (cartData) => {
    if (cartData) {
        const totalPrice = cartData.reduce((total) => total + 3.99, 0);
        return totalPrice.toFixed(2);
    }
    return '0.00';
};
