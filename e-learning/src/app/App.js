import { Alert } from "common/components/Alert";
import { fetchProfileAction } from "features/authentication/action";
import { fetchCoursesAction, fetchTopicsAction } from "features/home/action";
import { lazy, Suspense, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthRoute, PrivateRoute } from "./Guard";

const Header = lazy(() => import("common/components/Header"));
const Footer = lazy(() => import("common/components/Footer"));
const SignIn = lazy(() => import("features/authentication/pages/SignIn"));
const SignUp = lazy(() => import("features/authentication/pages/SignUp"));
const Home = lazy(() => import("features/home/pages/Home"));
const Courses = lazy(() => import("features/home/components/Courses"));
const Detail = lazy(() => import("features/home/components/CourseDetail"));
const Cart = lazy(() => import("features/cart/pages/Cart"));
const Profile = lazy(() => import("features/profile/pages/Profile"));
const SearchResult = lazy(() => import("features/home/components/SearchResult"));

function App() {
    const dispatch = useDispatch();

    const fetchTopics = async () => {
        await dispatch(fetchTopicsAction());
    };

    const fetchCourses = async () => {
        await dispatch(fetchCoursesAction());
    };

    useEffect(() => {
        localStorage.getItem("token") && dispatch(fetchProfileAction());
        fetchTopics();
        fetchCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <BrowserRouter>
            <Suspense
                fallback={
                    <div
                        style={{
                            width: "100%",
                            textAlign: "center",
                            paddingTop: "20vh",
                            height: "100vh",
                        }}>
                        <Spinner animation='border' />
                    </div>
                }>
                <Header />
                <Alert />
                <Switch>
                    <Route path='/' component={Home} exact></Route>
                    <PrivateRoute
                        path='/courses'
                        component={Courses}
                        redirectPath='/signin'></PrivateRoute>
                    <Route path='/detail/:alias' component={Detail} redirectPath='/'></Route>
                    <Route path='/search/:alias' component={SearchResult} redirectPath='/'></Route>
                    <Route path='/cart' component={Cart} redirectPath='/'></Route>
                    <Route path='/profile' component={Profile} redirectPath='/'></Route>
                    <AuthRoute path='/signin' component={SignIn} redirectPath='/' />
                    <AuthRoute path='/signup' component={SignUp} redirectPath='/' />

                    {/* <Route path='*' component={P404}></Route> */}

                    <Redirect to='/' />
                </Switch>
                <Footer />
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
