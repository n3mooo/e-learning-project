import { Button, message, Popconfirm, Select, Table } from "antd";
import Layout from "common/HOC/Layout";
import {
  deleteCourse,
  fetchCourseList,
  fetchCourseTypes,
  filterCourse,
} from "features/Courses/action";
import React, { memo, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsGear } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import style from "features/Courses/page/CoursesManage/style.module.css";
import coursesSlice from "features/Courses/coursesSlice";
import Error from "common/components/Error";
import Success from "common/components/Success";
import ReadMore from "common/components/ReadMore";

function CoursesManage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const courseList = useSelector((state) => {
    return state.courses.coursesList;
  });
  const err = useSelector((state) => {
    return state.courses.error;
  });
  const success = useSelector((state) => {
    return state.courses.success;
  });
  const type = useSelector((state) => {
    return state.courses.courseTypes;
  });
  const role = useSelector((state) => {
    return state.user.profile.maLoaiNguoiDung;
  });
  const goToAddCourse = () => {
    history.push("/admin/courses/addnew");
  };
  const handleChangeType = (e) => {
    if (e === "all") {
      fetchCourseListAction();
    } else {
      filterCourseAction(e);
    }
  };
  const columns = [
    {
      title: "Mã khóa học",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
      responsive: ["xs", "sm", "md"],
    },
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
      responsive: ["md"],
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text, record) => {
        return (
          <img
            src={record.hinhAnh}
            style={{
              width: 100,
              height: 80,
              objectFit: "fill",
              borderRadius: 12,
              overflow: "hidden",
            }}
          />
        );
      },
      responsive: ["lg"],
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
      width: "40%",
      render: (_, record) => {
        return <ReadMore content={record.moTa} maxCharacter={100} />;
      },
      responsive: ["xl"],
    },
    {
      title: "Danh Mục",
      dataIndex: "danhMucKhoaHoc",
      key: "danhMucKhoaHoc",
      render: (text, record) => {
        return record.danhMucKhoaHoc.maDanhMucKhoahoc;
      },
      responsive: ["xs", "sm", "md"],
    },
    {
      title: "Hành Động",
      dataIndex: "hanhDong",
      key: "hanhDong",
      responsive: ["xs", "sm", "md"],
      render: (_, record) => {
        return (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link
              className={style.edit}
              to={"/admin/courses/edit/" + record.maKhoaHoc}
            >
              <BsGear style={{ fontSize: 24, color: "gray" }} />
            </Link>
            <Popconfirm
              style={{ marginRight: 12 }}
              okText="Yes"
              cancelText="No"
              onConfirm={() => deleteCourseAction(record.maKhoaHoc)}
              onCancel={() => {
                message.error("Do nothing!");
              }}
              title="Are you sure to delete this course?"
            >
              <MdDeleteOutline style={{ fontSize: 24, color: "red" }} />
            </Popconfirm>
            <Link
              className={style.regis}
              to={"/admin/register/course/" + record.maKhoaHoc}
            >
              <AiOutlineCalendar style={{ fontSize: 24, color: "blue" }} />
            </Link>
          </div>
        );
      },
    },
  ];
  const fetchCourseListAction = () => {
    dispatch(fetchCourseList());
  };
  const fetchCourseTypeAction = () => {
    dispatch(fetchCourseTypes());
  };
  const filterCourseAction = (id) => {
    dispatch(filterCourse(id));
  };
  const deleteCourseAction = (id) => {
    if (role === "HV") {
      message.error("You don't have permission");
      
    } else {
      dispatch(deleteCourse(id));
      setTimeout(() => {
        fetchCourseListAction();
      }, 3000);
    }
  };
  useEffect(() => {
    fetchCourseListAction();
    dispatch(coursesSlice.actions.reset());
    fetchCourseTypeAction();
  }, []);
  return (
    <>
      {success && (
        <Success message={"Delete course success!"} notChangePage={true} />
      )}
      {err && <Error message={err} display={true} />}
      <Layout>
        <div className={style.content}>
          <h1>Courses management</h1>
          <Button
            style={{ marginBottom: 16 }}
            type="primary"
            onClick={goToAddCourse}
          >
            Add new course
          </Button>
          <div className={style.filter}>
            {type && (
              <Select onChange={handleChangeType} defaultValue={"all"}>
                {type.map((item) => {
                  return (
                    <Select.Option key={item.maDanhMuc} value={item.maDanhMuc}>
                      {item.tenDanhMuc}
                    </Select.Option>
                  );
                })}
                <Select.Option key={"all"} value="all">
                  Tất cả danh mục
                </Select.Option>
              </Select>
            )}
          </div>
          <Table
            columns={columns}
            dataSource={courseList}
            className={style.myTable}
            pagination={{ position: ["bottomCenter"] }}
            style={{
              borderRadius: 12,
              overflowX: "scroll",
              textAlign: "center",
            }}
          />
        </div>
      </Layout>
    </>
  );
}

export default memo(CoursesManage);
