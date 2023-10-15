import {configureStore} from '@reduxjs/toolkit';
import CartReducer from '../slice/CartReducer';


const Store = configureStore({
    reducer:{
        cart:CartReducer
    }
})  

export default Store