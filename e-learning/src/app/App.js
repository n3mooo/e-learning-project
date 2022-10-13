import { fetchProfileAction } from "features/authentication/action";
import { lazy, Suspense, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthRoute } from "./Guard";

const Header = lazy(() => import("common/components/Header"));
const Footer = lazy(() => import("common/components/Footer"));
const SignIn = lazy(() => import("features/authentication/pages/SignIn"));
const SignUp = lazy(() => import("features/authentication/pages/SignUp"));
const Home = lazy(() => import("features/home/pages/Home"));
const Course = lazy(() => import("features/home/components/Courses"));
const Detail = lazy(() => import("features/home/components/CourseDetail"));
const Cart = lazy(() => import("features/cart/pages/Cart"));
const User = lazy(() => import("features/user/pages/User"));

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfileAction());
    });

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
                <Switch>
                    <Route path='/' component={Home} exact></Route>
                    <Route path='/course' component={Course} redirectPath='/'></Route>
                    <Route path='/detail/:alias' component={Detail} redirectPath='/'></Route>
                    <Route path='/cart' component={Cart} redirectPath='/'></Route>
                    <Route path='/user' component={User} redirectPath='/'></Route>
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
