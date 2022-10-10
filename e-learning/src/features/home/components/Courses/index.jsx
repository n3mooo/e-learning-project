import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner, Tab, Tabs } from "react-bootstrap";
import styles from "./style.module.css";
// import human3 from "assets/human3.png";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCourseDetailAction,
    fetchCoursesAction,
    fetchCoursesOfTopicAction,
    fetchTopicsAction,
} from "features/home/action";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useHistory } from "react-router-dom";

function Course() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [key, setKey] = useState("all");

    const topics = useSelector((state) => state.home.topics);
    const courses = useSelector((state) => state.home.courses);
    const coursesOfTopic = useSelector((state) => state.home.coursesOfTopic);

    const fetchCoursesOfTopic = async (k) => {
        await dispatch(fetchCoursesOfTopicAction(k));
    };

    const fetchTopics = async () => {
        await dispatch(fetchTopicsAction());
    };

    const fetchCourses = async () => {
        await dispatch(fetchCoursesAction());
    };

    const fetchCourseDetail = async (id) => {
        await dispatch(fetchCourseDetailAction(id));
    };

    //render all course
    const renderAllCourse = () => {
        return (
            <Tab
                eventKey='all'
                title='All'
                tabClassName={clsx("fadeInUp", styles.btnTab, { [styles.active]: key === "all" })}>
                <Row className={clsx("fadeInUp", styles.tabContent)}>
                    {!courses ? (
                        <div
                            style={{
                                width: "100%",
                                textAlign: "center",
                                paddingTop: "2rem",
                            }}>
                            <Spinner animation='border' />
                        </div>
                    ) : (
                        courses?.map((item, index) => {
                            return (
                                <Col xs={12} sm={6} md={4} xl={3} className='g-4' key={index}>
                                    <Card className={styles.card}>
                                        <Card.Img
                                            variant='top'
                                            src={item.hinhAnh}
                                            className={styles.imgCard}
                                        />
                                        <Card.Body className={styles.cardBody}>
                                            <Card.Subtitle
                                                className={clsx(
                                                    "d-flex align-items-center justify-content-between",
                                                    styles.cardSubTitle
                                                )}>
                                                <p>{item.ngayTao}</p>
                                                <p>
                                                    <FontAwesomeIcon
                                                        icon={faEye}
                                                        className='me-1'
                                                    />
                                                    {item.luotXem}
                                                </p>
                                            </Card.Subtitle>
                                            <Card.Title className={styles.cardTitle}>
                                                {item.tenKhoaHoc}
                                            </Card.Title>
                                            <Card.Text className={styles.cardDesc}>
                                                {item.moTa}
                                            </Card.Text>
                                            <div className='d-flex align-items-center flex-wrap justify-content-between'>
                                                <Button
                                                    className={clsx(
                                                        "btn btnSecond",
                                                        styles.cardBtn
                                                    )}
                                                    onClick={async () => {
                                                        await fetchCourseDetail(item.maKhoaHoc);
                                                        history.push("/detail/" + item.biDanh);
                                                    }}>
                                                    Detail
                                                </Button>
                                                <Button
                                                    className={clsx("btn btnDark", styles.cardBtn)}>
                                                    Add to cart
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })
                    )}
                </Row>
            </Tab>
        );
    };

    //render single course
    const renderSingleCourse = () => {
        return topics?.map((topic, index) => {
            return (
                <Tab
                    eventKey={topic.maDanhMuc}
                    title={topic.tenDanhMuc}
                    key={index}
                    tabClassName={clsx("fadeInUp", styles.btnTab, {
                        [styles.active]: key === topic.maDanhMuc,
                    })}>
                    <Row className={clsx("fadeInUp", styles.tabContent)}>
                        {!coursesOfTopic ? (
                            <div
                                style={{
                                    width: "100%",
                                    textAlign: "center",
                                    paddingTop: "2rem",
                                }}>
                                <Spinner animation='border' />
                            </div>
                        ) : (
                            coursesOfTopic?.map((item, index) => {
                                return (
                                    <Col xs={12} sm={6} md={4} xl={3} className='g-4' key={index}>
                                        <Card className={styles.card}>
                                            <Card.Img
                                                variant='top'
                                                src={item.hinhAnh}
                                                className={styles.imgCard}
                                            />
                                            <Card.Body className={styles.cardBody}>
                                                <Card.Subtitle
                                                    className={clsx(
                                                        "d-flex align-items-center justify-content-between",
                                                        styles.cardSubTitle
                                                    )}>
                                                    <p>{item.ngayTao}</p>
                                                    <p>
                                                        <FontAwesomeIcon
                                                            icon={faEye}
                                                            className='me-1'
                                                        />
                                                        {item.luotXem}
                                                    </p>
                                                </Card.Subtitle>
                                                <Card.Title className={styles.cardTitle}>
                                                    {item.tenKhoaHoc}
                                                </Card.Title>
                                                <Card.Text className={styles.cardDesc}>
                                                    {item.moTa}
                                                </Card.Text>
                                                <div className='d-flex align-items-center flex-wrap justify-content-between'>
                                                    <Button
                                                        className={clsx(
                                                            "btn btnSecond",
                                                            styles.cardBtn
                                                        )}
                                                        onClick={async () => {
                                                            await fetchCourseDetail(item.maKhoaHoc);
                                                            history.push("/detail/" + item.biDanh);
                                                        }}>
                                                        Detail
                                                    </Button>
                                                    <Button
                                                        className={clsx(
                                                            "btn btnDark",
                                                            styles.cardBtn
                                                        )}>
                                                        Add to cart
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })
                        )}
                    </Row>
                </Tab>
            );
        });
    };

    useEffect(() => {
        fetchTopics();
        fetchCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className={styles.course}>
            <Container>
                <div className={styles.text}>
                    <h2 className='fadeInDown' style={{ animationDelay: "100ms" }}>
                        A broad selection of courses
                    </h2>
                    <p className='fadeInDown'>
                        Choose from 50+ courses with new additions published every month
                    </p>
                </div>
                {!topics ? (
                    <div
                        style={{
                            width: "100%",
                            textAlign: "center",
                        }}>
                        <Spinner animation='border' />
                    </div>
                ) : (
                    <Container>
                        <Tabs
                            activeKey={key}
                            onSelect={async (k) => {
                                setKey(k);
                                if (k !== "all") {
                                    fetchCoursesOfTopic(k);
                                }
                            }}
                            style={{ border: "none" }}>
                            {/* render all course */}
                            {renderAllCourse()}

                            {/* render single course */}
                            {renderSingleCourse()}
                        </Tabs>
                    </Container>
                )}
            </Container>
        </section>
    );
}

export default Course;
