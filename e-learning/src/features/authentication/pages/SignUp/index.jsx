import React, { useEffect } from "react";
import styles from "./style.module.css";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { signUpAction } from "features/authentication/action";
import authSlice from "features/authentication/authSlice";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import clsx from "clsx";
import imgSignUp from "assets/imgSignUp.png";

const schema = yup.object().shape({
    taiKhoan: yup.string().required("This field is required"),
    matKhau: yup
        .string()
        .required("This field is required")
        .min(6, "Password must be at least 6 characters"),
    hoTen: yup
        .string()
        .required("This field is required")
        .matches(/^[A-Za-z ]+$/, "Name is not in the correct format"),
    email: yup
        .string()
        .required("This field is required")
        .email("Please enter the correct email format"),
    soDt: yup
        .string()
        .required("This field is required")
        .matches(/(0)+([0-9]{9})\b/g, "Phone number is not in the correct format"),
});
function SignUp() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { loading, error } = useSelector((state) => state.auth);

    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
            hoTen: "",
            email: "",
            soDt: "",
        },

        onSubmit: (values) => {
            const newUser = { ...values, maNhom: "GP05" };
            signUp(newUser);
        },

        validationSchema: schema,
        validateOnChange: false,
    });

    const signUp = async (user) => {
        try {
            await dispatch(signUpAction({ user, history }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        dispatch(authSlice.actions.clear());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <section className={styles.signUpSection}>
            <Container>
                <Row className={styles.wrapper}>
                    <Col xs={12} lg={6} className='p-5'>
                        <Form
                            className={clsx(
                                styles.form,
                                "d-flex flex-column align-items-center align-self-center position-relative"
                            )}
                            onSubmit={formik.handleSubmit}>
                            <h2 className='w-100 m-0 fadeInDown'>
                                Create your free account to use us service
                            </h2>
                            <div className='d-block w-100'>
                                <Form.Group className='d-block fadeInDown'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        name='taiKhoan'
                                        type='text'
                                        className={clsx({
                                            [styles.errorInput]:
                                                formik.touched.taiKhoan && formik.errors.taiKhoan,
                                            [styles.errorInput]: error,
                                        })}
                                        value={formik.values.taiKhoan}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.taiKhoan && formik.errors.taiKhoan && (
                                        <Form.Text className={styles.notiError}>
                                            {formik.errors.taiKhoan}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group
                                    className='d-block fadeInDown'
                                    style={{ marginTop: 16, animationDelay: "200ms" }}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        name='matKhau'
                                        type='password'
                                        className={clsx({
                                            [styles.errorInput]:
                                                formik.touched.matKhau && formik.errors.matKhau,

                                            [styles.errorInput]: error,
                                        })}
                                        value={formik.values.matKhau}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.matKhau && formik.errors.matKhau && (
                                        <Form.Text className={styles.notiError}>
                                            {formik.errors.matKhau}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group
                                    className='d-block fadeInDown'
                                    style={{ marginTop: 16, animationDelay: "300ms" }}>
                                    <Form.Label>Full name</Form.Label>
                                    <Form.Control
                                        name='hoTen'
                                        type='text'
                                        className={clsx({
                                            [styles.errorInput]:
                                                formik.touched.hoTen && formik.errors.hoTen,
                                            [styles.errorInput]: error,
                                        })}
                                        value={formik.values.hoTen}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.hoTen && formik.errors.hoTen && (
                                        <Form.Text className={styles.notiError}>
                                            {formik.errors.hoTen}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group
                                    className='d-block fadeInDown'
                                    style={{ marginTop: 16, animationDelay: "400ms" }}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        name='email'
                                        type='text'
                                        placeholder='who@gmail.com'
                                        className={clsx({
                                            [styles.errorInput]:
                                                formik.touched.email && formik.errors.email,
                                            [styles.errorInput]: error,
                                        })}
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <Form.Text className={styles.notiError}>
                                            {formik.errors.email}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group
                                    className='d-block fadeInDown'
                                    style={{ marginTop: 16, animationDelay: "500ms" }}>
                                    <Form.Label>Phone number</Form.Label>
                                    <Form.Control
                                        name='soDt'
                                        type='text'
                                        placeholder='0999888777'
                                        className={clsx({
                                            [styles.errorInput]:
                                                formik.touched.soDt && formik.errors.soDt,
                                            [styles.errorInput]: error,
                                        })}
                                        value={formik.values.soDt}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.soDt && formik.errors.soDt && (
                                        <Form.Text className={styles.notiError}>
                                            {formik.errors.soDt}
                                        </Form.Text>
                                    )}
                                </Form.Group>
                                <Button
                                    className={clsx(
                                        "btn btnPrimary btnBlue fadeInUp",
                                        styles.btnFormControl
                                    )}
                                    style={{ animationDelay: "600ms" }}
                                    type='submit'
                                    disabled={loading}>
                                    {loading ? (
                                        <Spinner
                                            animation='border'
                                            style={{
                                                width: "1rem",
                                                height: "1rem",
                                                borderWidth: "0.2em",
                                            }}
                                        />
                                    ) : (
                                        "Submit"
                                    )}
                                </Button>
                                {error && (
                                    <Form.Text
                                        className={styles.notiError}
                                        style={{ textAlign: "center", margin: ".25rem 0 32px" }}>
                                        {error}
                                    </Form.Text>
                                )}
                                <Form.Text
                                    className='fadeInUp'
                                    style={{ marginTop: "32px", animationDelay: "700ms" }}>
                                    Already have an account?
                                    <button
                                        onClick={() => {
                                            history.push("/signin");
                                        }}
                                        style={{
                                            backgroundColor: "transparent",
                                            border: "none",
                                            boxShadow: "none",
                                            color: "rgba(0,0,0,0.6)",
                                            fontSize: 12,
                                            textDecoration: "underline",
                                        }}>
                                        Sign in
                                    </button>
                                </Form.Text>
                            </div>
                        </Form>
                    </Col>

                    <Col xs={12} lg={6} className={clsx("fadeInRight", styles.imgBox)}>
                        <img src={imgSignUp} alt='' />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default SignUp;
