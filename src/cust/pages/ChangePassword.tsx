import cogoToast from "cogo-toast";
import { Formik } from "formik";
import { Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { CustomButton, CustomInput } from "../../cust/component/Form";
import {
  IChangePassword,
  useChangePasswordMutation,
} from "../../generated/graphql";
import AuthLayout from "../../pages/auth/AuthLayout";

const yup = require("yup");

const initialValues = {
  newPassword: "",
  oldPassword: "",
};
const validationSchema = yup.object().shape({
  newPassword: yup.string().required(),
  oldPassword: yup.string().required(),
});

const ChangePassword = () => {
  const [data] = useChangePasswordMutation();
  const { push } = useHistory();

  const handleSubmit = async (values: IChangePassword) => {
    try {
      const res = await data({
        variables: {
          options: {
            newPassword: values.newPassword,
            oldPassword: values.oldPassword,
          },
        },
      });
      res.data?.changePassword.success === true
        ? cogoToast.success(res.data?.changePassword.msg)
        : cogoToast.error(res.data?.changePassword.msg);

      // cogoToast.info(res.data?.updateUserPassword.msg);
    } catch (err) {
      console.log(err);
      cogoToast.error("Network Error");
    }
  };

  return (
    <>
      <AuthLayout>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({
            touched,
            errors,
            values,
            isSubmitting,
            handleChange,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit} onChange={handleChange}>
              <Row>
                <CustomInput
                  value={values.oldPassword}
                  name="oldPassword"
                  err={errors.oldPassword}
                  label="oldPassword"
                  md="12"
                  lg="12"
                  isInvalid={!!touched.oldPassword && !!errors.oldPassword}
                  placeholder="Please Enter Your old Password"
                />
                <CustomInput
                  value={values.newPassword}
                  name="newPassword"
                  err={errors.newPassword}
                  label="newPassword"
                  md="12"
                  lg="12"
                  isInvalid={!!touched.newPassword && !!errors.newPassword}
                  placeholder="Please Enter Your New Password"
                />

                <CustomButton isSubmitting={isSubmitting} />
              </Row>
            </Form>
          )}
        </Formik>
      </AuthLayout>
    </>
  );
};

export default ChangePassword;
