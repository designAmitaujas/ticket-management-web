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
    label: "Ticket",
    url: "/admin/ticket",
    parentKey: "dashboards",
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
