import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserLocalStorage } from "../../auth/auth";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    // baseUrl: `${import.meta.env.VITE_SERVER_URL}/api`,

    credentials: "include",
    prepareHeaders: (headers, {  }) => {
      const token = getUserLocalStorage();

      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["mylostItems", "myFoundItems", "users", "adminData", "testimonials", "services", "faqs", "recentActivity","foundItems","claims","categories"],

  endpoints: () => ({}),
});
