import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import styles from "./style.module.css";
import * as yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signInAction } from "features/authentication/action";
import authSlice from "features/authentication/authSlice";
import imgLogin from "assets/imgLogin.png";

const schema = yup.object().shape({
    taiKhoan: yup.string().required("This field is required"),
    matKhau: yup.string().required("This field is required"),
});

function SignIn() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { loading, error } = useSelector((state) => state.auth);

    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
        },

        onSubmit: (values) => {
            const user = { ...values };
            signIn(user);
        },

        validationSchema: schema,
        validateOnChange: false,
    });

    const signIn = async (user) => {
        try {
            await dispatch(signInAction({ user, history }));
        } catch (error) {
            return error;
        }
    };

    useEffect(() => {
        dispatch(authSlice.actions.clear());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className={styles.loginSection}>
            <Container>
                <Row className={styles.wrapper}>
                    <Col xs={12} lg={6} className='p-5'>
                        <Form
                            className={clsx(
                                styles.form,
                                "d-flex flex-column align-items-center align-self-center position-relative"
                            )}
                            onSubmit={formik.handleSubmit}>
                            <h2 className='w-100 m-0'>Log in</h2>
                            <div className='d-block w-100'>
                                <Form.Group className='d-block'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        name='taiKhoan'
                                        type='text'
                                        className={clsx(
                                            {
                                                [styles.errorInput]:
                                                    formik.touched.taiKhoan &&
                                                    formik.errors.taiKhoan,
                                            },
                                            {
                                                [styles.errorInput]: error,
                                            }
                                        )}
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

                                <Form.Group className='d-block' style={{ marginTop: 16 }}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        name='matKhau'
                                        type='password'
                                        className={clsx(
                                            {
                                                [styles.errorInput]:
                                                    formik.touched.matKhau && formik.errors.matKhau,
                                            },
                                            {
                                                [styles.errorInput]: error,
                                            }
                                        )}
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

                                <Button
                                    className={clsx(
                                        "btn btnPrimary btnBlue",
                                        styles.btnFormControl
                                    )}
                                    type='submit'
                                    disabled={loading}>
                                    {loading ? <Spinner animation='border' /> : "Submit"}
                                </Button>
                                {error && (
                                    <Form.Text
                                        className={styles.notiError}
                                        style={{ textAlign: "center", margin: ".25rem 0 32px" }}>
                                        {error}
                                    </Form.Text>
                                )}
                                <Form.Text style={{ marginTop: "32px" }}>
                                    Don't have an account?
                                    <button
                                        onClick={() => {
                                            history.push("/signup");
                                        }}
                                        style={{
                                            backgroundColor: "transparent",
                                            border: "none",
                                            boxShadow: "none",
                                            color: "rgba(0,0,0,0.6)",
                                            fontSize: 12,
                                            textDecoration: "underline",
                                        }}>
                                        Sign up
                                    </button>
                                </Form.Text>
                            </div>
                        </Form>
                    </Col>

                    <Col
                        xs={12}
                        lg={6}
                        className='p-5'
                        style={{ backgroundColor: "#3742FA", borderRadius: 20 }}>
                        <img src={imgLogin} alt='' />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default SignIn;
