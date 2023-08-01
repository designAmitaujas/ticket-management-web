import cogoToast from "cogo-toast";
import FetherIcon from "feather-icons-react";
import _ from "lodash";
import { FC, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Cell } from "react-table";
import {
  ICreateTickets,
  useAcceptTiketByMiddleManMutation,
  useGetAllAcceptAcceptByMiddleManQuery,
} from "../../../generated/graphql";
import CustomTable, { TableProps } from "../../component/CustomTable";
import LayoutProvider from "../../component/LayoutProvider";

const PAGE_TITLE = "My Tickets";

const RenderModal: FC<{ id: string; refetch: () => void }> = ({
  id,
  refetch,
}) => {
  const [show, setShow] = useState(false);

  const [accept] = useAcceptTiketByMiddleManMutation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAccept = async () => {
    const response = await accept({ variables: { options: { id } } });

    if (response.data?.acceptTiketByMiddleMan.success === true) {
      refetch();
    } else {
      cogoToast.error(
        response.data?.acceptTiketByMiddleMan.msg ||
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

const GetAllTicketsMiddle = () => {
  const { data, refetch } = useGetAllAcceptAcceptByMiddleManQuery();

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
        Header: "actions",
        accessor: "_id",
        Cell: (e: Cell<ICreateTickets>) => {
          return <RenderModal id={e.value} refetch={refetch} />;
        },
      },
    ],
    []
  );

  return (
    <LayoutProvider title={PAGE_TITLE} isAddButton={true}>
      {data && _.isArray(data?.getAllAcceptAcceptByMiddleMan) && (
        <CustomTable
          data={data.getAllAcceptAcceptByMiddleMan
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

export default GetAllTicketsMiddle;
