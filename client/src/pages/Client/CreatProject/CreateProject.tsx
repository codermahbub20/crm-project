/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateProjectMutation } from "../../../redux/features/Project/project.api";
import { useGetAllClientsQuery } from "../../../redux/features/Client/client.api";

interface AddProjectForm {
  title: string;
  budget: number;
  deadline: string;
  status: string;
  clientId: string;
}

interface Client {
  _id: string;
  name: string;
}

const CreateProject = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProjectForm>();

  const { data = [], error, isLoading } = useGetAllClientsQuery();

  const clients = data?.data || [];

  const [createProject] = useCreateProjectMutation();

  // Submit form data
  const onSubmit = async (data: AddProjectForm) => {
    try {
      const projectInfo = {
        title: data.title,
        budget: data.budget,
        deadline: new Date(data.deadline), // Convert string to Date object
        status: data.status,
        clientId: data.clientId,
      };

      await createProject(projectInfo).unwrap();
      toast.success("Project added successfully");
      reset();
      navigate("/projects"); // Redirect after successful creation
    } catch (err) {
      toast.error("Failed to add project");
    }
  };

  if (isLoading) {
    return <div>Loading clients...</div>;
  }

  if (error) {
    toast.error("Failed to fetch clients");
    return <div>Error loading clients</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
          Add New Project
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Project Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter project title"
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Budget */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Budget
            </label>
            <input
              type="number"
              {...register("budget", { required: "Budget is required" })}
              placeholder="Enter project budget"
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
            {errors.budget && (
              <p className="text-red-500 text-sm">{errors.budget.message}</p>
            )}
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Deadline
            </label>
            <input
              type="date"
              {...register("deadline", { required: "Deadline is required" })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
            {errors.deadline && (
              <p className="text-red-500 text-sm">{errors.deadline.message}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              {...register("status", { required: "Status is required" })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-white"
            >
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          {/* Client */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Client
            </label>
            <select
              {...register("clientId", { required: "Client is required" })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Client</option>
              {clients?.map((client: Client) => (
                <option key={client._id} value={client._id}>
                  {client.name}
                </option>
              ))}
            </select>
            {errors.clientId && (
              <p className="text-red-500 text-sm">{errors.clientId.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
