import cogoToast from "cogo-toast";
import FetherIcon from "feather-icons-react";
import _ from "lodash";
import { FC, useMemo, useState } from "react";
import { Badge, Button, Modal } from "react-bootstrap";
import { Cell } from "react-table";
import {
  ICreateTickets,
  useAcceptTiketByCompanyMutation,
  useGetAllAcceptAcceptByAdminQuery,
} from "../../../generated/graphql";
import CustomTable, { TableProps } from "../../component/CustomTable";
import LayoutProvider from "../../component/LayoutProvider";

const PAGE_TITLE = "My Tickets";

const RenderModal: FC<{ id: string; refetch: () => void }> = ({
  id,
  refetch,
}) => {
  const [show, setShow] = useState(false);

  const [accept] = useAcceptTiketByCompanyMutation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAccept = async () => {
    const response = await accept({ variables: { options: { id } } });

    if (response.data?.acceptTiketByCompany.success === true) {
      refetch();
    } else {
      cogoToast.error(
        response.data?.acceptTiketByCompany.msg ||
          "Something went wrong on server"
      );
    }

    handleClose();
  };

  return (
    <>
      <span style={{ display: "flex", gap: "1rem" }}>
        <Button size="sm" className="rounded-pill" onClick={handleShow}>
          <FetherIcon size="20" icon="alert-circle" />
        </Button>
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you want to accept this Ticket Request</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="primary" onClick={handleAccept}>
            Accept
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const GetAllTicket = () => {
  const { data, refetch } = useGetAllAcceptAcceptByAdminQuery();

  const columns = useMemo<TableProps["columns"]>(
    () => [
      {
        Header: "No",
        accessor: "no",
      },
      {
        Header: "Name",
        accessor: "question",
      },
      {
        Header: "department",
        accessor: "department.name",
      },
      // {
      //   Header: "Contetra member",
      //   accessor: "assignedMiddleMan.name",
      // },
      {
        Header: "Tridot member",
        accessor: "assignedCompany.name",
        Cell: (e: Cell<ICreateTickets>) => {
          return e.value ? e.value : "---";
        },
      },
      {
        Header: "status",
        accessor: "isResolved",
        Cell: (e: Cell<ICreateTickets>) => {
          return e.value === false ? (
            <Badge bg="primary">Open</Badge>
          ) : (
            <Badge bg="danger">Closed</Badge>
          );
        },
      },
    ],
    []
  );

  return (
    <LayoutProvider title={PAGE_TITLE} isAddButton={true}>
      {data && _.isArray(data?.getAllAcceptAcceptByAdmin) && (
        <CustomTable
          data={data.getAllAcceptAcceptByAdmin
            .filter((item) => item.isActive === true)
            .map((x, i) => ({
              ...x,
              no: i + 1,
            }))}
          columns={columns}
          pageSize={5}
          isSortable={true}
          pagination={true}
          isSearchable={true}
        />
      )}
    </LayoutProvider>
  );
};

export default GetAllTicket;
