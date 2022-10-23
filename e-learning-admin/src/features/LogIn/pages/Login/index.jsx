import React, { useEffect, useState } from "react";
import style from "features/LogIn/pages/Login/style.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetailAction } from "features/LogIn/action";
import userSlice from "features/LogIn/userSlice";
import { Animated } from "react-animated-css";
import logginImage from "../../../../assets/image/img-01.png";
import { useHistory } from "react-router-dom";
import Success from "common/components/Success";
import Error from "common/components/Error";
import Loading from "common/components/Loading";


function LogIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginErr = useSelector((state) => {
    return state.user.error;
  });
  const loginSuccess = useSelector((state) => {
    return state.user.success;
  });
  
  useEffect(() => {
    dispatch(userSlice.actions.clear());
  }, []);
  const schema = yup.object({
    taiKhoan: yup.string().required("*Trường này bắt buộc nhập"),
    matKhau: yup.string().required("*Trường này bắt buộc nhập"),
  });
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: async (e) => {
      const user = { ...e };
      signIn(user);
    },
    validationSchema: schema,
  });

  const signIn = (user) => {
    dispatch(fetchUserDetailAction(user));
  };

  return (
    <div className={style.background} >
    {loginSuccess && (<Success message={"Log in success!"} link={"/admin/user"}/>)}
    {loginErr && (<Error message={loginErr} display={true}/>)}
    <div className={style.container}>
      <div className={style.left}>
          <Animated animationIn="fadeInDown" animationInDelay={1000} isVisible={true}>
          <form className={style.form} onSubmit={formik.handleSubmit}>
            <Animated
              animationIn="fadeInDown"
              isVisible={true}
              animationInDelay={1500}
            >
              <div className={style.img}>
                <img src={logginImage} className={style.sample} />
              </div>
            </Animated>
            <input
              className={style.input}
              placeholder="Admin name"
              type={"text"}
              name="taiKhoan"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            {formik.touched.taiKhoan && formik.errors.taiKhoan && (
              <div className={style.error}>{formik.errors.taiKhoan}</div>
            )}
            <input
              className={style.input}
              placeholder="Password"
              type={"password"}
              name="matKhau"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            {formik.touched.matKhau && formik.errors.matKhau && (
              <div className={style.error}>{formik.errors.matKhau}</div>
            )}

           
            <button type="submit" className={style.btn}>
              Login
            </button>
          </form>
          </Animated>
      </div>
      <div className={style.right}>
        <h2 className={style.greeting}>Wellcome.</h2>
      </div>
    </div>
  </div>
  );
}

export default LogIn;
