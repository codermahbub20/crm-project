/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ClientsTable from "./ClientTable/ClientsTable";
import EditClientModal from "./ClientTable/EditClientModal";
import { useState } from "react";
import {
  useDeleteClientMutation,
  useGetAllClientsQuery,
} from "../../redux/features/Client/client.api";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import {
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
} from "../../redux/features/Project/project.api";
import ProjectsTable from "./Projects/ProjectsTable";
import EditProjectModal from "./Projects/EditProjectModal";
import LogsTable from "./Logs/LogsTable";
import Reminder from "./Reminders/Reminder";
import { useGetAllLogsQuery } from "../../redux/features/Logs/logs.api";

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`bg-white shadow rounded-lg p-4 ${className}`}>
    {children}
  </div>
);

const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-2">{children}</div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-bold">{children}</h2>
);

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const { user } = useSelector((state: any) => state.auth);

  // Fetch clients
  const { data: clientData = [], refetch: refetchClients } =
    useGetAllClientsQuery(user?.email);
  const [deleteClient] = useDeleteClientMutation();

  // Fetch projects
  const { data: projectData = [], refetch: refetchProject } =
    useGetAllProjectsQuery(user?.email);
  const [deleteProject] = useDeleteProjectMutation();

  const { data: getAllLogs = [] } = useGetAllLogsQuery(user?.email);

  const logs: Log[] = getAllLogs?.data || [];

  const clients = clientData?.data || [];
  const projects = projectData?.data || [];

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const thisWeekReminders = logs.filter((interaction) => {
    const interactionDate = new Date(interaction.date);
    return interactionDate >= today && interactionDate <= nextWeek;
  });

  const projectsByStatus = [
    {
      status: "Pending",
      count: projectData?.data?.filter((p: any) => p.status === "Pending")
        .length,
    },
    {
      status: "Completed",
      count: projectData?.data?.filter((p: any) => p.status === "Completed")
        .length,
    },
    {
      status: "OnGoing",
      count: projectData?.data?.filter((p: any) => p.status === "Ongoing")
        .length,
    },
  ];

  const remindersDue = 2;

  // Open the modal and set the selected client
  const handleEditClient = (client: any) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  // Delete a client
  const handleDeleteClient = async (id: string) => {
    try {
      await deleteClient(id).unwrap();
      refetchClients(); // Refetch clients after deletion
      toast.success("Client deleted successfully");
    } catch (error) {
      toast.error("Failed to delete client");
    }
  };

  // Open the modal and set the selected client
  const handleEditProject = (client: any) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  // Delete a client
  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject(id).unwrap();
      refetchProject();
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Failed to delete Project");
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Top Stats */}
      <Card className="col-span-1">
        <CardContent className="p-6 text-center">
          <h2 className="text-lg font-semibold">Total Clients</h2>
          <p className="text-2xl font-bold">{clients.length}</p>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardContent className="p-6 text-center">
          <h2 className="text-lg font-semibold">Total Projects</h2>
          <p className="text-2xl font-bold">{projects.length}</p>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardContent className="p-6 text-center">
          <h2 className="text-lg font-semibold">Reminders Due Soon</h2>
          <p className="text-2xl font-bold">{thisWeekReminders.length}</p>
        </CardContent>
      </Card>

      {/* Clients List */}
      <Card className="col-span-1 md:col-span-2">
        <CardContent className="space-y-4">
          <ClientsTable
            clients={clients}
            onEditClient={handleEditClient}
            onDeleteClient={handleDeleteClient}
          />
        </CardContent>
      </Card>

      {/* Projects by Status Chart */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Projects by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={projectsByStatus}>
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card className="col-span-1 md:col-span-3">
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProjectsTable
            projects={projects}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
          />
        </CardContent>
      </Card>

      {/* Clients List */}
      <Card className="col-span-1 md:col-span-2">
        <CardContent className="space-y-4">
          <LogsTable />
        </CardContent>
      </Card>

      {/* Projects by Status Chart */}
      <Card className="col-span-1">
        <CardContent>
          <Reminder />
        </CardContent>
      </Card>

      {/* Edit Client Modal */}
      {isModalOpen && (
        <EditClientModal
          client={selectedClient}
          onClose={handleCloseModal}
          refetchClients={refetchClients}
        />
      )}
      {/* Edit Client Modal */}
      {isModalOpen && (
        <EditProjectModal
          project={selectedClient}
          onClose={handleCloseModal}
          refetchProjects={refetchProject}
        />
      )}
    </div>
  );
};

export default Dashboard;
