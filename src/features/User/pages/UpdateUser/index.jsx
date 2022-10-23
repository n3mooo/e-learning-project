import React, { useEffect, useState } from "react";
import style from "features/User/pages/UpdateUser/style.module.css";
import Layout from "common/HOC/Layout";
import { Button, Form, Input, Select } from "antd";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetail, updateUser } from "features/User/action";
import Success from "common/components/Success";
import userManageSlice from "features/User/userManageSlice";
import Error from "common/components/Error";
function UpdateUser() {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => {
    return state.userManager.selectedUser;
  });
  const userType = useSelector((state) => {
    return state.userManager.userType;
  });
  const success = useSelector((state)=>{
    return state.userManager.success;
  })
  const err = useSelector((state)=>{
    return state.userManager.error;
  })
  const handleChangeType = (e) => {
    formik.setFieldValue("maLoaiNguoiDung",e)
  };
  useEffect(() => {
    dispatch(userManageSlice.actions.reset())
  }, []);
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
      taiKhoan: userDetail?.taiKhoan,
      matKhau: userDetail?.matKhau,
      hoTen: userDetail?.hoTen,
      soDt: userDetail?.soDt,
      email: userDetail?.email,
      maLoaiNguoiDung: userDetail?.maLoaiNguoiDung,
    },
    onSubmit: (values) => {
        const data = { ...values, maNhom: "GP01" };
       updateUserAction(data);
    },
    validationSchema: schema,
  });
  const updateUserAction = (data) => {
    dispatch(updateUser(data))
  }
  return (
    <Layout>
      {success && (<Success message={"Update user success!"} link={"/admin/user"}/>)}
      {err && (<Error message={err} display={true}/>)}
      <div className={style.background}>
        {userDetail && (
          <Form
            className={style.form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={formik.handleSubmit}
            initialValues={{ maLoaiNguoiDung: formik.values.maLoaiNguoiDung }}
          >
            <h1>Update user</h1>
            <Form.Item label={"Tài khoản"}>
              <Input
                name={"taiKhoan"}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.taiKhoan}
                disabled={true}
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
                value={formik.values.matKhau}
              />
              {formik.touched.matKhau && formik.errors.matKhau && (
                <div className={style.error}>{formik.errors.matKhau}</div>
              )}
            </Form.Item>
            <Form.Item label={"Họ tên"} onChange={formik.handleChange}>
              <Input
                onBlur={formik.handleBlur}
                name="hoTen"
                value={formik.values.hoTen}
              />
              {formik.touched.hoTen && formik.errors.hoTen && (
                <div className={style.error}>{formik.errors.hoTen}</div>
              )}
            </Form.Item>
            <Form.Item label={"Số điện thoại"} onChange={formik.handleChange}>
              <Input
                onBlur={formik.handleBlur}
                name="soDt"
                value={formik.values.soDt}
              />
              {formik.touched.soDt && formik.errors.soDt && (
                <div className={style.error}>{formik.errors.soDt}</div>
              )}
            </Form.Item>
            <Form.Item label={"Email"} onChange={formik.handleChange}>
              <Input
                onBlur={formik.handleBlur}
                name="email"
                value={formik.values.email}
                
              />
              {formik.touched.email && formik.errors.email && (
                <div className={style.error}>{formik.errors.email}</div>
              )}
            </Form.Item>
            <Form.Item name={"maLoaiNguoiDung"} label={"Loại người dùng"}>
              <Select
                onChange={handleChangeType}
                value={formik.values.maLoaiNguoiDung}
              >
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
              Update
            </Button>
          </Form>
        )}
      </div>
    </Layout>
  );
}

export default UpdateUser;
