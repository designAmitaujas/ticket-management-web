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
  ICreateDepartment,
  useCreateOrUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetAllDepartmentQuery,
  useGetDepartmentByIdLazyQuery,
} from "../../../generated/graphql";
import CustomTable, { TableProps } from "../../component/CustomTable";
import {
  CustomButton,
  CustomCheckBox,
  CustomInput,
} from "../../component/Form";
import LayoutProvider from "../../component/LayoutProvider";
import { ManageLayout } from "../../component/ManageLayout";

const PAGE_TITLE = "Department";

const initialValues: ICreateDepartment = {
  isActive: true,
  name: "",
};

const validationSchema = Yup.object().shape({
  isActive: Yup.boolean().oneOf([true, false]),
  name: Yup.string().required(),
});

const RenderForm: FC<{
  errors: FormikErrors<ICreateDepartment>;
  touched: FormikTouched<ICreateDepartment>;
  values: ICreateDepartment;
  handleSubmit: any;
  handleChange: any;
  setFieldValue: (arg0: string, val: any) => void;
  isSubmitting: boolean;
}> = memo(
  ({
    errors,
    touched,
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    isSubmitting,
  }) => {
    return (
      <Form onSubmit={handleSubmit} onChange={handleChange}>
        <Row>
          <CustomInput
            err={errors.name}
            isInvalid={!!touched.name && !!errors.name}
            label={"Department"}
            name="name"
            placeholder="Enter Your Department"
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
  const [createLangauge] = useCreateOrUpdateDepartmentMutation();

  const handleSubmit = async (
    val: ICreateDepartment,
    actions: FormikHelpers<ICreateDepartment>
  ) => {
    actions.setSubmitting(true);

    const response = await createLangauge({
      variables: { options: { ...val } },
    });

    if (response.data?.createOrUpdateDepartment.success === true) {
      goBack();
    } else {
      cogoToast.error(
        response.data?.createOrUpdateDepartment.msg ||
          "Something went wrong on server"
      );
    }

    actions.setSubmitting(false);
  };

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
            />
          );
        }}
      </Formik>
    </LayoutProvider>
  );
};

const { parse } = queryString;

const Update = () => {
  const [initValue, setInitValue] = useState<ICreateDepartment>(initialValues);
  const { goBack } = useHistory();
  const { search } = useLocation();
  const [updateLanguage] = useCreateOrUpdateDepartmentMutation();

  const [getById] = useGetDepartmentByIdLazyQuery({
    onCompleted: (res) => {
      if (res.getDepartmentById) {
        setInitValue({
          name: res.getDepartmentById.name,
          isActive: res.getDepartmentById.isActive,
          _id: res.getDepartmentById._id,
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
    val: ICreateDepartment,
    actions: FormikHelpers<ICreateDepartment>
  ) => {
    actions.setSubmitting(true);

    const response = await updateLanguage({
      variables: { options: { ...val } },
    });

    if (response.data?.createOrUpdateDepartment.success === true) {
      goBack();
    } else {
      cogoToast.error(
        response.data?.createOrUpdateDepartment.msg ||
          "Something went wrong on server"
      );
    }

    actions.setSubmitting(false);
  };

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
            />
          );
        }}
      </Formik>
    </LayoutProvider>
  );
};

const Index = () => {
  const { data, refetch } = useGetAllDepartmentQuery();
  const { push } = useHistory();
  const [deleteLangauage] = useDeleteDepartmentMutation();

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
        Header: "Department",
        accessor: "name",
      },
      {
        Header: "status",
        accessor: "isActive",
        Cell: (e: Cell<ICreateDepartment>) => {
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
        Cell: (e: Cell<ICreateDepartment>) => {
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
      {data && _.isArray(data?.getAllDepartment) && (
        <CustomTable
          data={data.getAllDepartment.map((x, i) => ({
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
