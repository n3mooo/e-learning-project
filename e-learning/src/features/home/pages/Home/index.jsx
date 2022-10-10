import { fetchCoursesAction, fetchTopicsAction } from "features/home/action";
import ContactSection from "features/home/components/ContactSection";
import CourseSection from "features/home/components/CourseSection";
import HeroSection from "features/home/components/HeroSection";
import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function Home() {
    const dispatch = useDispatch();

    const topics = useSelector((state) => state.home.topics);

    const fetchTopics = async () => {
        await dispatch(fetchTopicsAction());
    };

    const fetchCourses = async () => {
        await dispatch(fetchCoursesAction());
    };

    useEffect(() => {
        fetchTopics();
        fetchCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
