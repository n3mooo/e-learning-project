import { Button, Form, Input, Select } from "antd";
import Layout from "common/HOC/Layout";
import React, { useEffect, useState } from "react";
import style from "features/User/pages/AddUser/style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser, fetchUserType } from "features/User/action";
import { useFormik } from "formik";
import * as yup from "yup";
import Error from "common/components/Error";
import Success from "common/components/Success";
import userManageSlice from "features/User/userManageSlice";
function AddUser() {
  const dispatch = useDispatch();
  const userType = useSelector((state) => {
    return state.userManager.userType;
  });
  const err = useSelector((state) => {
    return state.userManager.error;
  });
  const success = useSelector((state) => {
    return state.userManager.success;
  });
  const fetchUserTypeAction = () => {
    dispatch(fetchUserType());
  };
  const schema = yup.object().shape({
    taiKhoan: yup.string().required("Vui lòng nhập tài khoản"),
    matKhau: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(8, "Mật khẩu từ 8-16 kí tự")
      .max(16, "Mật khẩu từ 8-16 kí tự"),
    hoTen: yup
      .string()
      .required("Vui lòng nhập họ tên")
      .matches(/^[A-Za-z ]+$/, "Không đúng định dạng"),
    soDt: yup
      .string()
      .required("Vui lòng nhập số điện thoại")
      .matches(/(0)+([0-9]{9})\b/g, "Không đúng định dạng"),
    email: yup
      .string()
      .required("Vui lòng nhập email")
      .email("Không đúng định dạng"),
  });
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDt: "",
      email: "",
      maLoaiNguoiDung: "HV",
    },
    onSubmit: (values) => {
      const data = { ...values, maNhom: "GP01" };
      addUserAction(data);
      console.log(values);
    },
    validationSchema: schema,
  });
  const handleChangeType = (e) => {
    formik.setFieldValue("maLoaiNguoiDung", e);
  };
  const addUserAction = (data) => {
    dispatch(addUser(data));
  };
  useEffect(() => {
    fetchUserTypeAction();
    dispatch(userManageSlice.actions.reset());
  }, []);
  return (
    <>
      {success && (
        <Success message={"Add user success!"} link={"/admin/user"} />
      )}
      {err && <Error message={err} display={true} />}
      <Layout>
        <div className={style.background}>
          {userType && (
            <Form
              className={style.form}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              onFinish={formik.handleSubmit}
              initialValues={{ maLoaiNguoiDung: "HV" }}
            >
              <h1>Add User</h1>
              <div className={style.main}>
                <Form.Item label={"Tài khoản"}>
                  <Input
                    name={"taiKhoan"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.taiKhoan && formik.errors.taiKhoan && (
                    <div className={style.error}>{formik.errors.taiKhoan}</div>
                  )}
                </Form.Item>
                <Form.Item label={"Mật Khẩu"} onChange={formik.handleChange}>
                  <Input
                    type="password"
                    onBlur={formik.handleBlur}
                    name="matKhau"
                  />
                  {formik.touched.matKhau && formik.errors.matKhau && (
                    <div className={style.error}>{formik.errors.matKhau}</div>
                  )}
                </Form.Item>
                <Form.Item label={"Họ tên"} onChange={formik.handleChange}>
                  <Input onBlur={formik.handleBlur} name="hoTen" />
                  {formik.touched.hoTen && formik.errors.hoTen && (
                    <div className={style.error}>{formik.errors.hoTen}</div>
                  )}
                </Form.Item>
                <Form.Item
                  label={"Số điện thoại"}
                  onChange={formik.handleChange}
                >
                  <Input onBlur={formik.handleBlur} name="soDt" />
                  {formik.touched.soDt && formik.errors.soDt && (
                    <div className={style.error}>{formik.errors.soDt}</div>
                  )}
                </Form.Item>
                <Form.Item label={"Email"} onChange={formik.handleChange}>
                  <Input onBlur={formik.handleBlur} name="email" />
                  {formik.touched.email && formik.errors.email && (
                    <div className={style.error}>{formik.errors.email}</div>
                  )}
                </Form.Item>
                <Form.Item name={"maLoaiNguoiDung"} label={"Loại người dùng"}>
                  <Select onChange={handleChangeType}>
                    {userType.map((item) => {
                      return (
                        <Select.Option
                          key={item.maLoaiNguoiDung}
                          value={item.maLoaiNguoiDung}
                        >
                          {item.tenLoaiNguoiDung}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Button htmlType="submit" className={style.btn}>
                  Add
                </Button>
              </div>
            </Form>
          )}
        </div>
      </Layout>
    </>
  );
}

export default AddUser;
