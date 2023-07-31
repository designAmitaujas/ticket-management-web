import cogoToast from "cogo-toast";
import FetherIcon from "feather-icons-react";
import _ from "lodash";
import { FC, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Cell } from "react-table";
import {
  ICreateTickets,
  useAcceptTiketByCompanyMutation,
  useDeleteTicketsMutation,
  useGetAllAcceptAcceptByCompanyQuery,
} from "../../../generated/graphql";
import { useAppStore } from "../../../store";
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
  const { data, refetch } = useGetAllAcceptAcceptByCompanyQuery();
  const { push } = useHistory();
  const [deleteLangauage] = useDeleteTicketsMutation();

  const {
    custObje: { _id },
  } = useAppStore();

  // const handleEdit = (id: string) => () => {
  //   push(`?action=update&id=${id}`);
  // };

  // const handleDelete = (id: string) => async () => {
  //   await deleteLangauage({ variables: { options: { id: id } } });
  //   await refetch();
  // };

  // const handleViewDescription = (id: string) => () => {};

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
          return (
            <RenderModal id={e.value} refetch={refetch} />
            // <span style={{ display: "flex", gap: "1rem" }}>
            //   <Button
            //     onClick={handleViewDescription(e.value)}
            //     size="sm"
            //     className="rounded-pill"
            //   >
            //     <FetherIcon size="20" icon="alert-circle" />
            //   </Button>

            //   <Button
            //     onClick={handleEdit(e.value)}
            //     size="sm"
            //     className="rounded-pill"
            //   >
            //     <FetherIcon size="20" icon="edit" />
            //   </Button>
            //   <Button
            //     onClick={handleDelete(e.value)}
            //     size="sm"
            //     className="rounded-pill"
            //     variant="danger"
            //   >
            //     <FetherIcon size="20" icon="x-circle" />
            //   </Button>
            // </span>
          );
        },
      },
    ],
    []
  );

  return (
    <LayoutProvider title={PAGE_TITLE} isAddButton={true}>
      {data && _.isArray(data?.getAllAcceptAcceptByCompany) && (
        <CustomTable
          data={data.getAllAcceptAcceptByCompany

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
