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
    key: "ds-department-question",
    label: "Department Question",
    url: "/admin/department-question",
    parentKey: "dashboards",
  },
  {
    key: "ds-user-management",
    label: "User Management",
    url: "/admin/user-management",
    parentKey: "dashboards",
  },

  {
    key: "ds-email-credential",
    label: "Email Credential",
    url: "/admin/email-credential",
    parentKey: "user-management",
  },
  {
    key: "ds-email-templates",
    label: "Email Templates",
    url: "/admin/email-templates",
    parentKey: "user-management",
  },
  {
    key: "ds-closed-reason",
    label: "Closed Reason",
    url: "/admin/closed-reason",
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

  {
    key: "ds-all-ticket",
    label: "All Tickets",
    url: "/admin/contetra-all-ticket",
    parentKey: "All Tickets",
  },

  {
    key: "ds-getall",
    label: "My Tickets",
    url: "/admin/get-tickets",
    parentKey: "All Tickets",
  },

  {
    key: "ds-setup",
    label: "My Accepted Tickets",
    url: "/admin/middleman-accepted-tickets",
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

  {
    key: "ds-all-ticket",
    label: "All Tickets",
    url: "/admin/tridot-all-ticket",
    parentKey: "All Tickets",
  },

  {
    key: "ds-getall",
    label: "My Tickets",
    url: "/admin/getall-tickets",
    parentKey: "All-Tickets",
  },

  {
    key: "ds-setup",
    label: "My Accepted Tickets",
    url: "/admin/company-accepted-tickets",
    parentKey: "dashboards",
  },
];

export { companyArr3, customerArr, menuArr, middlemanArr3 };
