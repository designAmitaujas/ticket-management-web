import cogoToast from "cogo-toast";
import FetherIcon from "feather-icons-react";
import { Formik, FormikErrors, FormikHelpers, FormikTouched } from "formik";
import _ from "lodash";
import queryString from "query-string";
import { FC, memo, useEffect, useMemo, useState } from "react";
import { Badge, Button, Col, Form, Row } from "react-bootstrap";
import isEqual from "react-fast-compare";
import { useHistory, useLocation } from "react-router-dom";
import { Cell } from "react-table";
import * as Yup from "yup";
import {
  GetAllDepartmentQuery,
  ICreateUser,
  useCreateOrUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllDepartmentQuery,
  useGetAllUserQuery,
  useGetUserByIdLazyQuery,
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

const PAGE_TITLE = "User Management";

const initialValues: ICreateUser = {
  isActive: true,
  name: "",
  assignedDepartment: "",
  email: "",
  hash: "",
  isAdmin: false,
  isCompany: false,
  isCustomer: false,
  isMiddleMan: false,
  isSuperAdmin: false,
  isManaging: false,
};

const validationSchema = Yup.object().shape({
  isActive: Yup.boolean().oneOf([true, false]),
  name: Yup.string().required(),
  assignedDepartment: Yup.string().when("isCustomer", {
    is: (v: boolean) => v === false,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
  email: Yup.string().email().required(),
  hash: Yup.string().min(8).required(),
  isAdmin: Yup.boolean().oneOf([true, false]),
  isCompany: Yup.boolean().oneOf([true, false]),
  isCustomer: Yup.boolean().oneOf([true, false]),
  isMiddleMan: Yup.boolean().oneOf([true, false]),
  isSuperAdmin: Yup.boolean().oneOf([true, false]),
  isManaging: Yup.boolean().oneOf([true, false]),
});

const RenderForm: FC<{
  errors: FormikErrors<ICreateUser>;
  touched: FormikTouched<ICreateUser>;
  values: ICreateUser;
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
          <CustomInput
            err={errors.name}
            isInvalid={!!touched.name && !!errors.name}
            label={"name"}
            name="name"
            placeholder="Enter user name"
            value={values.name}
          />

          <CustomSelect
            options={department
              .filter((item) => item.isActive === true)
              .map((item) => ({ value: item._id, label: item.name }))}
            err={errors.assignedDepartment}
            isInvalid={
              !!touched.assignedDepartment && !!errors.assignedDepartment
            }
            label={"Assigned Department"}
            name="assignedDepartment"
            placeholder="Enter Assigned Department"
            value={values.assignedDepartment}
          />

          <CustomInput
            err={errors.email}
            isInvalid={!!touched.email && !!errors.email}
            label={"email"}
            name="email"
            placeholder="Enter Your email"
            value={values.email}
          />

          <CustomInput
            err={errors.hash}
            isInvalid={!!touched.hash && !!errors.hash}
            label={"Password"}
            name="hash"
            placeholder="Enter Your Password"
            value={values.hash}
          />

          <Col md="4" className="mt-1">
            <Form.Label>User Role</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={
                values.isCustomer
                  ? "1"
                  : values.isMiddleMan
                  ? "2"
                  : values.isCompany
                  ? "3"
                  : ""
              }
              isInvalid={
                (!!touched.isCustomer && !!errors.isCustomer) ||
                (!!touched.isMiddleMan && !!errors.isMiddleMan) ||
                (!!touched.isCompany && !!errors.isCompany)
              }
              onChange={(e) => {
                // @ts-ignore
                if (e.target.value === "1") {
                  setFieldValue("isCustomer", true);
                  setFieldValue("isMiddleMan", false);
                  setFieldValue("isCompany", false);
                }
                // @ts-ignore
                if (e.target.value === "2") {
                  setFieldValue("isCustomer", false);
                  setFieldValue("isMiddleMan", true);
                  setFieldValue("isCompany", false);
                }

                // @ts-ignore
                if (e.target.value === "3") {
                  setFieldValue("isCustomer", false);
                  setFieldValue("isMiddleMan", false);
                  setFieldValue("isCompany", true);
                }
              }}
            >
              <option>Select</option>
              <option value="1">Customer</option>
              <option value="2">Contetra Team</option>
              <option value="3">Tridot Company</option>
            </Form.Select>
          </Col>

          {/* <CustomCheckBox
            isInvalid={!!touched.isCustomer && !!errors.isCustomer}
            label="Customer"
            name="isCustomer"
            setFieldValue={setFieldValue}
            value={values.isCustomer}
          />

          <CustomCheckBox
            isInvalid={!!touched.isMiddleMan && !!errors.isMiddleMan}
            label="Contetra Team"
            name="isMiddleMan"
            setFieldValue={setFieldValue}
            value={values.isMiddleMan}
          />

          <CustomCheckBox
            isInvalid={!!touched.isCompany && !!errors.isCompany}
            label="Tridot Company"
            name="isCompany"
            setFieldValue={setFieldValue}
            value={values.isCompany}
          /> */}

          {(values.isCompany === true || values.isMiddleMan === true) && (
            <CustomCheckBox
              isInvalid={!!touched.isManaging && !!errors.isManaging}
              label="is Admin"
              name="isManaging"
              setFieldValue={setFieldValue}
              value={values.isManaging}
            />
          )}

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
  const [createLangauge] = useCreateOrUpdateUserMutation();
  const { data } = useGetAllDepartmentQuery();

  const handleSubmit = async (
    val: ICreateUser,
    actions: FormikHelpers<ICreateUser>
  ) => {
    actions.setSubmitting(true);

    const response = await createLangauge({
      variables: { options: { ...val } },
    });

    if (response.data?.createOrUpdateUser.success === true) {
      goBack();
    } else {
      cogoToast.error(
        response.data?.createOrUpdateUser.msg ||
          "Something went wrong on server"
      );
    }

    actions.setSubmitting(false);
  };

  if (!data?.getAllDepartment) {
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
              department={data.getAllDepartment}
            />
          );
        }}
      </Formik>
    </LayoutProvider>
  );
};

const { parse } = queryString;

const Update = () => {
  const [initValue, setInitValue] = useState<ICreateUser>(initialValues);
  const { goBack } = useHistory();
  const { search } = useLocation();
  const [updateLanguage] = useCreateOrUpdateUserMutation();
  const { data } = useGetAllDepartmentQuery();

  const [getById] = useGetUserByIdLazyQuery({
    onCompleted: (res) => {
      if (res.getUserById) {
        setInitValue({
          name: res.getUserById.name,
          isActive: res.getUserById.isActive,
          _id: res.getUserById._id,
          assignedDepartment: res.getUserById.assignedDepartment?._id || "",
          email: res.getUserById.email,
          hash: res.getUserById.hash,
          isAdmin: res.getUserById.isAdmin,
          isCompany: res.getUserById.isCompany,
          isCustomer: res.getUserById.isCustomer,
          isMiddleMan: res.getUserById.isMiddleMan,
          isSuperAdmin: res.getUserById.isSuperAdmin,
          isManaging: res.getUserById.isManaging,
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
    val: ICreateUser,
    actions: FormikHelpers<ICreateUser>
  ) => {
    actions.setSubmitting(true);

    const response = await updateLanguage({
      variables: { options: { ...val } },
    });

    if (response.data?.createOrUpdateUser.success === true) {
      goBack();
    } else {
      cogoToast.error(
        response.data?.createOrUpdateUser.msg ||
          "Something went wrong on server"
      );
    }

    actions.setSubmitting(false);
  };

  if (!data?.getAllDepartment) {
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
              department={data.getAllDepartment}
            />
          );
        }}
      </Formik>
    </LayoutProvider>
  );
};

const Index = () => {
  const { data, refetch } = useGetAllUserQuery();
  const { push } = useHistory();
  const [deleteLangauage] = useDeleteUserMutation();

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
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Role",
        accessor: "isCustomer",
        Cell: (e: Cell<ICreateUser>) => {
          return (
            <>
              {e.row.original.isCustomer
                ? "Customer"
                : e.row.original.isCompany
                ? "Tridot Company"
                : "Contetra Team"}
            </>
          );
        },
      },
      {
        Header: "Departmemnt",
        accessor: "assignedDepartment.name",
      },
      {
        Header: "is Admin",
        accessor: "isManaging",
        Cell: (e: Cell<ICreateUser>) => {
          return e.value === true ? (
            <Badge bg="primary">
              <FetherIcon size="20" icon="check-circle" />
            </Badge>
          ) : (
            <Badge bg="danger">
              <FetherIcon size="20" icon="x-circle" />
            </Badge>
          );
        },
      },
      {
        Header: "status",
        accessor: "isActive",
        Cell: (e: Cell<ICreateUser>) => {
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
        Cell: (e: Cell<ICreateUser>) => {
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
      {data && _.isArray(data?.getAllUser) && (
        <CustomTable
          data={data.getAllUser
            .filter((item) => item.isAdmin === false)
            .filter((item) => item.isSuperAdmin === false)
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
