import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./style.module.css";
import logo from "assets/3Learn-white.png";
import hand from "assets/2hand.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

function Footer() {
    return (
        <section className={styles.footer}>
            <Container>
                <Row className='g-4'>
                    <Col xs={12} sm={6} md={3}>
                        <img src={logo} alt='' className={styles.footerLogo} />
                    </Col>
                    <Col xs={12} sm={6} md={3} className={styles.text}>
                        <span className='d-inline-block'>Link</span>
                        <div className='d-flex flex-column gap-2'>
                            <Button className={styles.btn}>Course</Button>
                            <Button className={styles.btn}>Contact</Button>
                        </div>
                    </Col>

                    <Col xs={12} sm={6} md={3} className={styles.text}>
                        <span className='d-inline-block'>Link</span>
                        <div className='d-flex flex-column gap-2'>
                            <Button className={styles.btn}>
                                <FontAwesomeIcon icon={faFacebook} className={styles.iconBrand} />
                                Facebook
                            </Button>
                            <Button className={styles.btn}>
                                <FontAwesomeIcon icon={faGithub} className={styles.iconBrand} />
                                Github
                            </Button>
                            <Button className={styles.btn}>
                                <FontAwesomeIcon icon={faYoutube} className={styles.iconBrand} />
                                Youtube
                            </Button>
                            <Button className={styles.btn}>
                                <FontAwesomeIcon icon={faEnvelope} className={styles.iconBrand} />
                                Gmail
                            </Button>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={3} className='text-center'>
                        <img src={hand} alt='' />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Footer;
