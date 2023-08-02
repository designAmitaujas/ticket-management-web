import React from "react";
import { Route, RouteProps } from "react-router-dom";

const Login = React.lazy(() => import("../../pages/auth/Login"));
const dashboard = React.lazy(() => import("../pages/dashboard"));
const Department = React.lazy(
  () => import("../../cust/pages/admin/Department")
);
const DepartmentQuestion = React.lazy(
  () => import("../../cust/pages/admin/DepartmentQuestion")
);
const AppUser = React.lazy(() => import("../../cust/pages/admin/AppUser"));
const ChangePassword = React.lazy(
  () => import("../../pages/auth/ChangePassword")
);
const GetAllTicket = React.lazy(
  () => import("../../cust/pages/company/GetAllTicket")
);
const GetAllTicketsMiddle = React.lazy(
  () => import("../../cust/pages/middleman/GetAllTicketsMiddle")
);
const GenerateTiket = React.lazy(
  () => import("../../cust/pages/customer/GenerateTiket")
);
const ViewTicket = React.lazy(
  () => import("../../cust/pages/customer/ViewTicket")
);
const MyAcceptedCopanyTicket = React.lazy(
  () => import("../../cust/pages/company/MyAcceptedCopanyTicket")
);
const MyAcceptedMiddleMan = React.lazy(
  () => import("../../cust/pages/middleman/MyAcceptedMiddleMan")
);
const Credentials = React.lazy(
  () => import("../../cust/pages/Emails/Credentials")
);
const Template = React.lazy(() => import("../../cust/pages/Emails/Template"));
const ClosedReason = React.lazy(
  () => import("../../cust/pages/admin/ClosedReason")
);
const ViewAdminTicket = React.lazy(
  () => import("../../cust/pages/customer/ViewAdminTicket")
);
const ViewTriAdminTicket = React.lazy(
  () => import("../../cust/pages/company/ViewAdminTicket")
);

export interface RoutesProps {
  path: RouteProps["path"];
  name?: string;
  component?: RouteProps["component"];
  route?: any;
  exact?: RouteProps["exact"];
  icon?: string;
  header?: string;
  roles?: string[];
  children?: RoutesProps[];
}

const CustPublicRoutes: RoutesProps[] = [
  {
    path: "/",
    name: "login",
    component: Login,
    route: Route,
    exact: true,
  },
  {
    path: "/admin/change-password",
    name: "ChangePassword",
    component: ChangePassword,
    route: Route,
    exact: true,
  },
];

const CustAuthRoutes: RoutesProps[] = [
  {
    path: "/admin",
    name: "dashboard",
    component: dashboard,
    route: Route,
    exact: true,
  },
  {
    path: "/admin/department",
    name: "Department",
    component: Department,
    route: Route,
    exact: true,
  },
  {
    path: "/admin/department-question",
    name: "Department-Question",
    component: DepartmentQuestion,
    route: Route,
    exact: true,
  },
  {
    path: "/admin/user-management",
    name: "user-management",
    component: AppUser,
    route: Route,
    exact: true,
  },
  {
    path: "/admin/generate-ticket",
    name: "user-management",
    component: GenerateTiket,
    route: Route,
    exact: true,
  },
  {
    path: "/admin/ticket/:id",
    name: "ticket-description",
    component: ViewTicket,
    route: Route,
    exact: true,
  },
  {
    path: "/admin/getall-tickets",
    name: "All-Tickets",
    component: GetAllTicket,
    route: Route,
    exact: true,
  },
  {
    path: "/admin/company-accepted-tickets",
    name: "company-accepted-ticket",
    component: MyAcceptedCopanyTicket,
    route: Route,
    exact: true,
  },
  {
    path: "/admin/get-tickets",
    name: "All-Tickets",
    component: GetAllTicketsMiddle,
    route: Route,
    exact: true,
  },
  {
    path: "/admin/middleman-accepted-tickets",
    name: "middleman-accepted-ticket",
    component: MyAcceptedMiddleMan,
    route: Route,
    exact: true,
  },
  {
    path: "/admin/email-credential",
    name: "email-credential",
    component: Credentials,
    route: Route,
    exact: true,
  },
  {
    path: "/admin/email-templates",
    name: "email-templates",
    component: Template,
    route: Route,
    exact: true,
  },

  {
    path: "/admin/closed-reason",
    name: "closed-reason",
    component: ClosedReason,
    route: Route,
    exact: true,
  },

  {
    path: "/admin/contetra-all-ticket",
    name: "contetra-all-ticket",
    component: ViewAdminTicket,
    route: Route,
    exact: true,
  },

  {
    path: "/admin/tridot-all-ticket",
    name: "tridot-all-ticket",
    component: ViewTriAdminTicket,
    route: Route,
    exact: true,
  },
];

const CustExamRoutes: RoutesProps[] = [];

export { CustAuthRoutes, CustExamRoutes, CustPublicRoutes };
