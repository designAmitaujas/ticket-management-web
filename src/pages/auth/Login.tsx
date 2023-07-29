import { Formik, FormikHelpers } from "formik";
import _ from "lodash";
import { Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";

// actions

// store

// components

import AuthLayout from "./AuthLayout";

// images
// import logoDark from "../../assets/images/logo-dark.png";
// import logoLight from "../../assets/images/logo-light.png";

import cogoToast from "cogo-toast";
import jwtDecode from "jwt-decode";
import {
  default as logoDark,
  default as logoLight,
} from "../../cust/assets/amitaujas.png";
import { CustomButton, CustomInput } from "../../cust/component/Form";
import { useAuthResolverMutation } from "../../generated/graphql";
import { useAppStore } from "../../store";

/* bottom links */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className="mt-3">
      <Col xs={12} className="text-center">
        <p className="text-muted">
          {t("Don't have an account?")}{" "}
          <Link to={"/auth/register"} className="text-primary fw-bold ms-1">
            {t("Sign Up")}
          </Link>
        </p>
      </Col>
    </Row>
  );
};

const initalValue = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(12).required(),
});

const Login = () => {
  const { t } = useTranslation();

  const [create] = useAuthResolverMutation();
  const { addAuth } = useAppStore();
  const { push } = useHistory();

  const handleSubmit = async (
    val: typeof initalValue,
    actions: FormikHelpers<typeof initalValue>
  ) => {
    try {
      actions.setSubmitting(true);

      const response = await create({
        variables: { options: { email: val.email, password: val.password } },
      });

      if (response.data?.authResolver.success === true) {
        // @ts-ignore
        const isAdmin = jwtDecode(response.data.authResolver.jwt).isAdmin;

        addAuth({
          username: _.capitalize(response.data.authResolver.name),
          email: _.toLower(response.data.authResolver.email),
          jwt: response.data.authResolver.jwt,
          isAdmin: isAdmin,
          custObje: {
            _id: response.data.authResolver.user?._id || "",
            email: response.data.authResolver.user?.email || "",
            hash: response.data.authResolver.user?.hash || "",
            isActive: response.data.authResolver.user?.isActive || false,
            isAdmin: response.data.authResolver.user?.isAdmin || false,
            isCompany: response.data.authResolver.user?.isCompany || false,
            isCustomer: response.data.authResolver.user?.isCustomer || false,
            isMiddleMan: response.data.authResolver.user?.isMiddleMan || false,
            isSuperAdmin:
              response.data.authResolver.user?.isSuperAdmin || false,
            name: response.data.authResolver.user?.name || "",
          },
        });

        if (isAdmin) {
          push("/admin");
        } else {
          push("/user");
        }
      }

      if (response.data?.authResolver.success === false) {
        cogoToast.error(_.capitalize(response.data.authResolver.msg));
      }

      actions.setSubmitting(false);
    } catch (Err) {}
  };

  return (
    <>
      <AuthLayout bottomLinks={false ? <BottomLink /> : <></>}>
        <div className="auth-logo mx-auto">
          <Link to="/" className="logo logo-dark text-center">
            <span className="logo-lg">
              <img src={logoDark} alt="" height="64" />
            </span>
          </Link>

          <Link to="/" className="logo logo-light text-center">
            <span className="logo-lg">
              <img src={logoLight} alt="" height="64" />
            </span>
          </Link>
        </div>

        <h6 className="h5 mb-0 mt-3">{t("Welcome back!")}</h6>
        <p className="text-muted mt-1 mb-4">
          {t("Enter your email address and password to access admin panel.")}
        </p>

        <Formik
          initialValues={initalValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            touched,
            errors,
            values,
            isSubmitting,
            handleChange,
            handleSubmit,
          }) => (
            <Form onChange={handleChange} onSubmit={handleSubmit}>
              <Row>
                <CustomInput
                  value={values.email}
                  name="email"
                  err={errors.email}
                  label="Email"
                  md="12"
                  lg="12"
                  isInvalid={!!touched.email && !!errors.email}
                  placeholder="Please Enter Your Email Address"
                />
                <CustomInput
                  type="password"
                  value={values.password}
                  name="password"
                  err={errors.password}
                  label="password"
                  md="12"
                  lg="12"
                  isInvalid={!!touched.password && !!errors.password}
                  placeholder="Please Enter Your password"
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

export default Login;
