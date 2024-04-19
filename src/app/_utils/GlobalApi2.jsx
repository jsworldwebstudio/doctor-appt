import axios from 'axios';

const BASE_URL = 'https://doctor-appt-strapi.onrender.com/api';

const API_KEY=process.env.NEXT_PUBLIC_STRAPI_API_KEY;

export default axios.create({
  baseURL: BASE_URL,
  headers:{
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${API_KEY}`
  }
});