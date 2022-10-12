import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import emptyCart from "assets/empty-shopping-cart-v2.jpg";
import { useHistory } from "react-router-dom";
import homeSlice from "features/home/homeSlice";
import { fetchCourseDetailAction } from "features/home/action";

function Cart() {
    const history = useHistory();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.home.cart);

    const removeFromCart = (item) => {
        dispatch(homeSlice.actions.updateCart(item));
    };

    const fetchCourseDetail = async (id) => {
        await dispatch(fetchCourseDetailAction(id));
    };

    const renderCart = () => {
        return (
            <>
                <Col xs={12} lg={9}>
                    <div className={styles.content}>
                        <p>{cart.length} Course in Cart</p>
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
            </>
        );
    };

    return (
        <section className={styles.cart}>
            <Container>
                <h3 className={clsx("py-4", styles.title)}>Shopping cart</h3>
                <Row style={{ minHeight: "32.5vh" }}>
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
