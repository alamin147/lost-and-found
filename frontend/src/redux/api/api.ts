import { baseApi } from "./baseApi";

const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // login and register
    login: builder.mutation({
      query: (data: any) => {
        return {
          url: "/login",
          method: "POST",
          body: data,
        };
      },
    }),
    registers: builder.mutation({
      query: (data: any) => {
        return {
          url: "/register",
          method: "POST",
          body: data,
        };
      },
    }),

    // item category
    category: builder.query({
      query: () => {
        return {
          url: "/found-item-categories",
          method: "GET",
        };
      },
    }),

    // lost item
    getLostItems: builder.query({
      query: (data: any) => {
        return {
          url: "/lostItem",
          method: "GET",
          params: data,
        };
      },
    }),
    createLostItem: builder.mutation({
      query: (data: any) => {
        return {
          url: "/lostItem",
          method: "POST",
          body: data,
        };
      },
    }),
    getSingleLostItem: builder.query({
      query: (id: string) => {
        return {
          url: `/lostItem/${id}`,
          method: "GET",
        };
      },
    }),
    getMyLostItem: builder.query({
      query: () => {
        return {
          url: `/my/lostItem`,
          method: "GET",
        };
      },
      providesTags: ["mylostItems"],
    }),
    editMyLostItem: builder.mutation({
      query: (data: any) => {
        return {
          url: `/my/lostItem`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["mylostItems"],
    }),
    deleteMyLostItem: builder.mutation({
      query: (id: string) => {
        return {
          url: `/my/lostItem/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["mylostItems"],
    }),

    // found item
    getMyFoundItem: builder.query({
      query: () => {
        return {
          url: `/my/foundItem`,
          method: "GET",
        };
      },
      providesTags: ["myFoundItems"],
    }),
    createFoundItem: builder.mutation({
      query: (data: any) => {
        return {
          url: `/found-items`,
          method: "POST",
          body: data,
        };
      },
    }),
    getFoundItems: builder.query({
      query: (data: any) => {
        return {
          url: "/found-items",
          method: "GET",
          params: data,
        };
      },
    }),
    getSingleFoundItem: builder.query({
      query: (id: string) => {
        return {
          url: `/found-item/${id}`,
          method: "GET",
        };
      },
    }),
    editMyFoundItem: builder.mutation({
      query: (data: any) => {
        return {
          url: `/my/foundItem`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["myFoundItems"],
    }),
    deleteMyFoundItem: builder.mutation({
      query: (id: string) => {
        return {
          url: `/my/foundItem/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["myFoundItems"],
    }),

    // change password
    changePassword: builder.mutation({
      query: (data: any) => {
        return {
          url: `/change-password`,
          method: "POST",
          body: data,
        };
      },
    }),
    // change email
    changeEmail: builder.mutation({
      query: (data: any) => {
        return {
          url: `/change-email`,
          method: "POST",
          body: data,
        };
      },
    }),
    // change username
    changeUsername: builder.mutation({
      query: (data: any) => {
        return {
          url: `/change-username`,
          method: "POST",
          body: data,
        };
      },
    }),

    // create claim
    createClaim: builder.mutation({
      query: (data: any) => {
        return {
          url: `/claims`,
          method: "POST",
          body: data,
        };
      },
    }),
    // my claim
    myClaims: builder.query({
      query: () => {
        return {
          url: `/my/claims`,
          method: "GET",
        };
      },
    }),
    // admin stats
    adminStats: builder.query({
      query: () => {
        return {
          url: `/admin/stats`,
          method: "GET",
        };
      },
      // providesTags: ["adminData"],
    }),
    // admin stats
    blockUser: builder.mutation({
      query: (id: string) => {
        return {
          url: `/block/user/${id}`,
          method: "PUT",
        };
      },
      // invalidatesTags: ["adminData"],
    }),
  }),
});

export const {
  useGetLostItemsQuery,
  useLoginMutation,
  useRegistersMutation,
  useCategoryQuery,
  useCreateLostItemMutation,
  useGetSingleLostItemQuery,
  useCreateFoundItemMutation,
  useGetFoundItemsQuery,
  useGetSingleFoundItemQuery,
  useChangePasswordMutation,
  useChangeEmailMutation,
  useChangeUsernameMutation,
  useCreateClaimMutation,
  useMyClaimsQuery,
  useGetMyLostItemQuery,
  useEditMyLostItemMutation,
  useDeleteMyLostItemMutation,
  useGetMyFoundItemQuery,
  useDeleteMyFoundItemMutation,
  useEditMyFoundItemMutation,
  useAdminStatsQuery,
  useBlockUserMutation,
} = api;
