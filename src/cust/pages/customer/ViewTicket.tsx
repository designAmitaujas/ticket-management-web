import { css } from "@emotion/css";
import cogoToast from "cogo-toast";
import { Formik, FormikHelpers } from "formik";
import { FC } from "preact/compat";
import { useEffect, useState } from "react";
import { Alert, Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  Direction,
  GetTicketBackAndForthByTiketIdQuery,
  useAddTicketBackAndForthMutation,
  useGetTickerClosedByIdMutation,
  useGetTicketBackAndForthByTiketIdLazyQuery,
} from "../../../generated/graphql";
import { useAppStore } from "../../../store";
import {
  CustomButton,
  CustomFileInput,
  CustomInput,
} from "../../component/Form";
import LayoutProvider from "../../component/LayoutProvider";

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

  const [closeRunningMutation] = useGetTickerClosedByIdMutation();

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

          console.log(lastElement);

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
    setButtonClickChoice(Direction.Company);
    toggle();
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

  return (
    <LayoutProvider title={"Ticket Information"} isGoBack={true}>
      {isClosed === true && <Alert>Ticket Is Closed</Alert>}

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
                ></a>
              </span>
            ) : (
              <>No File Provided</>
            )}
          </h6>
        </Card.Header>
      </Card>

      {allData?.ticketBackAndForth.map((item) => {
        return (
          <>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">
                  {item.file}
                </Card.Subtitle>
                <Card.Text>{item.questionReply}</Card.Text>
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
