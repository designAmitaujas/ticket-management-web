import { css } from "@emotion/css";
import cogoToast from "cogo-toast";
import { Formik, FormikHelpers } from "formik";
import moment from "moment";
import { FC } from "preact/compat";
import { useEffect, useState } from "react";
import { Alert, Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  Direction,
  GetTicketBackAndForthByTiketIdQuery,
  ICloseInput,
  useAddTicketBackAndForthMutation,
  useGetAllClosedReasonQuery,
  useGetTickerClosedByIdMutation,
  useGetTickerClosedByMiddleManMutation,
  useGetTicketBackAndForthByTiketIdLazyQuery,
} from "../../../generated/graphql";
import { useAppStore } from "../../../store";
import {
  CustomButton,
  CustomFileInput,
  CustomInput,
  CustomSelect,
} from "../../component/Form";
import LayoutProvider from "../../component/LayoutProvider";
import "./style.css";

const parsedUrl = new URL(process.env.REACT_APP_API_URL!);

interface IinitValue {
  questionReply: string;
  file: string;
}

const initalValue: IinitValue = {
  questionReply: "",
  file: "",
};

const validationSchema = Yup.object().shape({
  questionReply: Yup.string().required(),
  file: Yup.string(),
});

const RenderModal: FC<{
  toggle: () => void;
  show: boolean;
  manageSubmimt: (arg0: IinitValue) => Promise<void>;
}> = ({ show, toggle, manageSubmimt }) => {
  const handleSubmit = async (
    val: IinitValue,
    action: FormikHelpers<IinitValue>
  ) => {
    action.setSubmitting(true);
    await manageSubmimt(val);
    action.setSubmitting(false);
    toggle();
  };

  return (
    <Modal show={show} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>Are You Want To Perform This Action??</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initalValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            touched,
            values,
            handleSubmit,
            handleChange,
            setFieldValue,
            isSubmitting,
          }) => {
            return (
              <>
                <Form onSubmit={handleSubmit} onChange={handleChange}>
                  <Row>
                    <CustomInput
                      err={errors.questionReply}
                      isInvalid={
                        !!touched.questionReply && !!errors.questionReply
                      }
                      label={"questionReply"}
                      name="questionReply"
                      placeholder="Enter Your questionReply"
                      value={values.questionReply}
                      isTextArea={true}
                      md="12"
                      lg="12"
                    />

                    <CustomFileInput
                      err={errors.file}
                      isInvalid={!!touched.file && !!errors.file}
                      label="file"
                      name="file"
                      placeholder="Enter file"
                      value={values.file}
                      setFieldValue={setFieldValue}
                      isImage={false}
                      isPdf={false}
                      md="12"
                      lg="12"
                    />

                    <CustomButton isSubmitting={isSubmitting} />
                  </Row>
                </Form>
              </>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

const initalvalueV1: ICloseInput = {
  reason: "",
  ticket: "",
};

const validationSchemaV1 = Yup.object().shape({
  reason: Yup.string().required(),
  ticket: Yup.string(),
});

const RenderMiddleManCloseModal: FC<{
  toggle: () => void;
  show: boolean;
  manageSubmimt: (arg0: ICloseInput) => Promise<void>;
}> = ({ manageSubmimt, show, toggle }) => {
  const { data } = useGetAllClosedReasonQuery();

  const handleSubmit = async (
    val: ICloseInput,
    action: FormikHelpers<ICloseInput>
  ) => {
    action.setSubmitting(true);
    await manageSubmimt(val);
    action.setSubmitting(false);
    toggle();
  };

  if (!data?.getAllClosedReason) {
    return <></>;
  }

  return (
    <Modal show={show} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>Are You Want To Close This Ticket??</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initalvalueV1}
          validationSchema={validationSchemaV1}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            touched,
            values,
            handleSubmit,
            handleChange,
            setFieldValue,
            isSubmitting,
          }) => {
            return (
              <>
                <Form onSubmit={handleSubmit} onChange={handleChange}>
                  <Row>
                    <CustomSelect
                      options={data.getAllClosedReason
                        .filter((item) => item.isActive === true)
                        .map((item) => ({ value: item._id, label: item.name }))}
                      err={errors.reason}
                      isInvalid={!!touched.reason && !!errors.reason}
                      label={"Ticket Close reason"}
                      name="reason"
                      placeholder="Enter reason"
                      value={values.reason}
                    />
                    <CustomButton isSubmitting={isSubmitting} />
                  </Row>
                </Form>
              </>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

const ViewTicket = () => {
  const { id } = useParams<{ id?: string }>();
  const [allData, setAllData] =
    useState<
      GetTicketBackAndForthByTiketIdQuery["getTicketBackAndForthByTiketId"]
    >();
  const [getData] = useGetTicketBackAndForthByTiketIdLazyQuery();
  const [currentRunning, setCurrentRunning] = useState<Direction>(
    Direction.Null
  );

  const [isCustModalOpen, setIsCustModalOpen] = useState(false);

  const [isNextApprovalAvailable, setIsNextApprovalAvailable] = useState(false);

  const [closeRunningMutation] = useGetTickerClosedByIdMutation();

  const [closedByMiddleMan] = useGetTickerClosedByMiddleManMutation();

  const [isClosed, setIsClosed] = useState(false);

  const [buttonClickChoice, setButtonClickChoice] = useState<Direction>(
    Direction.Null
  );

  const [AddBackAndForth] = useAddTicketBackAndForthMutation();

  const [show, setShow] = useState<boolean>(false);

  const toggle = () => {
    setShow((x) => !x);
  };

  const refetchAllData = async () => {
    if (id) {
      const data = await getData({ variables: { options: { id } } });
      if (data.data?.getTicketBackAndForthByTiketId) {
        setAllData(data.data.getTicketBackAndForthByTiketId);

        setIsClosed(data.data.getTicketBackAndForthByTiketId.ticket.isResolved);

        if (
          data.data.getTicketBackAndForthByTiketId.ticketBackAndForth.length ===
          0
        ) {
          setCurrentRunning(Direction.Middle);
          setIsNextApprovalAvailable(true);
        } else {
          setIsNextApprovalAvailable(false);
        }

        if (
          data.data.getTicketBackAndForthByTiketId.ticketBackAndForth.length !==
          0
        ) {
          const lastElement =
            data.data.getTicketBackAndForthByTiketId.ticketBackAndForth[
              data.data.getTicketBackAndForthByTiketId.ticketBackAndForth
                .length - 1
            ];

          if (lastElement.isRunningOnMiddleMan === true) {
            setCurrentRunning(Direction.Middle);
          }

          if (lastElement.isRunnningOnCompany === true) {
            setCurrentRunning(Direction.Company);
          }

          if (lastElement.isRunningOnCustomer === true) {
            setCurrentRunning(Direction.User);
          }
        }
      }
    }
  };

  useEffect(() => {
    refetchAllData();
  }, [id]);

  const { custObje } = useAppStore();

  const manageSubmimt = async (arg0: IinitValue) => {
    const response = await AddBackAndForth({
      variables: {
        options: {
          file: arg0.file,
          nextChooice:
            Direction.Company === buttonClickChoice
              ? Direction.Company
              : Direction.User === buttonClickChoice
              ? Direction.User
              : Direction.Middle,
          questionReply: arg0.questionReply,
          ticketId: id!,
          canCompanyAccept: isNextApprovalAvailable,
        },
      },
    });

    if (response.data?.AddTicketBackAndForth.success) {
      cogoToast.success("Data updated successfully");

      await refetchAllData();
    }
  };

  const buttonChoiceUser = () => {
    setButtonClickChoice(Direction.User);
    toggle();
  };

  const buttonChoiceMiddle = () => {
    setButtonClickChoice(Direction.Middle);
    toggle();
  };

  const buttonChoiceCompany = () => {
    // if (allData?.ticket.assignedCompany === null) {
    //   cogoToast.error("Tridot is not assigend");
    //   return;
    // }else{}

    setButtonClickChoice(Direction.Company);
    toggle();
  };

  const toggleCustModal = () => setIsCustModalOpen((item) => !item);

  const closeItByMiddle = async () => {
    toggleCustModal();
  };

  const closeIt = async () => {
    const response = await closeRunningMutation({
      variables: { options: { id: id! } },
    });

    await refetchAllData();

    if (response.data?.getTickerClosedById.success === true) {
      cogoToast.success(response.data?.getTickerClosedById.msg);
    } else {
      cogoToast.success(response.data?.getTickerClosedById.msg);
    }
  };

  const handleCloseByMiddle = async (arg0: ICloseInput) => {
    const response = await closedByMiddleMan({
      variables: { options: { reason: arg0.reason, ticket: id! } },
    });

    if (response.data?.getTickerClosedByMiddleMan.success) {
      cogoToast.success("Data updated successfully");

      await refetchAllData();
    }
  };

  return (
    <LayoutProvider title={"Ticket Information"} isGoBack={true}>
      {isClosed === true && <Alert>Ticket Is Closed</Alert>}

      <RenderMiddleManCloseModal
        show={isCustModalOpen}
        toggle={toggleCustModal}
        manageSubmimt={handleCloseByMiddle}
      />

      <Card>
        <Card.Header className="bg-white">
          <h6>Question : {allData?.ticket.question}</h6>
          <h6>Description : {allData?.ticket.description}</h6>
          <h6>
            File :
            {allData?.ticket.file ? (
              <span
                className={css`
                  &:hover {
                    cursor: pointer;
                  }
                `}
              >
                <a
                  href={`${parsedUrl.origin}/upload/${allData?.ticket.file}`}
                  target="_blank"
                >
                  {"   "} view file
                </a>
              </span>
            ) : (
              <>No File Provided</>
            )}
          </h6>
          <h6>Mobile : {allData?.ticket.mobile}</h6>
        </Card.Header>
      </Card>

      {allData?.ticketBackAndForth
        .sort((a, b) => {
          return (
            moment(a.createdAt).toDate().getTime() -
            moment(b.createdAt).toDate().getTime()
          );
        })
        .map((item) => {
          return (
            <>
              <Card className="worldContainer">
                <Card.Body style={{ padding: "0.5rem 3rem" }}>
                  <Card.Text style={{ fontSize: "1rem", fontWeight: "bold" }}>
                    <i className="bi bi-person-circle"></i>
                    {"   "} {item.createdBy?.name} -{" "}
                    {item.createdBy?.isCustomer === true
                      ? "Customer"
                      : item.createdBy?.isMiddleMan === true
                      ? "Contetra"
                      : "Tridot"}
                  </Card.Text>
                  <Card.Text>
                    {" "}
                    <b>Reply:-</b> {item.questionReply}
                  </Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">
                    {item.file ? (
                      <>
                        <span
                          className={css`
                            &:hover {
                              cursor: pointer;
                            }
                          `}
                        >
                          <a
                            href={`${parsedUrl.origin}/upload/${item.file}`}
                            target="_blank"
                          >
                            {"   "} view file
                          </a>
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </>
          );
        })}

      <Card className="d-flex flex-row gap-2 p-3">
        {custObje.isCustomer && (
          <>
            {isClosed === true ? (
              <>
                <Button onClick={closeIt}>Re Open Ticket</Button>
              </>
            ) : (
              <Button onClick={closeIt}>Close Ticket</Button>
            )}
          </>
        )}

        {custObje.isMiddleMan && (
          <>
            {isClosed === true ? (
              <>{/* <Button onClick={closeIt}>Re Open Ticket</Button> */}</>
            ) : (
              <Button onClick={closeItByMiddle}>Close Ticket</Button>
            )}
          </>
        )}

        {isClosed === false ? (
          <>
            {custObje.isCustomer && Direction.User === currentRunning && (
              <>
                <Button onClick={buttonChoiceMiddle}>
                  Forward To MiddleMan
                </Button>
              </>
            )}

            {custObje.isMiddleMan && Direction.Middle === currentRunning && (
              <>
                <Button onClick={buttonChoiceUser}>Back To Customer</Button>
                <Button onClick={buttonChoiceCompany}>
                  Forward To Company
                </Button>
              </>
            )}

            {custObje.isCompany && Direction.Company === currentRunning && (
              <>
                <Button onClick={buttonChoiceMiddle}>Back To MiddleMan</Button>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </Card>

      <RenderModal show={show} toggle={toggle} manageSubmimt={manageSubmimt} />
    </LayoutProvider>
  );
};

export default ViewTicket;
