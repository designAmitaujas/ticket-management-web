import { useParams } from "react-router-dom";
import LayoutProvider from "../../component/LayoutProvider";

const ViewTicket = () => {
  const { id } = useParams<{ id?: string }>();

  return (
    <LayoutProvider
      title={"Ticket Information"}
      isGoBack={true}
    ></LayoutProvider>
  );
};

export default ViewTicket;
