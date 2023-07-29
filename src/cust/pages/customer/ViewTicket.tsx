import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetAllTicketsQuery } from "../../../generated/graphql";
import LayoutProvider from "../../component/LayoutProvider";

const ViewTicket = () => {
  const { id } = useParams<{ id?: string }>();

  const { data } = useGetAllTicketsQuery();

  return (
    <LayoutProvider title={"Ticket Information"} isGoBack={true}>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {data?.getAllTickets.map((item, index) => {
            return (
              <>
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.question}</td>
                  <td>{item.department?.name}</td>
                  <td>{item.departmentQuestion?.name}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </LayoutProvider>
  );
};

export default ViewTicket;
