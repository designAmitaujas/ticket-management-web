import { MenuItemTypes } from "../constants/menu";

// default admin
const menuArr: MenuItemTypes[] = [
  {
    key: "ds-setup",
    label: "Dashboard",
    url: "/admin",
    parentKey: "dashboards",
  },
  {
    key: "ds-setup",
    label: "Department",
    url: "/admin/department",
    parentKey: "dashboards",
  },
  {
    key: "ds-setup",
    label: "Department Question",
    url: "/admin/department-question",
    parentKey: "dashboards",
  },
  {
    key: "ds-user-management",
    label: "User Management",
    url: "/admin/user-management",
    parentKey: "user-management",
  },
];

// default customer
const customerArr: MenuItemTypes[] = [
  {
    key: "ds-setup",
    label: "Dashboard",
    url: "/admin",
    parentKey: "dashboards",
  },
  {
    key: "ds-form",
    label: "Generate Ticket",
    url: "/admin/generate-ticket",
    parentKey: "generate-ticket",
  },
];

// default middleman
const middlemanArr3: MenuItemTypes[] = [
  {
    key: "ds-setup",
    label: "Dashboard",
    url: "/admin",
    parentKey: "dashboards",
  },
];

// default company
const companyArr3: MenuItemTypes[] = [
  {
    key: "ds-setup",
    label: "Dashboard",
    url: "/admin",
    parentKey: "dashboards",
  },
];

export { companyArr3, customerArr, menuArr, middlemanArr3 };
