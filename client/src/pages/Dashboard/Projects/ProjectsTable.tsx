import { FaEdit, FaTrash } from "react-icons/fa";

import React from "react";
import { Project } from "../../../types/project.types";

interface ProjectsTableProps {
  projects: Project[];
  onEditProject: (client: Project) => void;
  onDeleteProject: (id: string) => void;
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({
  projects,
  onEditProject,
  onDeleteProject,
}) => {
  return (
    <div className="overflow-x-auto">
      {/* <h2 className="text-2xl font-semibold mb-4">projects</h2> */}
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
              #
            </th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
              Title
            </th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
              Budget
            </th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
              Deadline
            </th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
              Status
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
          {projects.map((project, index) => (
            <tr
              key={project._id}
              className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                {index + 1}
              </td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                {project.title}
              </td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                {project.budget}
              </td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                {new Date(project.deadline).toLocaleDateString()}
              </td>
              <td
                className={`px-4 py-2 font-semibold ${
                  project.status === "Pending"
                    ? "text-blue-500"
                    : project.status === "Ongoing"
                    ? "text-yellow-500"
                    : project.status === "Completed"
                    ? "text-green-500"
                    : "text-gray-800 dark:text-gray-300"
                }`}
              >
                {project.status}
              </td>

              <td className="px-4 py-2">
                <button
                  onClick={() => onEditProject(project)} // Passes the entire client object to the parent
                  className="text-green-600 hover:text-green-400"
                >
                  <FaEdit className="inline-block" size={18} />
                </button>
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onDeleteProject(project._id as string)}
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

export default ProjectsTable;
