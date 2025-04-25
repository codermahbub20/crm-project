import { baseApi } from "../../api/baseApi";

const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch a single client by ID
    // getClient: builder.query({
    //   query: (id) => `client/${id}`,
    // }),
    // Fetch all clients
    // getClients: builder.query({
    //   query: () => "client",
    // }),
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
        url: `client/${id}`,
        method: "PATCH",
        body: patch,
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  //   useGetClientQuery,
  //   useGetClientsQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
} = clientApi;

export default clientApi;
