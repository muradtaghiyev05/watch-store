import { createSlice } from '@reduxjs/toolkit'
import toast from "react-hot-toast";

const myProducts = localStorage.getItem("cart") !== null ? JSON.parse(localStorage.getItem("cart")) : [];
const myQuantity = localStorage.getItem("quantity") !== null ? JSON.parse(localStorage.getItem("quantity")) : 0;
const myTotal = localStorage.getItem("total") !== null ? JSON.parse(localStorage.getItem("total")) : 0;

const setCartFunc = (products, quantity, total) => {
    localStorage.setItem("cart", JSON.stringify(products));
    localStorage.setItem("quantity", JSON.stringify(quantity));
    localStorage.setItem("total", JSON.stringify(total));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: myProducts,
        quantity: myQuantity,
        total: myTotal,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload.product);
            state.total += action.payload.price;
            setCartFunc(state.products, state.quantity, state.total);
            if (action.payload.message) {
                toast.success(action.payload.message);
            }
        },
        removeProduct: (state, action) => {
            state.quantity -= 1;
            state.products = state.products.filter((item) => item.id !== action.payload.id);
            state.total -= action.payload.price * action.payload.quantity;
            setCartFunc(state.products, state.quantity, state.total);
            toast.error(`${action.payload.product.title} səbətdən silindi!`);
        },
        addQuantity: (state, action) => {
            state.products.map((product) => {
                if (product.id === action.payload.id) {
                    product.quantity += action.payload.quantity;
                }});
            state.total += action.payload.price * action.payload.quantity;
            setCartFunc(state.products, state.quantity, state.total);
            if (action.payload.message) {
                toast.success(action.payload.message);
            }
        },
        removeQuantity: (state, action) => {
            state.products.map((product) => {
                if (product.id === action.payload.id) {
                    product.quantity -= 1;
                }
            });
            state.total -= action.payload.price;
            if (action.payload.quantity === 0) {
                state.quantity -= 1;
                state.products = state.products.filter((item) => item.quantity !== 0);
            };
            setCartFunc(state.products, state.quantity, state.total);
            toast.error(`1 ədəd ${action.payload.product.title} səbətdən silindi!`)
        },
    },
})

export const { addProduct, addQuantity, removeQuantity, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;