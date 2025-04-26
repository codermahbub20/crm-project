import { baseApi } from "../../api/baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch a single client by ID
    // getClient: builder.query({
    //   query: (id) => `client/${id}`,
    // }),

    getAllProjects: builder.query({
      query: (userEmail) => ({
        url: "/projects",
        method: "GET",
        params: userEmail ? { userEmail } : {}, // Pass userEmail as a query parameter
      }),
    }),

    // Create a new client
    createProject: builder.mutation({
      query: (payload) => ({
        url: "projects",
        method: "POST",
        body: payload,
      }),
    }),
    // Update an existing client
    updateProject: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `project/${id}`,
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
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
} = projectApi;

export default projectApi;
