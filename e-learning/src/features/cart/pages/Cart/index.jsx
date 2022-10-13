import { faAngleLeft, faAngleRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import emptyCart from "assets/empty-shopping-cart-v2.jpg";
import { useHistory } from "react-router-dom";
import homeSlice from "features/home/homeSlice";
import { fetchCourseDetailAction } from "features/home/action";
import Slider from "react-slick";

function Cart() {
    const history = useHistory();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.home.cart);
    const courses = useSelector((state) => state.home.courses);

    const fetchCourseDetail = async (id) => {
        await dispatch(fetchCourseDetailAction(id));
    };

    const addToCart = (item) => {
        dispatch(homeSlice.actions.updateCart(item));
    };

    const removeFromCart = (item) => {
        dispatch(homeSlice.actions.updateCart(item));
    };

    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <button
            {...props}
            className={clsx("slick-prev slick-arrow", {
                "slick-disabled": currentSlide === 0,
            })}
            aria-hidden='true'
            aria-disabled={currentSlide === 0 ? true : false}
            type='button'>
            <FontAwesomeIcon icon={faAngleLeft} />
        </button>
    );

    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <button
            {...props}
            className={clsx("slick-next slick-arrow", {
                "slick-disabled": { ...props }.onClick === null,
            })}
            aria-hidden='true'
            aria-disabled={{ ...props }.onClick === null ? true : false}
            type='button'>
            <FontAwesomeIcon icon={faAngleRight} />
        </button>
    );

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <SlickArrowRight />,
        prevArrow: <SlickArrowLeft />,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 488,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const renderCart = () => {
        return (
            <>
                <Col xs={12} lg={9}>
                    <div className={styles.content}>
                        <p className='m-0'>{cart.length} Course in Cart</p>
                        <Container>
                            {cart.map((item, index) => {
                                return (
                                    <Row className={styles.item} key={index}>
                                        <Col xs={4} sm={3} md={3}>
                                            <img
                                                src={item.hinhAnh}
                                                alt=''
                                                onClick={async () => {
                                                    await fetchCourseDetail(item.maKhoaHoc);
                                                    history.push("/detail/" + item.biDanh);
                                                }}
                                            />
                                        </Col>
                                        <Col xs={8} sm={6} md={7}>
                                            <div
                                                className={clsx(
                                                    "d-flex flex-column gap-2",
                                                    styles.text
                                                )}
                                                onClick={async () => {
                                                    await fetchCourseDetail(item.maKhoaHoc);
                                                    history.push("/detail/" + item.biDanh);
                                                }}>
                                                <h3>{item.tenKhoaHoc}</h3>
                                                <span
                                                    style={{
                                                        textTransform: "capitalize",
                                                        fontWeight: 400,
                                                    }}>
                                                    By {item.nguoiTao.hoTen}
                                                </span>
                                                <div
                                                    className='d-flex align-items-center gap-4 fadeInUP'
                                                    style={{
                                                        animationDelay: "200ms",
                                                    }}>
                                                    <div
                                                        className={clsx(
                                                            "d-flex align-items-center",
                                                            styles.rate
                                                        )}>
                                                        <span className='me-1'>5.0</span>
                                                        <FontAwesomeIcon
                                                            icon={faStar}
                                                            className={styles.iconStar}
                                                        />
                                                        <FontAwesomeIcon
                                                            icon={faStar}
                                                            className={styles.iconStar}
                                                        />
                                                        <FontAwesomeIcon
                                                            icon={faStar}
                                                            className={styles.iconStar}
                                                        />
                                                        <FontAwesomeIcon
                                                            icon={faStar}
                                                            className={styles.iconStar}
                                                        />
                                                        <FontAwesomeIcon
                                                            icon={faStar}
                                                            className={styles.iconStar}
                                                        />
                                                    </div>
                                                    <div>
                                                        <FontAwesomeIcon
                                                            icon={faEye}
                                                            className='me-1'
                                                            style={{ fontSize: ".875rem" }}
                                                        />
                                                        <span
                                                            style={{
                                                                fontWeight: 400,
                                                                fontSize: ".875rem",
                                                            }}>
                                                            {item.luotXem}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={3} md={2}>
                                            <div
                                                className={clsx(
                                                    "d-flex flex-column justify-content-between h-100 gap-sm-0 gap-2"
                                                )}>
                                                <span
                                                    className='mt-3 mt-sm-0'
                                                    style={{
                                                        color: "#12b823",
                                                        fontSize: "1.2rem",
                                                        fontWeight: 700,
                                                        textAlign: "end",
                                                    }}>
                                                    Free
                                                </span>
                                                <Button
                                                    className={clsx(
                                                        "btn btnSecond",
                                                        styles.btnRemove
                                                    )}
                                                    onClick={() => removeFromCart(item)}>
                                                    Remove
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                );
                            })}
                        </Container>
                    </div>
                </Col>
                <Col xs={12} lg={3}>
                    <div className={styles.sideContent}>
                        <p>Total:</p>
                        <h2>$0</h2>
                        <Button className='btn btnPrimary w-100'>Check out</Button>
                    </div>
                </Col>
                <div className='mt-5 p-0 w-100'>
                    <p style={{ margin: "0 0 0 12px" }}>You might also like</p>
                    <Slider {...settings} className={styles.slider}>
                        {courses?.slice(0, 8).map((item, index) => {
                            const foundCourse = cart?.findIndex(
                                (x) => x.maKhoaHoc === item.maKhoaHoc
                            );

                            return (
                                <div key={index}>
                                    <Card
                                        className={clsx("d-block my-4", styles.card, styles.flag)}>
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
                                                    className={clsx(
                                                        "btn btnOutline",
                                                        styles.cardBtn
                                                    )}
                                                    onClick={() => removeFromCart(item)}>
                                                    Remove
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
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </>
        );
    };

    return (
        <section className={styles.cart}>
            <Container>
                <h3 className={clsx("py-4", styles.title)}>Shopping cart</h3>
                <Row>
                    {cart.length !== 0 ? (
                        renderCart()
                    ) : (
                        <Col>
                            <div className={styles.content}>
                                <p>0 Course in Cart</p>
                                <Container>
                                    <Row className={styles.item}>
                                        <Col xs={12}>
                                            <div className='d-flex flex-column align-items-center justify-content-center'>
                                                <img
                                                    src={emptyCart}
                                                    alt=''
                                                    style={{
                                                        maxWidth: 240,
                                                        height: "100%",
                                                        maxHeight: "unset",
                                                    }}
                                                />
                                                <p
                                                    style={{
                                                        fontWeight: 400,
                                                        fontSize: ".9rem",
                                                    }}>
                                                    Your cart is empty. Keep shopping to find a
                                                    course!
                                                </p>
                                                <Button
                                                    className='btn btnPrimary mb-4 gap-sm-0 gap-2'
                                                    onClick={() => history.push("/course")}>
                                                    Keep shopping
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>
        </section>
    );
}

export default Cart;
