import clsx from "clsx";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import character from "assets/character.png";
import note from "assets/note.png";
import calendar from "assets/calendar.png";
import write from "assets/write.png";
import { useHistory } from "react-router-dom";

function HeroSection() {
    const history = useHistory();
    return (
        <section className={styles.heroSection}>
            <Container>
                <Row className={styles.wrapper}>
                    <Col xs={12} lg={6}>
                        <div className={styles.heroText}>
                            <h1 className='fadeInLeft'>Grow your skills, Define Your Future</h1>
                            <p className='fadeInLeft' style={{ animationDelay: "200ms" }}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
                                voluptatem, deserunt maiores cum adipisci asperiores delectus
                                dignissimos aperiam perferendis perspiciatis.
                            </p>
                            <Button
                                className={clsx("btn btnPrimary fadeInLeft")}
                                style={{ animationDelay: "500ms" }}
                                onClick={() => history.push("/course")}>
                                Explore our courses
                            </Button>
                        </div>
                    </Col>
                    <Col xs={12} lg={6}>
                        <div
                            className={clsx("fadeInUp", styles.heroImg)}
                            style={{ animationDelay: "200ms" }}>
                            <img src={character} alt='' />
                            <img src={note} alt='' className={styles.iconNote} />
                            <img src={calendar} alt='' className={styles.iconCalendar} />
                            <img src={write} alt='' className={styles.iconWrite} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default HeroSection;
