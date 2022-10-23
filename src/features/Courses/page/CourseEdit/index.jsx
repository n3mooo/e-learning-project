import { Button, DatePicker, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Layout from "common/HOC/Layout";
import { fetchCourseDetail, updateCourse } from "features/Courses/action";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import * as yup from "yup";
import style from "features/Courses/page/CourseEdit/style.module.css";
import Success from "common/components/Success";
import Error from "common/components/Error";
function CourseEdit() {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const [img, setImg] = useState("");
  const [file, setFile] = useState();
  const courseDetail = useSelector((state) => {
    return state.courses.selectedCourse;
  });
  const err = useSelector((state) => {
    return state.courses.error;
  });
  const success = useSelector((state) => {
    return state.courses.success;
  });
  const id = match.params.id;
  const fetchCourseDetailAction = () => {
    dispatch(fetchCourseDetail(id));
  };

  const urlToObject = async (image) => {
    const response = await fetch(image);
    const name = image.slice(image.lastIndexOf("/") + 1);
    const blob = await response.blob();
    const file = new File([blob], name, { type: blob.type });
    return file;
  };
  const schema = yup.object({
    maKhoaHoc: yup.string().required("*Vui lòng nhập tên phim"),
    tenKhoaHoc: yup.string().required("*Vui lòng nhập tên khóa học"),
    moTa: yup.string().required("*Vui lòng nhập mô tả"),
    biDanh: yup.string().required("*Vui lòng nhập bí danh"),
    luotXem: yup.string().required("*Vui lòng nhập lượt xem"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maKhoaHoc: courseDetail?.maKhoaHoc,
      tenKhoaHoc: courseDetail?.tenKhoaHoc,
      moTa: courseDetail?.moTa,
      biDanh: courseDetail?.biDanh,
      ngayTao: courseDetail?.ngayTao,
      luotXem: courseDetail?.luotXem,
      maDanhMucKhoahoc: courseDetail?.danhMucKhoaHoc.maDanhMucKhoahoc,
      taiKhoanNguoiTao: courseDetail?.nguoiTao.taiKhoan,
      danhGia: 0,
      hinhAnh: courseDetail?.hinhAnh,
    },
    onSubmit: async (values) => {
      console.log(values);
      let file;
      let fileData;
      if (typeof values.hinhAnh === "string") {
        file = urlToObject(values.hinhAnh);
        await file.then(function (res) {
          fileData = res;
        });
      }
      console.log(fileData)
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            if (typeof values.hinhAnh === "string") {
              formData.append("hinhAnh", fileData);
            } else {
              formData.append("hinhAnh", values.hinhAnh, values.hinhAnh.name);
            }
          }
        }
      }
      formData.append("maNhom", "GP01");
      console.log(formData.get("hinhAnh"))
      updateCourseAction(formData);
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
  const updateCourseAction = (data) => {
    dispatch(updateCourse(data));
  };
  useEffect(() => {
    if (!courseDetail) {
      fetchCourseDetailAction();
    }
  }, [courseDetail]);

  return (
    <>
      {success && (
        <Success message={"Update success!"} link={"/admin/courses"} />
      )}
      {err && <Error message={err} display={true} />}
      <Layout>
        {courseDetail && (
          <div className={style.background}>
            <Form
              onFinish={formik.handleSubmit}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              className={style.form}
            >
              <h1>Update course</h1>
              <Form.Item label="Tên khóa học">
                <Input
                  name="tenKhoaHoc"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.tenKhoaHoc}
                />

                {formik.touched.tenKhoaHoc && formik.errors.tenKhoaHoc && (
                  <p style={{ color: "red", margin: 0 }}>
                    {formik.errors.tenKhoaHoc}
                  </p>
                )}
              </Form.Item>
              <Form.Item label="Mã khóa học">
                <Input
                  name="maKhoaHoc"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.maKhoaHoc}
                  disabled={true}
                />

                {formik.touched.maKhoaHoc && formik.errors.maKhoaHoc && (
                  <p style={{ color: "red", margin: 0 }}>
                    {formik.errors.maKhoaHoc}
                  </p>
                )}
              </Form.Item>
              <Form.Item label="Mô tả">
                <TextArea
                  name="moTa"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.moTa}
                />

                {formik.touched.moTa && formik.errors.moTa && (
                  <p style={{ color: "red", margin: 0 }}>
                    {formik.errors.moTa}
                  </p>
                )}
              </Form.Item>
              <Form.Item label="Bí danh">
                <Input
                  name="biDanh"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.biDanh}
                />

                {formik.touched.biDanh && formik.errors.biDanh && (
                  <p style={{ color: "red", margin: 0 }}>
                    {formik.errors.biDanh}
                  </p>
                )}
              </Form.Item>
              <Form.Item label="Ngày tạo">
                <Input
                  name="ngayTao"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ngayTao}
                  disabled={true}
                />

                {formik.touched.ngayTao && formik.errors.ngayTao && (
                  <p style={{ color: "red", margin: 0 }}>
                    {formik.errors.ngayTao}
                  </p>
                )}
              </Form.Item>
              <Form.Item label="Lượt xem">
                <Input
                  name="luotXem"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.luotXem}
                />

                {formik.touched.luotXem && formik.errors.luotXem && (
                  <p style={{ color: "red", margin: 0 }}>
                    {formik.errors.luotXem}
                  </p>
                )}
              </Form.Item>
              <Form.Item label="Hình ảnh">
                <input
                  type="file"
                  onChange={handleChangeFile}
                  style={{ marginBottom: 20 }}
                />

                <img
                  style={{ height: 140, objectFit: "cover" }}
                  src={img === "" ? courseDetail?.hinhAnh : img}
                  alt="..."
                />
              </Form.Item>
              <Button htmlType="submit">Cập nhật</Button>
            </Form>
          </div>
        )}
      </Layout>
    </>
  );
}

export default CourseEdit;
