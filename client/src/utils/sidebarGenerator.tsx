import { NavLink } from "react-router-dom";
import { TSidebarItems, TUserPath } from "../types/sidebar.types";

export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItems[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => {
          return {
            key: child.name,
            label: (
              <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
            ),
          };
        }),
      });
    }

    return acc; // Ensures the accumulator is returned
  }, []);

  return sidebarItems;
};
