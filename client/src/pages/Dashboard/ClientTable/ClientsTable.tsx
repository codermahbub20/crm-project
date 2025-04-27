import { FaEdit, FaTrash } from "react-icons/fa";

import React from "react";
import { Client } from "../../../types/project.types";

interface ClientsTableProps {
  clients: Client[];
  onEditClient: (client: Client) => void;
  onDeleteClient: (id: string) => void;
}

const ClientsTable: React.FC<ClientsTableProps> = ({
  clients,
  onEditClient,
  onDeleteClient,
}) => {
  console.log("Clients data:", clients);
  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Clients</h2>
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
              #
            </th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
              Name
            </th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
              Email
            </th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
              Phone
            </th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
              Edit
            </th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr
              key={client._id}
              className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                {index + 1}
              </td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                {client.name}
              </td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                {client.email}
              </td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                {client.phone}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onEditClient(client)} // Passes the entire client object to the parent
                  className="text-green-600 hover:text-green-400"
                >
                  <FaEdit className="inline-block" size={18} />
                </button>
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onDeleteClient(client._id)}
                  className="text-red-600 hover:text-red-400"
                >
                  <FaTrash className="inline-block" size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsTable;
