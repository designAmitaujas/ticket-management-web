import { Formik } from "formik";
import { FC, memo, useMemo } from "react";
import { Form, Row } from "react-bootstrap";
import isEqual from "react-fast-compare";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { TableProps } from "../../../component/CustomTable";
import {
  CustomButton,
  CustomCheckBox,
  CustomInput,
} from "../../../component/Form";
import LayoutProvider from "../../../component/LayoutProvider";

const PAGE_TITLE = "Ticket";

const initialValues = {
  isActive: true,
  name: "",
};

const validationSchema = Yup.object().shape({
  isActive: Yup.boolean().oneOf([true, false]),
  name: Yup.string().required(),
});

const Add = () => {
  const { goBack } = useHistory();

  const handleSubmit = async () => {};

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

const RenderForm: FC<{
  errors: any;
  touched: any;
  values: any;
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
            label={"Country"}
            name="name"
            placeholder="Enter Your Country"
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

const ViewTicket = () => {
  const { push } = useHistory();

  const handleEdit = (id: string) => () => {
    push(`?action=update&id=${id}`);
  };

  const handleDelete = (id: string) => async () => {};

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
    ],
    []
  );

  return (
    <>
      <LayoutProvider title={PAGE_TITLE} isAddButton={true}></LayoutProvider>
    </>
  );
};

export default ViewTicket;
