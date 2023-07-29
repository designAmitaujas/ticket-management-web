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
    path: "/admin/get-tickets",
    name: "All-Tickets",
    component: GetAllTicketsMiddle,
    route: Route,
    exact: true,
  },
];

const CustExamRoutes: RoutesProps[] = [];

export { CustAuthRoutes, CustExamRoutes, CustPublicRoutes };
