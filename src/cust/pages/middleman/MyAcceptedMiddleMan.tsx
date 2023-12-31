import cogoToast from "cogo-toast";
import FetherIcon from "feather-icons-react";
import { Formik, FormikErrors, FormikHelpers, FormikTouched } from "formik";
import _ from "lodash";
import queryString from "query-string";
import { FC, memo, useEffect, useMemo, useState } from "react";
import { Badge, Button, Form, Modal, Row } from "react-bootstrap";
import isEqual from "react-fast-compare";
import { useHistory, useLocation } from "react-router-dom";
import { Cell } from "react-table";
import * as Yup from "yup";
import "yup-phone-lite";
import {
  GetAllDepartmentQuery,
  GetAllDepartmentQuestionsQuery,
  ICreateTickets,
  ICreateTransfetHistory,
  useCreateOrUpdateTicketsMutation,
  useGetAllDepartmentQuery,
  useGetAllDepartmentQuestionsQuery,
  useGetAllTransferUserQuery,
  useGetMyTicketByMiddleManQuery,
  useGetTicketsByIdLazyQuery,
  useTransferTicketMutation,
} from "../../../generated/graphql";
import { useAppStore } from "../../../store";
import CustomTable, { TableProps } from "../../component/CustomTable";
import {
  CustomButton,
  CustomFileInput,
  CustomInput,
  CustomSelect,
} from "../../component/Form";
import LayoutProvider from "../../component/LayoutProvider";
import { ManageLayout } from "../../component/ManageLayout";

const PAGE_TITLE = "My Tickets";

const initialValues: ICreateTickets = {
  isActive: true,
  assignedCompany: "",
  assignedCustomer: "",
  assignedMiddleMan: "",
  department: "",
  departmentQuestion: "",
  description: "",
  file: "",
  isResolved: false,
  question: "",
  mobile: "",
};

const validationSchema = Yup.object().shape({
  isActive: Yup.boolean().oneOf([true, false]),
  assignedCompany: Yup.string(),
  assignedCustomer: Yup.string(),
  assignedMiddleMan: Yup.string(),
  department: Yup.string().required(),
  departmentQuestion: Yup.string().required(),
  description: Yup.string().required(),
  file: Yup.string(),
  question: Yup.string().required(),
  isResolved: Yup.boolean().oneOf([true, false]),
  mobile: Yup.string(),
});

const RenderForm: FC<{
  errors: FormikErrors<ICreateTickets>;
  touched: FormikTouched<ICreateTickets>;
  values: ICreateTickets;
  handleSubmit: any;
  handleChange: any;
  setFieldValue: (arg0: string, val: any) => void;
  isSubmitting: boolean;
  department: GetAllDepartmentQuery["getAllDepartment"];
  departmentQuestion: GetAllDepartmentQuestionsQuery["getAllDepartmentQuestions"];
}> = memo(
  ({
    errors,
    touched,
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    isSubmitting,
    department,
    departmentQuestion,
  }) => {
    return (
      <Form onSubmit={handleSubmit} onChange={handleChange}>
        <Row>
          <CustomInput
            err={errors.question}
            isInvalid={!!touched.question && !!errors.question}
            label={"question"}
            name="question"
            placeholder="Enter Your question"
            value={values.question}
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
          />

          <CustomInput
            err={errors.description}
            isInvalid={!!touched.description && !!errors.description}
            label={"description"}
            name="description"
            placeholder="Enter description"
            value={values.description}
            isTextArea={true}
            md="12"
            lg="12"
          />

          <CustomSelect
            options={department
              .filter((item) => item.isActive === true)
              .map((item) => ({ value: item._id, label: item.name }))}
            err={errors.department}
            isInvalid={!!touched.department && !!errors.department}
            label={"department"}
            name="department"
            placeholder="Enter department"
            value={values.department}
          />

          <CustomSelect
            options={departmentQuestion
              .filter((item) => item.isActive === true)
              .filter((item) => item.department?._id === values.department)
              .map((item) => ({ value: item._id, label: item.name }))}
            err={errors.departmentQuestion}
            isInvalid={
              !!touched.departmentQuestion && !!errors.departmentQuestion
            }
            label={"department question"}
            name="departmentQuestion"
            placeholder="Enter department Question"
            value={values.departmentQuestion}
          />

          {/* <CustomCheckBox
            isInvalid={!!touched.isActive && !!errors.isActive}
            label="is active"
            name="isActive"
            setFieldValue={setFieldValue}
            value={values.isActive}
          /> */}

          <div />

          <CustomButton isSubmitting={isSubmitting} />
        </Row>
      </Form>
    );
  },
  isEqual
);

const Add = () => {
  const { goBack } = useHistory();
  const [createLangauge] = useCreateOrUpdateTicketsMutation();

  const { data: department } = useGetAllDepartmentQuery();
  const { data: departmentQuestion } = useGetAllDepartmentQuestionsQuery();

  const {
    custObje: { _id },
  } = useAppStore();

  const handleSubmit = async (
    val: ICreateTickets,
    actions: FormikHelpers<ICreateTickets>
  ) => {
    actions.setSubmitting(true);

    const response = await createLangauge({
      variables: { options: { ...val, assignedCustomer: _id } },
    });

    if (response.data?.createOrUpdateTickets.success === true) {
      goBack();
    } else {
      cogoToast.error(
        response.data?.createOrUpdateTickets.msg ||
          "Something went wrong on server"
      );
    }

    actions.setSubmitting(false);
  };

  if (
    !department?.getAllDepartment ||
    !departmentQuestion?.getAllDepartmentQuestions
  ) {
    return <></>;
  }

  return (
    <LayoutProvider title={`ADD ${PAGE_TITLE}`} isGoBack={true}>
      <Formik
        initialValues={initialValues}
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
            <RenderForm
              errors={errors}
              touched={touched}
              values={values}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              isSubmitting={isSubmitting}
              department={department.getAllDepartment}
              departmentQuestion={departmentQuestion.getAllDepartmentQuestions}
            />
          );
        }}
      </Formik>
    </LayoutProvider>
  );
};

const { parse } = queryString;

const Update = () => {
  const [initValue, setInitValue] = useState<ICreateTickets>(initialValues);
  const { goBack } = useHistory();
  const { search } = useLocation();
  const [updateLanguage] = useCreateOrUpdateTicketsMutation();

  const { data: department } = useGetAllDepartmentQuery();
  const { data: departmentQuestion } = useGetAllDepartmentQuestionsQuery();

  const {
    custObje: { _id },
  } = useAppStore();

  const [getById] = useGetTicketsByIdLazyQuery({
    onCompleted: (res) => {
      if (res.getTicketsById) {
        setInitValue({
          isActive: res.getTicketsById.isActive,
          _id: res.getTicketsById._id,
          assignedCompany: res.getTicketsById.assignedCompany?._id || "",
          assignedCustomer: res.getTicketsById.assignedCustomer?._id || "",
          assignedMiddleMan: res.getTicketsById.assignedMiddleMan?._id || "",
          department: res.getTicketsById.department?._id || "",
          departmentQuestion: res.getTicketsById.departmentQuestion?._id || "",
          description: res.getTicketsById.description,
          file: res.getTicketsById.file,
          isResolved: res.getTicketsById.isResolved,
          question: res.getTicketsById.question,
          mobile: res.getTicketsById.mobile,
        });
      }
    },
  });

  useEffect(() => {
    try {
      if (parse(search).id) {
        getById({ variables: { options: { id: parse(search).id as string } } });
      }
    } catch (err) {}
  }, [search]);

  const handleSubmit = async (
    val: ICreateTickets,
    actions: FormikHelpers<ICreateTickets>
  ) => {
    actions.setSubmitting(true);

    const response = await updateLanguage({
      variables: { options: { ...val, assignedCustomer: _id } },
    });

    if (response.data?.createOrUpdateTickets.success === true) {
      goBack();
    } else {
      cogoToast.error(
        response.data?.createOrUpdateTickets.msg ||
          "Something went wrong on server"
      );
    }

    actions.setSubmitting(false);
  };

  if (
    !department?.getAllDepartment ||
    !departmentQuestion?.getAllDepartmentQuestions
  ) {
    return <></>;
  }

  return (
    <LayoutProvider title={`UPDATE ${PAGE_TITLE}`} isGoBack={true}>
      <Formik
        initialValues={initValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
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
            <RenderForm
              errors={errors}
              touched={touched}
              values={values}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              isSubmitting={isSubmitting}
              department={department.getAllDepartment}
              departmentQuestion={departmentQuestion.getAllDepartmentQuestions}
            />
          );
        }}
      </Formik>
    </LayoutProvider>
  );
};

const initialValuess: ICreateTransfetHistory = {
  ticket: "",
  transferdUser: "",
  reason: "",
};

const validationSchemas = Yup.object().shape({
  ticket: Yup.string(),
  transferUser: Yup.string(),
  reason: Yup.string().required(),
});

const RenderModal: FC<{ id: string; refetch: () => void }> = ({
  id,
  refetch,
}) => {
  const [show, setShow] = useState(false);
  const {
    custObje: { _id },
  } = useAppStore();

  const { data } = useGetAllTransferUserQuery();

  const [accept] = useTransferTicketMutation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAccept = async (
    val: typeof initialValuess,
    actions: FormikHelpers<typeof initialValuess>
  ) => {
    try {
      actions.setSubmitting(true);
      const response = await accept({
        variables: {
          options: {
            ticket: id,
            transferdUser: val.transferdUser,
            reason: val.reason,
          },
        },
      });

      if (response.data?.transferTicket.success === true) {
        refetch();
      } else {
        cogoToast.error(
          response.data?.transferTicket.msg || "Something went wrong on server"
        );
      }
      actions.setSubmitting(false);
    } catch (err) {}

    handleClose();
  };

  if (!data?.getAllTransferUser) {
    return <></>;
  }

  return (
    <>
      <span style={{ display: "flex", gap: "1rem" }}>
        <Button size="sm" className="rounded-pill" onClick={handleShow}>
          <FetherIcon size="20" icon="edit" />
        </Button>
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer Ticket to a new member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValuess}
            validationSchema={validationSchemas}
            onSubmit={handleAccept}
          >
            {({
              errors,
              touched,
              values,
              handleSubmit,
              handleChange,

              isSubmitting,
            }) => {
              return (
                <Form onSubmit={handleSubmit} onChange={handleChange}>
                  <CustomSelect
                    options={data.getAllTransferUser
                      .filter((item) => item._id !== _id)
                      .map((item) => ({
                        value: item._id,
                        label: item.name + " " + item.email,
                      }))}
                    value={values.transferdUser}
                    name="transferdUser"
                    err={errors.transferdUser}
                    label="Assign User"
                    md="12"
                    lg="12"
                    isInvalid={
                      !!touched.transferdUser && !!errors.transferdUser
                    }
                    placeholder="Please Select User"
                  />
                  <CustomInput
                    err={errors.reason}
                    isInvalid={!!touched.reason && !!errors.reason}
                    label={"reason"}
                    name="reason"
                    placeholder="Enter reason"
                    value={values.reason}
                    lg="12"
                    md="12"
                  />
                  <Modal.Footer>
                    <CustomButton
                      label="Transfer"
                      isSubmitting={isSubmitting}
                    />
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Form>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

const Index = () => {
  const { data, refetch } = useGetMyTicketByMiddleManQuery();
  const { push } = useHistory();

  const {
    custObje: { _id },
  } = useAppStore();

  const handleEdit = (id: string) => () => {};

  // const handleDelete = (id: string) => async () => {
  //   await deleteLangauage({ variables: { options: { id: id } } });
  //   await refetch();
  // };

  const handleViewDescription = (id: string) => () => {
    push(`/admin/ticket/${id}`);
  };

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
        Header: "status",
        accessor: "isResolved",
        Cell: (e: Cell<ICreateTickets>) => {
          return e.value === false ? (
            <Badge bg="primary">open</Badge>
          ) : (
            <Badge bg="danger">closed</Badge>
          );
        },
      },
      {
        Header: "actions",
        accessor: "_id",
        Cell: (e: Cell<ICreateTickets>) => {
          return (
            <span style={{ display: "flex", gap: "1rem" }}>
              <Button
                onClick={handleViewDescription(e.value)}
                size="sm"
                className="rounded-pill"
              >
                <FetherIcon size="20" icon="alert-circle" />
              </Button>

              <RenderModal id={e.value} refetch={refetch} />
              {/* <Button
                  onClick={handleDelete(e.value)}
                  size="sm"
                  className="rounded-pill"
                  variant="danger"
                >
                  <FetherIcon size="20" icon="x-circle" />
                </Button> */}
            </span>
          );
        },
      },
    ],
    []
  );

  return (
    <LayoutProvider title={PAGE_TITLE} isAddButton={false}>
      {data && _.isArray(data?.getMyTicketByMiddleMan) && (
        <CustomTable
          data={data.getMyTicketByMiddleMan
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

const EmailCredential = () => {
  return <ManageLayout Add={Add} Update={Update} Index={Index} />;
};

export default EmailCredential;
