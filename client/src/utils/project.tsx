// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../components/ui/Card";
// import ProjectsTable from "../pages/Dashboard/Projects/ProjectsTable";
// import {
//   useDeleteProjectMutation,
//   useGetAllProjectsQuery,
// } from "../redux/features/Project/project.api";
// import { useSelector } from "react-redux";
// import { toast } from "sonner";

// const project = () => {
//   const [selectedClient, setSelectedClient] = useState<any>(null);
//   const { user } = useSelector((state: any) => state.auth);
//   const { data: projectData = [], refetch: refetchProject } =
//     useGetAllProjectsQuery(user?.email);
//   const [deleteProject] = useDeleteProjectMutation();

//   const projects = projectData?.data || [];

//   const handleEditProject = (client: any) => {
//     setSelectedClient(client);
//     setIsModalOpen(true);
//   };

//   // Delete a client
//   const handleDeleteProject = async (id: string) => {
//     try {
//       await deleteProject(id).unwrap();
//       refetchProject();
//       toast.success("Project deleted successfully");
//     } catch (error) {
//       toast.error("Failed to delete Project");
//     }
//   };

//   return (
//     <div>
//       {/* Projects Table */}
//       <Card className="col-span-1 md:col-span-3">
//         <CardHeader>
//           <CardTitle>All Projects</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <ProjectsTable
//             projects={projects}
//             onEditProject={handleEditProject}
//             onDeleteProject={handleDeleteProject}
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default project;
