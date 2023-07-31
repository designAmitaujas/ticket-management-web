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
  ICreateEmailCredential,
  useCreateOrUpdateEmailCredentialMutation,
  useDeleteEmailCredentialMutation,
  useGetAllEmailCredentialsQuery,
  useGetEmailCredentialsByIdLazyQuery,
} from "../../../generated/graphql";
import CustomTable, { TableProps } from "../../component/CustomTable";
import {
  CustomButton,
  CustomCheckBox,
  CustomInput,
} from "../../component/Form";
import LayoutProvider from "../../component/LayoutProvider";
import { ManageLayout } from "../../component/ManageLayout";

const PAGE_TITLE = "Email Credential";

const initialValues: ICreateEmailCredential = {
  isActive: true,
  name: "",
  authPassword: "",
  authUser: "",
  host: "",
  port: 0,
  secure: true,
};

const validationSchema = Yup.object().shape({
  isActive: Yup.boolean().oneOf([true, false]),
  name: Yup.string().required(),
  authPassword: Yup.string().required(),
  authUser: Yup.string().required(),
  host: Yup.string().required(),
  port: Yup.number().required(),
  secure: Yup.boolean().oneOf([true, false]),
});

const RenderForm: FC<{
  errors: FormikErrors<ICreateEmailCredential>;
  touched: FormikTouched<ICreateEmailCredential>;
  values: ICreateEmailCredential;
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
            label={"Email Credentital Name"}
            name="name"
            placeholder="Enter Credentital Name"
            value={values.name}
          />

          <CustomInput
            err={errors.host}
            isInvalid={!!touched.host && !!errors.host}
            label={"Email Host"}
            name="host"
            placeholder="Enter Email Host"
            value={values.host}
          />

          <CustomInput
            err={errors.port}
            isInvalid={!!touched.port && !!errors.port}
            label={"Email Port"}
            name="port"
            placeholder="Enter Email Port"
            value={values.port}
          />

          <CustomInput
            err={errors.authUser}
            isInvalid={!!touched.authUser && !!errors.authUser}
            label={"Email username"}
            name="authUser"
            placeholder="Enter Email username"
            value={values.authUser}
          />

          <CustomInput
            err={errors.authPassword}
            isInvalid={!!touched.authPassword && !!errors.authPassword}
            label={"Email Password"}
            name="authPassword"
            placeholder="Enter Email Password"
            value={values.authPassword}
          />

          <div />

          <CustomCheckBox
            isInvalid={!!touched.secure && !!errors.secure}
            label="is secure"
            name="secure"
            setFieldValue={setFieldValue}
            value={values.secure}
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
  const [createLangauge] = useCreateOrUpdateEmailCredentialMutation();

  const handleSubmit = async (
    val: ICreateEmailCredential,
    actions: FormikHelpers<ICreateEmailCredential>
  ) => {
    actions.setSubmitting(true);

    const response = await createLangauge({
      variables: { options: { ...val, port: _.toNumber(val.port) } },
    });

    if (response.data?.createOrUpdateEmailCredential.success === true) {
      goBack();
    } else {
      cogoToast.error(
        response.data?.createOrUpdateEmailCredential.msg ||
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
  const [initValue, setInitValue] =
    useState<ICreateEmailCredential>(initialValues);
  const { goBack } = useHistory();
  const { search } = useLocation();
  const [updateLanguage] = useCreateOrUpdateEmailCredentialMutation();

  const [getById] = useGetEmailCredentialsByIdLazyQuery({
    onCompleted: (res) => {
      if (res.getEmailCredentialsById) {
        setInitValue({
          authPassword: res.getEmailCredentialsById.authPassword,
          authUser: res.getEmailCredentialsById.authUser,
          host: res.getEmailCredentialsById.host,
          isActive: res.getEmailCredentialsById.isActive,
          name: res.getEmailCredentialsById.name,
          port: res.getEmailCredentialsById.port,
          secure: res.getEmailCredentialsById.secure,
          _id: res.getEmailCredentialsById._id,
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
    val: ICreateEmailCredential,
    actions: FormikHelpers<ICreateEmailCredential>
  ) => {
    actions.setSubmitting(true);

    const response = await updateLanguage({
      variables: { options: { ...val, port: _.toNumber(val.port) } },
    });

    if (response.data?.createOrUpdateEmailCredential.success === true) {
      goBack();
    } else {
      cogoToast.error(
        response.data?.createOrUpdateEmailCredential.msg ||
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
  const { data, refetch } = useGetAllEmailCredentialsQuery();
  const { push } = useHistory();
  const [deleteLangauage] = useDeleteEmailCredentialMutation();

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
        Header: "Host",
        accessor: "host",
      },
      {
        Header: "Port",
        accessor: "port",
      },
      {
        Header: "Secure",
        accessor: "secure",
        Cell: (e: Cell<ICreateEmailCredential>) => {
          return e.value === true ? (
            <Badge bg="primary">active</Badge>
          ) : (
            <Badge bg="danger">disable</Badge>
          );
        },
      },
      {
        Header: "status",
        accessor: "isActive",
        Cell: (e: Cell<ICreateEmailCredential>) => {
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
        Cell: (e: Cell<ICreateEmailCredential>) => {
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
      {data && _.isArray(data?.getAllEmailCredentials) && (
        <CustomTable
          data={data.getAllEmailCredentials.map((x, i) => ({
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
