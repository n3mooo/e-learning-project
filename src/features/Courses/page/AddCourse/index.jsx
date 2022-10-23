import { Button, Form, Input, Select } from "antd";
import Layout from "common/HOC/Layout";
import React, { useEffect, useState } from "react";
import style from "features/Courses/page/AddCourse/style.module.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourse,
  fetchCourseTypes,
  fetchCreatorAccount,
} from "features/Courses/action";
import Success from "common/components/Success";
import Error from "common/components/Error";
import coursesSlice from "features/Courses/coursesSlice";
function AddCourse() {
  const [img, setImg] = useState("");
  const dispatch = useDispatch();
  const err = useSelector((state) => {
    return state.courses.error;
  });
  const success = useSelector((state) => {
    return state.courses.success;
  });
  const types = useSelector((state) => {
    return state.courses.courseTypes;
  });
  const creatorAccount = useSelector((state) => {
    return state.courses.creatorAccount;
  });
  useEffect(() => {
    fetchCourseTypesAction();
    fetchCreatorAccountAction();
    dispatch(coursesSlice.actions.reset());
  }, []);
  const schema = yup.object().shape({
    maKhoaHoc: yup.string().required("Vui lòng nhập mã khóa học"),
    tenKhoaHoc: yup.string().required("Vui lòng nhập tên khóa học"),
    moTa: yup.string().required("Vui lòng nhập mô tả"),
    biDanh: yup.string().required("Vui lòng nhập bí danh"),
    hinhAnh: yup.string().required("Vui lòng chọn hình ảnh"),
  });
  const formik = useFormik({
    initialValues: {
      maKhoaHoc: "",
      tenKhoaHoc: "",
      moTa: "",
      biDanh: "",
      luotXem: 0,
      danhGia: 0,
      hinhAnh: null,
      maNhom: "GP01",
      ngayTao: new Date().toLocaleDateString(),
      maDanhMucKhoaHoc: "FrontEnd",
      taiKhoanNguoiTao: creatorAccount?.taiKhoan,
    },
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("hinhAnh", values.hinhAnh);
          }
        }
      }
      for (let [key, value] of formData) {
        console.log(`${key}: ${value}`);
      }
      console.log(formData.get("hinhAnh"));
      addCourseAction(formData);
    },
    validationSchema: schema,
  });
  const handleChangeFile = async (e) => {
    let file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      await formik.setFieldValue("hinhAnh", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImg(e.target.result);
      };
    }
  };
  const handleChangeGroup = (values) => {
    formik.setFieldValue("maNhom", values);
  };
  const handleChangeType = (values) => {
    formik.setFieldValue("maDanhMucKhoaHoc", values);
  };
  const fetchCourseTypesAction = () => {
    dispatch(fetchCourseTypes());
  };
  const fetchCreatorAccountAction = () => {
    dispatch(fetchCreatorAccount());
  };
  const addCourseAction = (data) => {
    dispatch(addCourse(data));
  };
  return (
    <>
      {success && (
        <Success message={"Add new course success!"} link={"/admin/courses"} />
      )}
      {err && <Error message={err} display={true} />}
      <Layout>
        {types && (
          <div className={style.background}>
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              className={style.form}
              onFinish={formik.handleSubmit}
              initialValues={{ maNhom: "GP01", maDanhMucKhoaHoc: "FrontEnd" }}
            >
              <h1>Add new course</h1>
              <div className={style.main}>
                <Form.Item label={"Mã khóa học"}>
                  <Input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="maKhoaHoc"
                    spellCheck={false}
                  ></Input>
                  {formik.touched.maKhoaHoc && formik.errors.maKhoaHoc && (
                    <div className={style.error}>{formik.errors.maKhoaHoc}</div>
                  )}
                </Form.Item>
                <Form.Item label={"Tên khóa học"}>
                  <Input
                    name="tenKhoaHoc"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    spellCheck={false}
                  ></Input>
                  {formik.touched.tenKhoaHoc && formik.errors.tenKhoaHoc && (
                    <div className={style.error}>
                      {formik.errors.tenKhoaHoc}
                    </div>
                  )}
                </Form.Item>
                <Form.Item label={"Bí danh"}>
                  <Input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="biDanh"
                    spellCheck={false}
                  ></Input>
                  {formik.touched.biDanh && formik.errors.biDanh && (
                    <div className={style.error}>{formik.errors.biDanh}</div>
                  )}
                </Form.Item>
                <Form.Item label={"Mô tả"}>
                  <Input
                    name="moTa"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    spellCheck={false}
                  ></Input>
                  {formik.touched.moTa && formik.errors.moTa && (
                    <div className={style.error}>{formik.errors.moTa}</div>
                  )}
                </Form.Item>
                <Form.Item label={"Lượt xem"}>
                  <Input
                    style={{ color: "#fff" }}
                    name="luotXem"
                    disabled={true}
                    value={formik.values.luotXem}
                  ></Input>
                </Form.Item>
                <Form.Item label={"Đánh giá"}>
                  <Input
                    style={{ color: "#fff" }}
                    name="danhGia"
                    disabled={true}
                    value={formik.values.danhGia}
                  ></Input>
                </Form.Item>
                <Form.Item label={"Hình ảnh"}>
                  <Input
                    type="file"
                    name="hinhAnh"
                    onChange={handleChangeFile}
                    style={{ color: "#fff" }}
                  ></Input>
                  <img
                    style={{ marginTop: 12, height: 140, objectFit: "cover" }}
                    src={img ? img : ""}
                    alt="..."
                  />
                  {formik.touched.hinhAnh && formik.errors.hinhAnh && (
                    <div className={style.error}>{formik.errors.hinhAnh}</div>
                  )}
                </Form.Item>
                <Form.Item name={"maNhom"} label={"Mã nhóm"}>
                  <Select onChange={handleChangeGroup} value={"GP01"}>
                    <Select.Option key={1} value={"GP01"}>
                      GP01
                    </Select.Option>
                    <Select.Option key={2} value={"GP02"}>
                      GP02
                    </Select.Option>
                    <Select.Option key={3} value={"GP03"}>
                      GP03
                    </Select.Option>
                    <Select.Option key={4} value={"GP04"}>
                      GP04
                    </Select.Option>
                    <Select.Option key={5} value={"GP05"}>
                      GP05
                    </Select.Option>
                    <Select.Option key={6} value={"GP06"}>
                      GP06
                    </Select.Option>
                    <Select.Option key={7} value={"GP07"}>
                      GP07
                    </Select.Option>
                    <Select.Option key={8} value={"GP08"}>
                      GP08
                    </Select.Option>
                    <Select.Option key={9} value={"GP09"}>
                      GP09
                    </Select.Option>
                    <Select.Option key={10} value={"GP10"}>
                      GP10
                    </Select.Option>
                    <Select.Option key={11} value={"GP11"}>
                      GP11
                    </Select.Option>
                    <Select.Option key={12} value={"GP12"}>
                      GP12
                    </Select.Option>
                    <Select.Option key={13} value={"GP13"}>
                      GP13
                    </Select.Option>
                    <Select.Option key={14} value={"GP14"}>
                      GP14
                    </Select.Option>
                    <Select.Option key={15} value={"GP15"}>
                      GP15
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label={"Ngày tạo"}>
                  <Input
                    name="ngayTao"
                    value={formik.values.ngayTao}
                    disabled={true}
                  ></Input>
                </Form.Item>
                <Form.Item
                  label={"Mã danh mục"}
                  name="maDanhMucKhoaHoc"
                >
                  <Select onChange={handleChangeType}>
                    {types.map((item) => {
                      return (
                        <Select.Option
                          key={item.maDanhMuc}
                          value={item.maDanhMuc}
                        >
                          {item.tenDanhMuc}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label={"Tài khoản người tạo"}>
                  <Input
                    style={{ color: "#fff" }}
                    name="taiKhoanNguoiTao"
                    value={formik.values.taiKhoanNguoiTao}
                    disabled={true}
                  ></Input>
                </Form.Item>
                <Button htmlType="submit">Add</Button>
              </div>
            </Form>
          </div>
        )}
      </Layout>
    </>
  );
}

export default AddCourse;
