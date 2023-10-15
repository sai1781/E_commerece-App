import axios from 'axios'

const product_url2 = axios.create({
    baseURL:"https://fakestoreapi.com",
    timeout:15000
})
export default product_url2;