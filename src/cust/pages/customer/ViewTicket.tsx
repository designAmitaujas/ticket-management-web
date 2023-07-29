import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetTicketBackAndForthByTiketIdLazyQuery } from "../../../generated/graphql";
import LayoutProvider from "../../component/LayoutProvider";

const ViewTicket = () => {
  const { id } = useParams<{ id?: string }>();

  const [getData] = useGetTicketBackAndForthByTiketIdLazyQuery();

  useEffect(() => {}, []);

  return (
    <LayoutProvider
      title={"Ticket Information"}
      isGoBack={true}
    ></LayoutProvider>
  );
};

export default ViewTicket;
