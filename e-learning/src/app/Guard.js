import { Redirect, Route } from "react-router-dom";

const createRoute = (condition) => {
    return (props) => {
        const { path, component, redirectPath } = props;
        if (condition()) {
            return <Route path={path} component={component} />;
        }
        return <Redirect to={redirectPath} />;
    };
};

const checkAuth = () => {
    if (!localStorage.getItem("token")) {
        return true;
    }
    return false;
};

const checkLogin = () => {
    if (localStorage.getItem("token")) {
        return true;
    }
    return false;
};

export const AuthRoute = createRoute(checkAuth);
export const PrivateRoute = createRoute(checkLogin);
