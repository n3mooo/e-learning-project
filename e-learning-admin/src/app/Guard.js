
import { Redirect, Route } from "react-router-dom";


const createRoute = (condition)=> {
    return (props) => {
        const {path, component, redirectPath} = props;
        if(condition()) {
            return <Route path={path} component={component}/>
        }
        return <Redirect to={redirectPath}/>
    }
}
const checkLogin = () => {
    if(!localStorage.getItem("token")) {
        return true;
    } 
    return false
}
const checkLogined = () => {
    if(!!localStorage.getItem("token")) {
        return true;
    } 
    return false
}
const checkPermission = () => {
    const role = localStorage.getItem("role");
    if(role == "GV" && checkLogined()) {
        return true;
    } 
    return false;
}
export const AuthRoute = createRoute(checkLogin);
export const UserRoute= createRoute(checkLogined);
export const AdminRoute= createRoute(checkPermission);