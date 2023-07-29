import { useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";

// layout constants

// strore
import { RootState } from "../redux/store";

// All layouts containers
import DefaultLayout from "../layouts/Default";
import HorizontalLayout from "../layouts/Horizontal/";
import TwoColumnLayout from "../layouts/TwoColumn/";

import { useEffect } from "react";
import {
  CustAuthRoutes,
  CustExamRoutes,
  CustPublicRoutes,
} from "../cust/routes/CustRoutes";
import { useAppStore } from "../store";

interface RoutesProps {}

const Routes = (props: RoutesProps) => {
  const { layout } = useSelector((state: RootState) => ({
    layout: state.Layout,
  }));

  const { push, location } = useHistory();

  const { isAuth, isAdmin } = useAppStore();

  const getLayout = () => {
    let layoutCls = TwoColumnLayout;

    layoutCls = HorizontalLayout;

    return layoutCls;
  };

  let Layout = getLayout();

  useEffect(() => {
    if (isAuth === false) {
      push("/");
    }

    if (isAuth === true) {
      if (location.pathname === "/") {
        if (isAdmin === true) {
          push("/admin");
        }

        if (isAdmin === false) {
          push("/user");
        }
      }
    }
  }, [isAuth, location, isAdmin]);

  useEffect(() => {
    if (isAuth === true) {
      if (location.pathname.includes("/admin")) {
        if (isAdmin === false) {
          push("/user");
        }
      }
    }
  }, [location, isAdmin, isAuth]);

  return (
    <Switch>
      {isAuth === false ? (
        <Route path={CustPublicRoutes.map((r: any) => r["path"])}>
          <DefaultLayout {...props} layout={layout}>
            <Switch>
              {CustPublicRoutes.map((route: any, index: number) => {
                return (
                  !route.children && (
                    <route.route
                      key={index}
                      path={route.path}
                      roles={route.roles}
                      exact={route.exact}
                      component={route.component}
                    />
                  )
                );
              })}
            </Switch>
          </DefaultLayout>
        </Route>
      ) : (
        <>
          {isAdmin === true ? (
            <>
              <Route path={CustAuthRoutes.map((r: any) => r["path"])}>
                <Layout {...props}>
                  <Switch>
                    {CustAuthRoutes.map((route: any, index: number) => {
                      return (
                        !route.children && (
                          <route.route
                            key={index}
                            path={route.path}
                            roles={route.roles}
                            exact={route.exact}
                            component={route.component}
                          />
                        )
                      );
                    })}
                  </Switch>
                </Layout>
              </Route>
            </>
          ) : (
            <>
              <Route path={CustExamRoutes.map((r: any) => r["path"])}>
                <Layout {...props}>
                  <Switch>
                    {CustExamRoutes.map((route: any, index: number) => {
                      return (
                        !route.children && (
                          <route.route
                            key={index}
                            path={route.path}
                            roles={route.roles}
                            exact={route.exact}
                            component={route.component}
                          />
                        )
                      );
                    })}
                  </Switch>
                </Layout>
              </Route>
            </>
          )}
        </>
      )}
    </Switch>
  );
};

export default Routes;
