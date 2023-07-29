import queryString from "query-string";
import React, { FC } from "react";
import { useLocation } from "react-router-dom";

const { parse } = queryString;

export const ManageLayout: FC<{
  Index: React.ElementType;
  Add: React.ElementType;
  Update: React.ElementType;
}> = ({ Index, Add, Update }) => {
  const { search } = useLocation();

  if (parse(search).action === "add") {
    return <Add />;
  } else if (parse(search).action === "update") {
    return <Update />;
  } else {
    return <Index />;
  }
};
