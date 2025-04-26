/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ClientsTable from "./ClientsTable";
import EditClientModal from "./EditClientModal";
import { useState } from "react";
import { useGetAllClientsQuery } from "../../redux/features/Client/client.api";
import { useSelector } from "react-redux";

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
  const [selectedClient, setSelectedClient] = useState(null);

  const { user } = useSelector((state: any) => state.auth);

  const { data = [], refetch } = useGetAllClientsQuery(user?.email);

  const clients = data?.data || [];

  const projectsByStatus = [
    { status: "In Progress", count: 4 },
    { status: "Completed", count: 2 },
    { status: "Pending", count: 2 },
  ];

  const interactionLogs = [
    { date: "04/25/2025", type: "Call", note: "Discussed project details" },
    { date: "04/24/2025", type: "Meeting", note: "Reviewed requirements" },
  ];

  const remindersDue = 2;

  // Open the modal and set the selected client
  const handleEditClient = (client: any) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };
  const handleDeleteClient = (client: any) => {
    setSelectedClient(client);
    setIsModalOpen(true);
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
          <p className="text-2xl font-bold">{clients?.length}</p>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardContent className="p-6 text-center">
          <h2 className="text-lg font-semibold">Total Projects</h2>
          <p className="text-2xl font-bold">
            {projectsByStatus.reduce((acc, curr) => acc + curr.count, 0)}
          </p>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardContent className="p-6 text-center">
          <h2 className="text-lg font-semibold">Reminders Due Soon</h2>
          <p className="text-2xl font-bold">{remindersDue}</p>
        </CardContent>
      </Card>

      {/* Clients List */}
      <Card className="col-span-1 md:col-span-2">
        <CardContent className="space-y-4">
          <ClientsTable
            clients={clients}
            onDeleteClient={handleDeleteClient}
            onEditClient={handleEditClient}
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

      {/* Interaction Logs */}
      <Card className="col-span-1 md:col-span-3">
        <CardHeader>
          <CardTitle>Interaction Logs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {interactionLogs.map((log, index) => (
            <div key={index} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-semibold">
                  {log.date} - {log.type}
                </p>
                <p className="text-gray-500">{log.note}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Edit Client Modal */}
      {isModalOpen && (
        <EditClientModal
          client={selectedClient}
          onClose={handleCloseModal}
          refetchClients={refetch}
        />
      )}
    </div>
  );
};

export default Dashboard;
