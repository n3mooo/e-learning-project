import clsx from "clsx";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "./style.module.css";
import emptyCart from "assets/empty-shopping-cart-v2.jpg";
import { useHistory } from "react-router-dom";

function User() {
    const history = useHistory();
    // const user = useSelector((state) => state.auth.profile);
    return (
        <section className={styles.user}>
            <Container>
                <h3 className={clsx("py-4", styles.title)}>My Information</h3>
                <Row style={{ minHeight: "32.5vh" }}>
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
                                                Your cart is empty. Keep shopping to find a course!
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
                </Row>
            </Container>
        </section>
    );
}

export default User;
