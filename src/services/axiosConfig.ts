import axios from "axios";

export const apiInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  timeout: 20000, // Timeout set to 20 seconds
  headers: {
    "Content-Type": "application/json",
    ...(process.env.NEXT_PUBLIC_API_KEY
      ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}` }
      : {}),
  },
});

export const apiInstanceStrapi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api`,
  timeout: 20000, // Timeout set to 20 seconds
  headers: {
    "Content-Type": "application/json",
    ...(process.env.NEXT_PUBLIC_API_KEY
      ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}` }
      : {}),
  },
});
