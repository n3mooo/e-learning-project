import clsx from "clsx";
import React, { useEffect } from "react";
import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import authSlice from "features/authentication/authSlice";
import { editProfileAction } from "features/profile/action";
import { fetchProfileAction } from "features/authentication/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { fetchCourseDetailAction } from "features/home/action";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import emptySubCourse from "assets/value-prop-inspire-v3.jpg";
import { unsubscribeCourseAction } from "features/cart/action";

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

function Profile() {
    const history = useHistory();
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.auth);
    const loadingUnsub = useSelector((state) => state.cart.loading);
    const profile = useSelector((state) => state.auth.profile);
    const registeredCourse = profile.chiTietKhoaHocGhiDanh;

    const formik = useFormik({
        initialValues: {
            taiKhoan: profile?.taiKhoan,
            matKhau: profile?.matKhau,
            hoTen: profile?.hoTen,
            email: profile?.email,
            soDt: profile?.soDT,
        },

        onSubmit: async (values) => {
            const newUser = {
                ...values,
                maNhom: profile?.maNhom,
                maLoaiNguoiDung: profile?.maLoaiNguoiDung,
            };
            await editProfile(newUser);
        },

        validationSchema: schema,
        validateOnChange: false,
    });

    const editProfile = async (user) => {
        await dispatch(editProfileAction(user));
        await dispatch(fetchProfileAction());
    };

    const fetchCourseDetail = async (id) => {
        await dispatch(fetchCourseDetailAction(id));
    };

    const unsubscribeCourse = async (id) => {
        const data = {
            maKhoaHoc: id,
            taiKhoan: profile?.taiKhoan,
        };
        await dispatch(unsubscribeCourseAction(data));
        await dispatch(fetchProfileAction());
    };

    const renderRegisteredCourse = () => {
        return registeredCourse?.map((item, index) => {
            return (
                <Col xs={12} sm={6} lg={12} xl={6} key={index}>
                    <Card className={clsx(styles.card, styles.flag)}>
                        <Card.Img variant='top' src={item.hinhAnh} className={styles.imgCard} />
                        <Card.Body className={styles.cardBody}>
                            <Card.Subtitle
                                className={clsx(
                                    "d-flex align-items-center justify-content-between",
                                    styles.cardSubTitle
                                )}>
                                <p>
                                    <Moment format='DD-MM-YYYY'>{item.ngayTao}</Moment>
                                </p>

                                <p>
                                    <FontAwesomeIcon icon={faEye} className='me-1' />
                                    {item.luotXem}
                                </p>
                            </Card.Subtitle>
                            <Card.Title className={styles.cardTitle}>{item.tenKhoaHoc}</Card.Title>
                            <Card.Text className={styles.cardDesc}>{item.moTa}</Card.Text>
                        </Card.Body>
                        <div
                            className={clsx(
                                "d-flex align-items-center flex-wrap justify-content-between w-100",
                                styles.cartAction
                            )}>
                            <Button
                                className={clsx("btn btnSecond", styles.cardBtn)}
                                onClick={async () => {
                                    await fetchCourseDetail(item.maKhoaHoc);
                                    history.push("/detail/" + item.biDanh);
                                }}>
                                Detail
                            </Button>
                            <Button
                                className={clsx("btn btnDark", styles.cardBtn)}
                                onClick={async () => {
                                    await unsubscribeCourse(item.maKhoaHoc);
                                }}
                                disabled={loadingUnsub}>
                                {loadingUnsub ? (
                                    <Spinner
                                        animation='border'
                                        style={{
                                            width: "1rem",
                                            height: "1rem",
                                            borderWidth: "0.2em",
                                        }}
                                    />
                                ) : (
                                    "Unsub"
                                )}
                            </Button>
                        </div>
                    </Card>
                </Col>
            );
        });
    };

    useEffect(() => {
        dispatch(fetchProfileAction());
        dispatch(authSlice.actions.clear());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className={styles.profile}>
            <Container>
                <h3 className={clsx("py-4", styles.title)}>My Information</h3>
                <Row className={styles.item}>
                    <Col xs={12} lg={6}>
                        <Form
                            className={clsx(
                                styles.form,
                                "d-flex flex-column align-items-center align-self-center position-relative w-100 m-auto bg-white"
                            )}
                            onSubmit={formik.handleSubmit}>
                            <div className='d-flex flex-row flex-nowrap justify-content-between align-items-center w-100 h-100 mb-4'>
                                <h2 className='w-100 m-0'>Infomation</h2>
                            </div>

                            <div className='d-block w-100'>
                                <Form.Group className='d-block'>
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
                                        disabled={true}
                                    />
                                </Form.Group>

                                <Form.Group className='d-block mt-3'>
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

                                <Form.Group className='d-block mt-3'>
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

                                <Form.Group className='d-block mt-3'>
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
                                <Form.Group className='d-block mt-3'>
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

                                <div className='w-100 text-end'>
                                    <Button
                                        className={clsx(
                                            "btn btnPrimary btnBlue",
                                            styles.btnFormControl
                                        )}
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
                                            "Save"
                                        )}
                                    </Button>
                                </div>

                                {error && (
                                    <Form.Text
                                        className={styles.notiError}
                                        style={{
                                            textAlign: "end",
                                            margin: ".25rem 0 0",
                                        }}>
                                        {error}
                                    </Form.Text>
                                )}
                            </div>
                        </Form>
                    </Col>
                    <Col xs={12} lg={6}>
                        <div
                            className={clsx(
                                styles.form,
                                "d-flex flex-column align-items-center align-self-center position-relative w-100 m-auto bg-white"
                            )}>
                            <div className='d-flex flex-row flex-nowrap justify-content-between align-items-center w-100 h-100 mb-4'>
                                <h2 className='w-100 m-0'>Registered courses</h2>
                            </div>
                            <div className='d-block w-100'>
                                <Row className='g-4 text-center'>
                                    {registeredCourse?.length === 0 ? (
                                        <div>
                                            <img
                                                height={100}
                                                src={emptySubCourse}
                                                alt=''
                                                style={{
                                                    width: 120,
                                                    maxWidth: "100%",
                                                    margin: "0 auto 1rem",
                                                }}
                                            />
                                            <p
                                                style={{
                                                    fontWeight: 400,
                                                    fontSize: ".9rem",
                                                }}>
                                                You have not registered for any courses yet.
                                            </p>
                                        </div>
                                    ) : (
                                        renderRegisteredCourse()
                                    )}
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Profile;
