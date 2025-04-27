import { baseApi } from "../../api/baseApi";
// client.interface.ts
export interface Client {
  _id: string;
  name: string;
}

const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch a single client by ID
    // getClient: builder.query({
    //   query: (id) => `client/${id}`,
    // }),

    getAllClients: builder.query({
      query: (userEmail) => ({
        url: `/clients`,
        method: "GET",
        params: userEmail ? { userEmail } : {}, // Pass userEmail as a query parameter
      }),
    }),

    // Create a new client
    createClient: builder.mutation({
      query: (payload) => ({
        url: "clients",
        method: "POST",
        body: payload,
      }),
    }),
    // Update an existing client
    updateClient: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/client/${id}`,
        method: "PATCH",
        body: patch,
      }),
    }),

    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/client/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  //   useGetClientQuery,
  //   useGetClientsQuery,
  useGetAllClientsQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientApi;

export default clientApi;
