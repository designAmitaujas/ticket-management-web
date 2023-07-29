import cogoToast from "cogo-toast";
import FetherIcon from "feather-icons-react";
import { Formik, FormikErrors, FormikHelpers, FormikTouched } from "formik";
import _ from "lodash";
import queryString from "query-string";
import { FC, memo, useEffect, useMemo, useState } from "react";
import { Badge, Button, Form, Row } from "react-bootstrap";
import isEqual from "react-fast-compare";
import { useHistory, useLocation } from "react-router-dom";
import { Cell } from "react-table";
import * as Yup from "yup";
import {
  GetAllDepartmentQuery,
  GetAllDepartmentQuestionsQuery,
  ICreateTickets,
  useCreateOrUpdateTicketsMutation,
  useDeleteTicketsMutation,
  useGetAllDepartmentQuery,
  useGetAllDepartmentQuestionsQuery,
  useGetAllTicketsQuery,
  useGetTicketsByIdLazyQuery,
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

const Index = () => {
  const { data, refetch } = useGetAllTicketsQuery();
  const { push } = useHistory();
  const [deleteLangauage] = useDeleteTicketsMutation();

  const {
    custObje: { _id },
  } = useAppStore();

  const handleEdit = (id: string) => () => {
    push(`?action=update&id=${id}`);
  };

  const handleDelete = (id: string) => async () => {
    await deleteLangauage({ variables: { options: { id: id } } });
    await refetch();
  };

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
        accessor: "isActive",
        Cell: (e: Cell<ICreateTickets>) => {
          return e.value === true ? (
            <Badge bg="primary">active</Badge>
          ) : (
            <Badge bg="danger">disable</Badge>
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

              <Button
                onClick={handleEdit(e.value)}
                size="sm"
                className="rounded-pill"
              >
                <FetherIcon size="20" icon="edit" />
              </Button>
              <Button
                onClick={handleDelete(e.value)}
                size="sm"
                className="rounded-pill"
                variant="danger"
              >
                <FetherIcon size="20" icon="x-circle" />
              </Button>
            </span>
          );
        },
      },
    ],
    []
  );

  return (
    <LayoutProvider title={PAGE_TITLE} isAddButton={true}>
      {data && _.isArray(data?.getAllTickets) && (
        <CustomTable
          data={data.getAllTickets
            .filter((item) => item.assignedCustomer?._id === _id)
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
