import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import cartSlice from "features/cart/cartSlice";
import { fetchCourseDetailAction } from "features/home/action";
import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./style.module.css";
import emptyCourse from "assets/value-prop-inspire-v3.jpg";

function SearchResult() {
    const history = useHistory();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart.cart);
    const courses = useSelector((state) => state.home.courses);
    const keyWord = useSelector((state) => state.home.keyWord);

    const resultSearch = courses?.filter((item) =>
        item.tenKhoaHoc.toLowerCase().trim().includes(keyWord)
    );

    const fetchCourseDetail = async (id) => {
        await dispatch(fetchCourseDetailAction(id));
    };

    const addToCart = (item) => {
        dispatch(cartSlice.actions.updateCart(item));
    };

    //render all course
    const renderCourse = () => {
        return (
            <Row className={clsx("fadeInUp", styles.wrapper)}>
                {resultSearch?.length === 0 ? (
                    <div className='d-flex align-items-center justify-content-center flex-column'>
                        <img
                            height={100}
                            src={emptyCourse}
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
                            No matching results found.
                        </p>
                    </div>
                ) : (
                    resultSearch?.map((item, index) => {
                        const foundCourse = cart?.findIndex((x) => x.maKhoaHoc === item.maKhoaHoc);

                        return (
                            <Col xs={12} sm={6} lg={4} xl={3} className='g-4' key={index}>
                                <Card className={clsx(styles.card, styles.flag)}>
                                    <Card.Img
                                        variant='top'
                                        src={item.hinhAnh}
                                        className={styles.imgCard}
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src =
                                                "https://elearningnew.cybersoft.edu.vn/hinhanh/hoc-ve-lap-trinh-web-123_gp01.jpg";
                                        }}
                                    />
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
                                        <Card.Title className={styles.cardTitle}>
                                            {item.tenKhoaHoc}
                                        </Card.Title>
                                        <Card.Text className={styles.cardDesc}>
                                            {item.moTa}
                                        </Card.Text>
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
                    })
                )}
            </Row>
        );
    };

    return (
        <section className={styles.search}>
            <Container>
                <div className={styles.text}>
                    <h2 className='fadeInDown' style={{ animationDelay: "100ms" }}>
                        Search Result
                    </h2>
                    <p className='fadeInDown'>{resultSearch?.length} results found</p>
                </div>
                <Container>
                    {/* render all course */}
                    {renderCourse()}
                </Container>
            </Container>
        </section>
    );
}

export default SearchResult;
