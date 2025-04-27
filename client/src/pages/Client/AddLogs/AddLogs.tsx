/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useGetAllClientsQuery } from "../../../redux/features/Client/client.api";
import { useGetAllProjectsQuery } from "../../../redux/features/Project/project.api";
import { useCreateLogsMutation } from "../../../redux/features/Logs/logs.api";
import { useSelector } from "react-redux";
import { InteractionForm } from "../../../types/project.types";

const AddLogs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InteractionForm>();

  const { user } = useSelector((state: any) => state.auth);

  const [createInteraction] = useCreateLogsMutation();

  const {
    data: clientsData = [],
    error,
    isLoading,
  } = useGetAllClientsQuery(user?.email);
  const clients = clientsData?.data || [];

  const { data: projectsData = [] } = useGetAllProjectsQuery(user?.email);
  const projects = projectsData?.data || [];

  const onSubmit = async (data: InteractionForm) => {
    try {
      await createInteraction({
        ...data,
        date: new Date(data.date),
      }).unwrap();
      toast.success(" Interaction log added");
      reset();
    } catch (err) {
      toast.error(" Failed to add interaction");
    }
  };

  const onError = (errors: any) => {
    if (errors.date) toast.error(errors.date.message);
    if (errors.interactionType) toast.error(errors.interactionType.message);
    if (errors.notes) toast.error(errors.notes.message);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Add Interaction Log
      </h2>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
        {/* Date */}
        <div>
          <label className="text-gray-700 dark:text-gray-300">Date</label>
          <input
            type="date"
            {...register("date", { required: " Date is required" })}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>

        {/* Interaction Type */}
        <div>
          <label className="text-gray-700 dark:text-gray-300">
            Interaction Type
          </label>
          <select
            {...register("interactionType", {
              required: " Type is required",
            })}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            <option value="">Select type</option>
            <option value="Call">📞 Call</option>
            <option value="Email">📧 Email</option>
            <option value="Meeting">📅 Meeting</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="text-gray-700 dark:text-gray-300">Notes</label>
          <textarea
            {...register("notes", { required: "📝 Notes are required" })}
            rows={3}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>

        {/* Optional: Client */}
        <div>
          <label className="text-gray-700 dark:text-gray-300">
            Client (optional)
          </label>
          <select
            {...register("clientId")}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            <option value="">Select client</option>
            {clients?.map((c: any) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Optional: Project */}
        <div>
          <label className="text-gray-700 dark:text-gray-300">
            Project (optional)
          </label>
          <select
            {...register("projectId")}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            <option value="">Select project</option>
            {projects?.map((p: any) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
        >
          Add Interaction
        </button>
      </form>
    </div>
  );
};

export default AddLogs;
