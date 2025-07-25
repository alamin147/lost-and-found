import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserLocalStorage } from "../../auth/auth";

const isProduction = import.meta.env.VITE_PRODUCTION == "true";
const serverUrl = `${import.meta.env.VITE_SERVER_URL}/api`||"http://localhost:5000/api";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
        isProduction
            ? serverUrl
            : "http://localhost:5000/api",
    credentials: "include",
    prepareHeaders: (headers, {}) => {
      const token = getUserLocalStorage();

      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "mylostItems",
    "myFoundItems",
    "users",
    "adminData",
    "testimonials",
    "services",
    "faqs",
    "recentActivity",
    "foundItems",
    "claims",
    "categories",
  ],

  endpoints: () => ({}),
});
