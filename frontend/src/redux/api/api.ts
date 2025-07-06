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
          url: "/item-categories",
          method: "GET",
        };
      },
      providesTags: ["categories"],
    }),
    createCategory: builder.mutation({
      query: (data: any) => {
        return {
          url: "/item-categories",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => {
        return {
          url: `/item-categories/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id: string) => {
        return {
          url: `/item-categories/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["categories"],
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
      providesTags: ["mylostItems"],
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
      providesTags: ["myFoundItems", "foundItems"],
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
      providesTags: ["foundItems"],
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
      invalidatesTags: ["myFoundItems", "foundItems"],
    }),
    deleteMyFoundItem: builder.mutation({
      query: (id: string) => {
        return {
          url: `/my/foundItem/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["myFoundItems", "foundItems"],
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
      invalidatesTags: ["users"],
    }),

    // change user role
    changeUserRole: builder.mutation({
      query: ({ id, role }: { id: string; role: string }) => {
        return {
          url: `/change-role/${id}`,
          method: "PUT",
          body: { role },
        };
      },
      invalidatesTags: ["users"],
    }),

    // soft delete user
    softDeleteUser: builder.mutation({
      query: (id: string) => {
        return {
          url: `/delete-user/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["users"],
    }),

    // get all users
    getAllUsers: builder.query({
      query: () => {
        return {
          url: "/users",
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),

    // get all claims (admin)
    getAllClaims: builder.query({
      query: () => {
        return {
          url: "/claims",
          method: "GET",
        };
      },
      providesTags: ["adminData"],
    }),

    // update claim status
    updateClaimStatus: builder.mutation({
      query: ({ claimId, ...data }: any) => {
        return {
          url: `/claims/${claimId}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["adminData"],
    }),

    // mark lost item as found
    markLostItemAsFound: builder.mutation({
      query: (data: any) => {
        return {
          url: "/found-lost",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["mylostItems", "foundItems"],
    }),

    // testimonials/reviews
    getTestimonials: builder.query({
      query: () => {
        return {
          url: "/testimonials",
          method: "GET",
        };
      },
      providesTags: ["testimonials"],
    }),
    createTestimonial: builder.mutation({
      query: (data: any) => {
        return {
          url: "/testimonials",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["testimonials"],
    }),

    // services
    getServices: builder.query({
      query: () => {
        return {
          url: "/services",
          method: "GET",
        };
      },
      providesTags: ["services"],
    }),
    createService: builder.mutation({
      query: (data: any) => {
        return {
          url: "/services",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["services"],
    }),

    // faqs
    getFaqs: builder.query({
      query: () => {
        return {
          url: "/faqs",
          method: "GET",
        };
      },
      providesTags: ["faqs"],
    }),
    createFaq: builder.mutation({
      query: (data: any) => {
        return {
          url: "/faqs",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["faqs"],
    }),

    // recent activity for dashboard
    getRecentActivity: builder.query({
      query: () => {
        return {
          url: "/recent-activity",
          method: "GET",
        };
      },
      providesTags: ["recentActivity"],
    }),
  }),
});

export const {
  useGetLostItemsQuery,
  useLoginMutation,
  useRegistersMutation,
  useCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
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
  useChangeUserRoleMutation,
  useSoftDeleteUserMutation,
  useGetAllUsersQuery,
  useGetAllClaimsQuery,
  useUpdateClaimStatusMutation,
  useMarkLostItemAsFoundMutation,
  useGetTestimonialsQuery,
  useCreateTestimonialMutation,
  useGetServicesQuery,
  useCreateServiceMutation,
  useGetFaqsQuery,
  useCreateFaqMutation,
  useGetRecentActivityQuery,
} = api;
