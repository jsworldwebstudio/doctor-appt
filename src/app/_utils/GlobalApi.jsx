const { default: axios } = require("axios");


const API_KEY=process.env.NEXT_PUBLIC_STRAPI_API_KEY

const axiosClient=axios.create({
  baseURL:'https://doctor-appt-strapi.onrender.com/api',
  headers:{
    'Authorization':`Bearer ${API_KEY}`
  }
})

const getCategory=()=>axiosClient.get('categories?populate=*');
export default{
  getCategory
}