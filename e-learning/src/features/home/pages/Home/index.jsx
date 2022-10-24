import ContactSection from "features/home/components/ContactSection";
import CourseSection from "features/home/components/CourseSection";
import HeroSection from "features/home/components/HeroSection";
import React from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

function Home() {
    const topics = useSelector((state) => state.home.topics);

    if (!topics) {
        return (
            <div
                style={{ width: "100%", textAlign: "center", paddingTop: "20vh", height: "100vh" }}>
                <Spinner animation='border' />
            </div>
        );
    }
    return (
        <>
            <HeroSection />
            {!topics ? (
                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        paddingTop: "20vh",
                        height: "100vh",
                    }}>
                    <Spinner animation='border' />
                </div>
            ) : (
                <CourseSection topics={topics} />
            )}
            <ContactSection />
        </>
    );
}

export default Home;
