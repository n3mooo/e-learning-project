import clsx from "clsx";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./style.module.css";
import human2 from "assets/human2.png";

function ContactSection() {
    return (
        <>
            <div className={styles.imgSection}>
                <img src={human2} alt='' />
            </div>
            <section className={styles.contactSection}>
                <Container>
                    <Row>
                        <Col xs={12} md={6}>
                            <iframe
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.495242132038!2d106.66646965014998!3d10.773330192285961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752edc3f3043a7%3A0xb490b64157cb9dc1!2sCybersoft!5e0!3m2!1svi!2s!4v1665063122630!5m2!1svi!2s'
                                width='100%'
                                height='450'
                                style={{ border: 0, borderRadius: "1rem", marginBottom: 24 }}
                                allowFullScreen=''
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'></iframe>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form
                                className={clsx(
                                    styles.form,
                                    "d-flex flex-column align-items-center align-self-center position-relative w-100"
                                )}>
                                <h2 className='w-100 m-0 fadeInDown'>Leave your message</h2>
                                <div className='d-block w-100'>
                                    <Form.Group
                                        className='d-block fadeInDown'
                                        style={{ marginTop: 16, animationDelay: "400ms" }}>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            name='email'
                                            type='text'
                                            placeholder='your_email@gmail.com'
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className='d-block fadeInDown'
                                        style={{ marginTop: 16, animationDelay: "400ms" }}>
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control
                                            as='textarea'
                                            name='message'
                                            style={{ height: "185px" }}
                                        />
                                    </Form.Group>
                                    <Button
                                        className={clsx(
                                            "btn btnPrimary btnBlue fadeInUp",
                                            styles.btnFormControl
                                        )}
                                        style={{ animationDelay: "600ms" }}
                                        type='submit'>
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default ContactSection;
