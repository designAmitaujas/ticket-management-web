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
  GetAllEmailCredentialsQuery,
  ICreateEmailTemplate,
  useCreateOrUpdateEmailTemplateMutation,
  useDeleteEmailTemplateMutation,
  useGetAllEmailCredentialsQuery,
  useGetAllEmailTemplateQuery,
  useGetEmailTemplateByIdLazyQuery,
} from "../../../generated/graphql";
import CustomTable, { TableProps } from "../../component/CustomTable";
import {
  CustomButton,
  CustomCheckBox,
  CustomEditor,
  CustomInput,
  CustomSelect,
} from "../../component/Form";
import LayoutProvider from "../../component/LayoutProvider";
import { ManageLayout } from "../../component/ManageLayout";

const PAGE_TITLE = "Email Template";

const initialValues: ICreateEmailTemplate = {
  isActive: true,
  name: "",
  customId: "",
  emailCredentials: "",
  html: "",
};

const validationSchema = Yup.object().shape({
  isActive: Yup.boolean().oneOf([true, false]),
  name: Yup.string().required(),
  customId: Yup.string().required(),
  emailCredentials: Yup.string().required(),
  html: Yup.string().required(),
});

const RenderForm: FC<{
  errors: FormikErrors<ICreateEmailTemplate>;
  touched: FormikTouched<ICreateEmailTemplate>;
  values: ICreateEmailTemplate;
  emailCredentials: GetAllEmailCredentialsQuery["getAllEmailCredentials"];
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
    emailCredentials,
  }) => {
    return (
      <Form onSubmit={handleSubmit} onChange={handleChange}>
        <Row>
          <CustomInput
            err={errors.name}
            isInvalid={!!touched.name && !!errors.name}
            label={"Email Template Name"}
            name="name"
            placeholder="Enter Email Template Name"
            value={values.name}
          />

          <CustomSelect
            options={emailCredentials
              .filter((item) => item.isActive === true)
              .map((item) => ({ value: item._id, label: item.name }))}
            err={errors.emailCredentials}
            isInvalid={!!touched.emailCredentials && !!errors.emailCredentials}
            label={"Email Credentital Name"}
            name="emailCredentials"
            placeholder="Enter Credentital Name"
            value={values.emailCredentials}
          />

          <CustomInput
            err={errors.customId}
            isInvalid={!!touched.customId && !!errors.customId}
            label={"Email custom Id"}
            name="customId"
            placeholder="Enter custom Id"
            value={values.customId}
          />

          <div />

          <CustomEditor
            isInvalid={!!touched.html && !!errors.html}
            name="html"
            value={values.html}
            setFieldValue={setFieldValue}
          />

          <div />

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
  const [createLangauge] = useCreateOrUpdateEmailTemplateMutation();

  const { data, refetch } = useGetAllEmailCredentialsQuery();

  const handleSubmit = async (
    val: ICreateEmailTemplate,
    actions: FormikHelpers<ICreateEmailTemplate>
  ) => {
    actions.setSubmitting(true);

    const response = await createLangauge({
      variables: { options: { ...val } },
    });

    if (response.data?.createOrUpdateEmailTemplate.success === true) {
      goBack();
    } else {
      cogoToast.error(
        response.data?.createOrUpdateEmailTemplate.msg ||
          "Something went wrong on server"
      );
    }

    actions.setSubmitting(false);
  };

  if (!data?.getAllEmailCredentials) {
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
              emailCredentials={data.getAllEmailCredentials}
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
    useState<ICreateEmailTemplate>(initialValues);
  const { goBack } = useHistory();
  const { search } = useLocation();
  const [updateLanguage] = useCreateOrUpdateEmailTemplateMutation();

  const { data, refetch } = useGetAllEmailCredentialsQuery();

  const [getById] = useGetEmailTemplateByIdLazyQuery({
    onCompleted: (res) => {
      if (res.getEmailTemplateById) {
        setInitValue({
          _id: res.getEmailTemplateById._id,
          customId: res.getEmailTemplateById.customId,
          emailCredentials:
            res.getEmailTemplateById.emailCredentials?._id || "",
          html: res.getEmailTemplateById.html,
          isActive: res.getEmailTemplateById.isActive,
          name: res.getEmailTemplateById.name,
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
    val: ICreateEmailTemplate,
    actions: FormikHelpers<ICreateEmailTemplate>
  ) => {
    actions.setSubmitting(true);

    const response = await updateLanguage({
      variables: { options: { ...val } },
    });

    if (response.data?.createOrUpdateEmailTemplate.success === true) {
      goBack();
    } else {
      cogoToast.error(
        response.data?.createOrUpdateEmailTemplate.msg ||
          "Something went wrong on server"
      );
    }

    actions.setSubmitting(false);
  };

  if (!data?.getAllEmailCredentials) {
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
              emailCredentials={data.getAllEmailCredentials}
            />
          );
        }}
      </Formik>
    </LayoutProvider>
  );
};

const Index = () => {
  const { data, refetch } = useGetAllEmailTemplateQuery();
  const { push } = useHistory();
  const [deleteLangauage] = useDeleteEmailTemplateMutation();

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
        Header: "status",
        accessor: "isActive",
        Cell: (e: Cell<ICreateEmailTemplate>) => {
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
        Cell: (e: Cell<ICreateEmailTemplate>) => {
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
      {data && _.isArray(data?.getAllEmailTemplate) && (
        <CustomTable
          data={data.getAllEmailTemplate.map((x, i) => ({
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
