import { fetchProfileAction } from "features/authentication/action";
import { lazy, Suspense, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthRoute } from "./Guard";

const Header = lazy(() => import("common/components/Header"));
const Footer = lazy(() => import("common/components/Footer"));
const Home = lazy(() => import("features/home/pages/Home"));
const SignIn = lazy(() => import("features/authentication/pages/SignIn"));
const SignUp = lazy(() => import("features/authentication/pages/SignUp"));

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
