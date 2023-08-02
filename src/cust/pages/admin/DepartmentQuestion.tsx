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
  ICreateDepartmentQuestions,
  useCreateOrUpdateDepartmentQuestionsMutation,
  useDeleteDepartmentQuestionsMutation,
  useGetAllDepartmentQuery,
  useGetAllDepartmentQuestionsQuery,
  useGetDepartmentQuestionsByIdLazyQuery,
} from "../../../generated/graphql";
import CustomTable, { TableProps } from "../../component/CustomTable";
import {
  CustomButton,
  CustomCheckBox,
  CustomInput,
  CustomSelect,
} from "../../component/Form";
import LayoutProvider from "../../component/LayoutProvider";
import { ManageLayout } from "../../component/ManageLayout";

const PAGE_TITLE = "Department Question";

const initialValues: ICreateDepartmentQuestions = {
  isActive: true,
  name: "",
  department: "",
};

const validationSchema = Yup.object().shape({
  isActive: Yup.boolean().oneOf([true, false]),
  name: Yup.string().required(),
  department: Yup.string().required(),
});

const RenderForm: FC<{
  errors: FormikErrors<ICreateDepartmentQuestions>;
  touched: FormikTouched<ICreateDepartmentQuestions>;
  values: ICreateDepartmentQuestions;
  handleSubmit: any;
  handleChange: any;
  setFieldValue: (arg0: string, val: any) => void;
  isSubmitting: boolean;
  department: GetAllDepartmentQuery["getAllDepartment"];
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
  }) => {
    return (
      <Form onSubmit={handleSubmit} onChange={handleChange}>
        <Row>
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

          <CustomInput
            err={errors.name}
            isInvalid={!!touched.name && !!errors.name}
            label={"Question"}
            name="name"
            placeholder="Enter your Question"
            value={values.name}
          />

          <CustomCheckBox
            isInvalid={!!touched.isActive && !!errors.isActive}
            label="is active"
            name="isActive"
            setFieldValue={setFieldValue}
            value={values.isActive}
          />

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
  const [createLangauge] = useCreateOrUpdateDepartmentQuestionsMutation();
  const { data: department } = useGetAllDepartmentQuery();

  const handleSubmit = async (
    val: ICreateDepartmentQuestions,
    actions: FormikHelpers<ICreateDepartmentQuestions>
  ) => {
    actions.setSubmitting(true);

    const response = await createLangauge({
      variables: { options: { ...val } },
    });

    if (response.data?.createOrUpdateDepartmentQuestions.success === true) {
      goBack();
    } else {
      cogoToast.error(
        response.data?.createOrUpdateDepartmentQuestions.msg ||
          "Something went wrong on server"
      );
    }

    actions.setSubmitting(false);
  };

  if (!department?.getAllDepartment) {
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
            />
          );
        }}
      </Formik>
    </LayoutProvider>
  );
};

const { parse } = queryString;

const Update = () => {
  const [initValue, setInitValue] =
    useState<ICreateDepartmentQuestions>(initialValues);
  const { goBack } = useHistory();
  const { search } = useLocation();
  const [updateLanguage] = useCreateOrUpdateDepartmentQuestionsMutation();
  const { data: department } = useGetAllDepartmentQuery();

  const [getById] = useGetDepartmentQuestionsByIdLazyQuery({
    onCompleted: (res) => {
      if (res.getDepartmentQuestionsById) {
        setInitValue({
          name: res.getDepartmentQuestionsById.name,
          isActive: res.getDepartmentQuestionsById.isActive,
          _id: res.getDepartmentQuestionsById._id,
          department: res.getDepartmentQuestionsById.department?._id || "",
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
    val: ICreateDepartmentQuestions,
    actions: FormikHelpers<ICreateDepartmentQuestions>
  ) => {
    actions.setSubmitting(true);

    const response = await updateLanguage({
      variables: { options: { ...val } },
    });

    if (response.data?.createOrUpdateDepartmentQuestions.success === true) {
      goBack();
    } else {
      cogoToast.error(
        response.data?.createOrUpdateDepartmentQuestions.msg ||
          "Something went wrong on server"
      );
    }

    actions.setSubmitting(false);
  };

  if (!department?.getAllDepartment) {
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
            />
          );
        }}
      </Formik>
    </LayoutProvider>
  );
};

const Index = () => {
  const { data, refetch } = useGetAllDepartmentQuestionsQuery();
  const { push } = useHistory();
  const [deleteLangauage] = useDeleteDepartmentQuestionsMutation();

  const handleEdit = (id: string) => () => {
    push(`?action=update&id=${id}`);
  };

  const handleDelete = (id: string) => async () => {
    await deleteLangauage({ variables: { options: { id: id } } });
    await refetch();
  };

  const columns = useMemo<TableProps["columns"]>(
    () => [
      {
        Header: "No",
        accessor: "no",
      },
      {
        Header: "department",
        accessor: "department.name",
      },
      {
        Header: "Question",
        accessor: "name",
      },
      {
        Header: "status",
        accessor: "isActive",
        Cell: (e: Cell<ICreateDepartmentQuestions>) => {
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
        Cell: (e: Cell<ICreateDepartmentQuestions>) => {
          return (
            <span style={{ display: "flex", gap: "1rem" }}>
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
      {data && _.isArray(data?.getAllDepartmentQuestions) && (
        <CustomTable
          data={data.getAllDepartmentQuestions.map((x, i) => ({
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
