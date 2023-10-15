import axios from 'axios'


const product_url = axios.create({
    baseURL:"https://e-commerece-backedn.onrender.com",
    timeout:5000,
})

export {product_url};

// https://e-commerece-backedn.onrender.com