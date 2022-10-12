import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faAngleRight, faCalendarAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import homeSlice from "features/home/homeSlice";
import React, { useEffect } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./style.module.css";

function CourseDetail() {
    const history = useHistory();
    const dispatch = useDispatch();
    const courseDetail = useSelector((state) => state.home.courseDetail);
    const cart = useSelector((state) => state.home.cart);

    const addToCart = (item) => {
        dispatch(homeSlice.actions.updateCart(item));
    };

    useEffect(() => {
        setTimeout(() => {
            if (!courseDetail) history.push("/");
        });

        clearTimeout();
    });

    const renderCourseDetail = () => {
        return (
            <>
                <Col xs={12} lg={8} xl={9} className='pe-lg-5'>
                    <div className={styles.breadcrumb}>
                        <div className='d-flex align-items-center'>
                            <p className='m-0 p-0 text-uppercase'>
                                {courseDetail.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                            </p>
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className='mx-2'
                                style={{ fontSize: "0.875rem" }}
                            />
                        </div>
                        <span>Course information</span>
                    </div>
                    <h3 className={clsx(styles.title, "fadeInUp")}>{courseDetail.tenKhoaHoc}</h3>
                    <p
                        className='fadeInUP'
                        style={{
                            animationDelay: "100ms",
                            marginBottom: ".5rem",
                            fontSize: "1.1rem",
                        }}>
                        {courseDetail.moTa}
                    </p>
                    <div
                        className='d-flex align-items-center gap-4 fadeInUP'
                        style={{ marginBottom: "0.5rem", animationDelay: "200ms" }}>
                        <div className={clsx("d-flex align-items-center", styles.rate)}>
                            <span className='me-1'>5.0</span>
                            <FontAwesomeIcon icon={faStar} className={styles.iconStar} />
                            <FontAwesomeIcon icon={faStar} className={styles.iconStar} />
                            <FontAwesomeIcon icon={faStar} className={styles.iconStar} />
                            <FontAwesomeIcon icon={faStar} className={styles.iconStar} />
                            <FontAwesomeIcon icon={faStar} className={styles.iconStar} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faEye} className='me-1' />
                            <span>{courseDetail.luotXem}</span>
                        </div>
                    </div>
                    <span className='d-flex fadeInUp' style={{ animationDelay: "300ms" }}>
                        Created by
                        <p className={styles.creator}>{courseDetail.nguoiTao.hoTen}</p>
                    </span>
                    <div
                        className={clsx(styles.dateCreate, "fadeInUp")}
                        style={{ animationDelay: "400ms" }}>
                        <FontAwesomeIcon
                            icon={faCalendarAlt}
                            className={clsx("me-1", styles.iconCalendar)}
                        />
                        <span>{courseDetail.ngayTao}</span>
                    </div>
                </Col>
                <Col xs={12} lg={4} xl={3} className='mt'>
                    <div className={clsx(styles.sideRight, "fadeInRight")}>
                        <img
                            src={courseDetail.hinhAnh}
                            alt=''
                            style={{
                                borderTopLeftRadius: "1rem",
                                borderTopRightRadius: "1rem",
                            }}
                        />
                        <div className={styles.content}>
                            <span>Free</span>
                            <div className={styles.action}>
                                {foundCourse !== -1 ? (
                                    <Button
                                        className='btn btnPrimary'
                                        onClick={() => history.push("/cart")}>
                                        Go to cart
                                    </Button>
                                ) : (
                                    <Button
                                        className='btn btnDark'
                                        onClick={() => addToCart(courseDetail)}>
                                        Add to cart
                                    </Button>
                                )}
                                <Button className='btn btnOutline'>Buy now</Button>
                            </div>
                        </div>
                    </div>
                </Col>
            </>
        );
    };

    const foundCourse = cart?.findIndex((x) => x.maKhoaHoc === courseDetail.maKhoaHoc);

    return (
        <section className={styles.detail}>
            <Container>
                <Row className='pt-4'>
                    {!courseDetail ? (
                        <div
                            style={{
                                width: "100%",
                                textAlign: "center",
                            }}>
                            <Spinner animation='border' />
                        </div>
                    ) : (
                        renderCourseDetail()
                    )}
                </Row>
            </Container>
        </section>
    );
}

export default CourseDetail;
