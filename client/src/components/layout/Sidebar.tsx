// /* eslint-disable @typescript-eslint/no-explicit-any */
// // components/Sidebar.tsx

// import { NavLink } from "react-router-dom";
// import { useAppSelector } from "../../redux/hook";
// import { selectCurrentUser } from "../../redux/features/auth/authSlice";
// import { sidebarItemsGenerator } from "../../utils/sidebarGenerator";
// import { userPaths } from "../../routes/routes.user";

// const userRole = {
//   ADMIN: "admin",
//   USER: "user",
// };

// export default function Sidebar() {
//   const user = useAppSelector(selectCurrentUser);

//   let sidebarItems: any[] = [];
//   //   console.log(user!.role);

//   switch ("user") {
//     case userRole.ADMIN:
//       //   sidebarItems = sidebarItemsGenerator(adminPaths, "admin");
//       break;
//     case userRole.USER:
//       sidebarItems = sidebarItemsGenerator(userPaths, "user");
//       break;

//     default:
//       sidebarItems = []; // fallback or a message can go here
//   }

//   return (
//     <aside className="w-full md:w-64 bg-gray-100 dark:bg-gray-800 p-4">
//       <nav className="space-y-2">
//         {sidebarItems.map((item, index) => (
//           <NavLink
//             key={index}
//             to={item.path}
//             className={({ isActive }) =>
//               `flex items-center gap-2 p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 ${
//                 isActive ? "bg-gray-300 dark:bg-gray-700 font-semibold" : ""
//               }`
//             }
//           >
//             {item.icon}
//             {item.name}
//           </NavLink>
//         ))}
//       </nav>
//     </aside>
//   );
// }
