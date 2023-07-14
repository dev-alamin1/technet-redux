import { api } from "@/redux/api/apiSlice";

const extendProductApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //! rtk query autogen vabe atkti hooks dey, ekhane getProduct ai nam onusare autogen hook debe
    getProduct: builder.query({
      query: () => '/products',
      //! query: (dynamic vabe data pete params dite hoy)=> " ekhane route dite hoy"
    }),

    getSingleProduct: builder.query({
      query: (id) => `/product/${id}`,
    }),

    postComment: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),

    getComment: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments'],
    }),
  }),
});

export const {useGetProductQuery,useGetSingleProductQuery,
    usePostCommentMutation,useGetCommentQuery} = extendProductApi;