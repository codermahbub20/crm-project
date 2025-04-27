/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useCreateClientMutation,
  useGetAllClientsQuery,
} from "../../../redux/features/Client/client.api";
import { useSelector } from "react-redux";

const CreateClient = () => {
  const navigate = useNavigate();
  const [createClient] = useCreateClientMutation();
  const { user } = useSelector((state: any) => state.auth);

  const { refetch } = useGetAllClientsQuery(user?.email);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    // Show validation errors
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => {
        if (error?.message) {
          toast.error(error.message as string);
        }
      });
      return;
    }

    const clientInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company || "",
      notes: data.notes || "",
      userEmail: user?.email,
    };

    try {
      await createClient(clientInfo).unwrap();
      toast.success("Client added successfully");
      reset();
      refetch();
      navigate(`/`);
    } catch (err: any) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
          Add New Client
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Client name is required" })}
              placeholder="Enter client's full name"
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="client@example.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="text"
              {...register("phone")}
              placeholder="+8801XXXXXXXXX"
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Company Name
            </label>
            <input
              type="text"
              {...register("company")}
              placeholder="Company Inc."
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Notes
            </label>
            <textarea
              {...register("notes")}
              placeholder="Enter any additional notes"
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add Client
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateClient;
