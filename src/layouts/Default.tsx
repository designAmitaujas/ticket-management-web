import { Suspense, useEffect } from "react";
import AppLoader from "../cust/assets/AppLoader";

interface DefaultLayoutProps {
  layout: {
    layoutType: string;
    layoutWidth: string;
    leftSideBarTheme: string;
    leftSideBarType: string;
    showRightSidebar: boolean;
  };
  children?: any;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  useEffect(() => {
    if (document.body) document.body.classList.add("authentication-bg");

    return () => {
      if (document.body) document.body.classList.remove("authentication-bg");
    };
  }, []);

  // get the child view which we would like to render
  const children = props["children"] || null;

  return (
    <>
      <Suspense fallback={<AppLoader />}>{children}</Suspense>
    </>
  );
};
export default DefaultLayout;
