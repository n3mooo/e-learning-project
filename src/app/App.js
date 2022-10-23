import Loading from "common/components/Loading";
import { lazy, Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AdminRoute, AuthRoute, UserRoute } from "./Guard";
const LogIn = lazy(() => {
  return import("features/LogIn/pages/Login");
});
const UserManagement = lazy(() => {
  return import("features/User/pages/UserManagement");
});
const AddUser = lazy(() => {
  return import("features/User/pages/AddUser");
});
const UpdateUser = lazy(() => {
  return import("features/User/pages/UpdateUser");
});
const CoursesManage = lazy(() => {
  return import("features/Courses/page/CoursesManage");
});
const CourseEdit = lazy(() => {
  return import("features/Courses/page/CourseEdit");
});
const AddCourse = lazy(() => {
  return import("features/Courses/page/AddCourse");
});
const RegisterByUser = lazy(() => {
  return import("features/Register/pages/RegisterByUser");
});
const RegisterByCourse = lazy(() => {
  return import("features/Register/pages/RegisterByCourse");
});
const Forbidden = lazy(() => {
  return import("common/components/Forbidden");
});
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <AuthRoute
            path={"/admin/login"}
            component={LogIn}
            redirectPath={"/admin/user"}
          />
          <UserRoute path={"/admin/user"} component={UserManagement} redirectPath={"/admin/login"} exact />
          <AdminRoute path={"/admin/user/adduser"} component={AddUser} redirectPath={"/admin/forbidden"}/>
          <AdminRoute path={"/admin/user/updateuser"} component={UpdateUser} redirectPath={"/admin/forbidden"} />
          <UserRoute path={"/admin/courses"} component={CoursesManage} redirectPath={"/admin/login"} exact />
          <AdminRoute path={"/admin/courses/edit/:id"} component={CourseEdit} redirectPath={"/admin/forbidden"}/>
          <AdminRoute path={"/admin/courses/addnew"} component={AddCourse} redirectPath={"/admin/forbidden"} />
          <AdminRoute path={"/admin/register/user/:id"} component={RegisterByUser} redirectPath={"/admin/forbidden"} />
          <AdminRoute
            path={"/admin/register/course/:id"}
            component={RegisterByCourse}
            redirectPath={"/admin/forbidden"}
          />
          <AdminRoute
            path={"/admin/register/course/:id"}
            component={RegisterByCourse}
            exact
          />
          <AdminRoute path={"/admin/register/user/:id"} component={RegisterByUser} />
          <Route path={"/admin/forbidden"} component={Forbidden} />
          <Redirect to="/admin/login" />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
