import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Button, Card, Col, Container, Nav, Row, Spinner, Tab } from "react-bootstrap";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseDetailAction, fetchCoursesOfTopicAction } from "features/home/action";
import human from "assets/human.png";
import icon1 from "assets/icon1.png";
import icon2 from "assets/icon2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useHistory } from "react-router-dom";
import homeSlice from "features/home/homeSlice";

function CourseSection(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const [key, setKey] = useState(props.topics[0]?.maDanhMuc);

    const coursesOfTopic = useSelector((state) => state.home.coursesOfTopic);
    const cart = useSelector((state) => state.home.cart);

    const fetchCoursesOfTopic = async () => {
        await dispatch(fetchCoursesOfTopicAction(key));
    };

    const fetchCourseDetail = async (id) => {
        await dispatch(fetchCourseDetailAction(id));
    };

    const addToCart = (item) => {
        dispatch(homeSlice.actions.updateCart(item));
    };

    //render topic
    const renderTopics = () => {
        return props.topics?.map((item, index) => {
            return (
                <Nav.Item className={styles.topicItem} key={index}>
                    <Nav.Link
                        eventKey={item.maDanhMuc}
                        className={clsx({
                            [styles.active]: key === item.maDanhMuc,
                        })}>
                        {item.tenDanhMuc}
                    </Nav.Link>
                </Nav.Item>
            );
        });
    };

    //render course
    const renderCourseOfTopic = () => {
        //loading
        if (!coursesOfTopic) {
            return (
                <div style={{ width: "100%", textAlign: "center" }}>
                    <Spinner animation='border' />
                </div>
            );
        }

        return coursesOfTopic?.map((item, index) => {
            const foundCourse = cart?.findIndex((x) => x.maKhoaHoc === item.maKhoaHoc);
            return (
                <Col xs={12} xl={6} className='g-4' key={index}>
                    <Card className={clsx(styles.card, styles.flag)}>
                        <Card.Img variant='top' src={item.hinhAnh} className={styles.imgCard} />
                        <Card.Body className={styles.cardBody}>
                            <Card.Subtitle
                                className={clsx(
                                    "d-flex align-items-center justify-content-between",
                                    styles.cardSubTitle
                                )}>
                                <p>{item.ngayTao}</p>
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
                            {foundCourse !== -1 ? (
                                <Button
                                    className={clsx("btn btnPrimary", styles.cardBtn)}
                                    onClick={() => history.push("/cart")}>
                                    Go to cart
                                </Button>
                            ) : (
                                <Button
                                    className={clsx("btn btnDark", styles.cardBtn)}
                                    onClick={() => addToCart(item)}>
                                    Add to cart
                                </Button>
                            )}
                        </div>
                    </Card>
                </Col>
            );
        });
    };

    useEffect(() => {
        fetchCoursesOfTopic();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    return (
        <section className={styles.courseSection}>
            <Container>
                <div className='headerSection'>
                    <span className='fadeInUp'>our course</span>
                    <h2 className='fadeInUp' style={{ animationDelay: "200ms" }}>
                        What do you wanna learn?
                    </h2>
                    <p className='fadeInUp' style={{ animationDelay: "400ms" }}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
                        tempore iste aperiam.
                    </p>
                </div>
                <div className={styles.bodySection}>
                    <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
                        <Row className='g-3'>
                            <Col xs={12} md={3}>
                                <Nav
                                    variant='pills'
                                    className={clsx("flex-xs-row flex-md-column", styles.topics)}>
                                    <span>Topics</span>
                                    {renderTopics()}
                                </Nav>
                            </Col>
                            <Col xs={12} md={6}>
                                <Tab.Content className={styles.tabContent}>
                                    <span className='m-0'>Courses</span>
                                    <Tab.Pane eventKey={key}>
                                        <Row className={styles.cardWrap}>
                                            {renderCourseOfTopic()}
                                        </Row>
                                    </Tab.Pane>
                                </Tab.Content>
                                <div className='text-center'>
                                    <Button
                                        className='btn btnPrimary mt-4 text-center'
                                        style={{ padding: "12px 20px" }}
                                        onClick={() => history.push("/course")}>
                                        View All
                                    </Button>
                                </div>
                            </Col>
                            <Col xs={12} md={3}>
                                <img src={human} alt='' className={styles.imgSection} />
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
                <img src={icon1} alt='' className={styles.icon1} />
                <img src={icon2} alt='' className={styles.icon2} />
            </Container>
        </section>
    );
}

export default CourseSection;
