import { Button, message, Popconfirm, Table } from "antd";
import Layout from "common/HOC/Layout";
import React, { memo, useEffect } from "react";
import style from "features/Register/pages/RegisterByUser/style.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConfirmCourseList,
  fetchRegisterCourseList,
  fetchUnregisterCourseList,
  userCancelRegister,
  userConfirmRegister,
  userRegister,
} from "features/Register/action";
import { useRouteMatch } from "react-router-dom";
import Success from "common/components/Success";
import Error from "common/components/Error";
import registerSlice from "features/Register/registerSlice";
function RegisterByUser() {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const account = match.params.id;
  const fetchUnregisterCourseListAction = (id) => {
    dispatch(fetchUnregisterCourseList(id));
  };
  const fetchRegisterCourseListAction = (id) => {
    dispatch(fetchRegisterCourseList(id));
  };
  const fetchConfirmCourseListAction = (id) => {
    dispatch(fetchConfirmCourseList(id));
  };
  const userRegisterAction = (data) => {
    dispatch(userRegister(data));
  };
  const userCancelRegisterAction = (data) => {
    dispatch(userCancelRegister(data));
  };
  const userConfirmRegisterAction = (data) => {
    dispatch(userConfirmRegister(data));
  };
  const unRegistered = useSelector((state) => {
    return state.register.u_unRegistered;
  });
  const registered = useSelector((state) => {
    return state.register.u_registered;
  });
  const confirm = useSelector((state) => {
    return state.register.u_confirm;
  });
  const err = useSelector((state) => {
    return state.register.error;
  });
  const success = useSelector((state) => {
    return state.register.success;
  });
  useEffect(() => {
    fetchUnregisterCourseListAction(account);
    fetchRegisterCourseListAction(account);
    fetchConfirmCourseListAction(account);
    dispatch(registerSlice.actions.reset());
  }, []);
  const handleRegister = (e) => {
    const data = {
      maKhoaHoc: e,
      taiKhoan: account,
    };
    userRegisterAction(data);
    setTimeout(() => {
      fetchConfirmCourseListAction(account);
      fetchUnregisterCourseListAction(account);
    }, 2000);
  };
  const handleCancelRegister = (e) => {
    const data = {
      maKhoaHoc: e,
      taiKhoan: account,
    };
    userCancelRegisterAction(data);
    setTimeout(() => {
      fetchRegisterCourseListAction(account);
      fetchConfirmCourseListAction(account);
    }, 2000);
  };
  const handleConfirmRegister = (e) => {
    const data = {
      maKhoaHoc: e,
      taiKhoan: account,
    };
    userConfirmRegisterAction(data);
    setTimeout(() => {
      fetchConfirmCourseListAction(account);
      fetchRegisterCourseListAction(account);
    }, 2000);
  };
  const columns = [
    {
      title: "Mã khóa học",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
    },
    {
      title: "Bí danh",
      dataIndex: "biDanh",
      key: "biDanh",
      responsive:["md"]
    },
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      title: "Action",
      dataIndex: "hanhDong",
      key: "hanhDong",
      render: (_, record) => {
        return (
          <Popconfirm
            title={"Are you sure to register this course ?"}
            onConfirm={() => {
              handleRegister(record.maKhoaHoc);
            }}
            onCancel={() => {
              message.error("Do nothing!");
            }}
          >
            <Button>Register</Button>
          </Popconfirm>
        );
      },
    },
  ];
  const columns2 = [
    {
      title: "Mã khóa học",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
    },

    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      title: "Action",
      dataIndex: "hanhDong",
      key: "hanhDong",
      render: (_, record) => {
        return (
          <Popconfirm
            title={"Are you sure to register this course ?"}
            onConfirm={() => {
              handleCancelRegister(record.maKhoaHoc);
            }}
            onCancel={() => {
              message.error("Do nothing!");
            }}
          >
            <Button>Cancel</Button>
          </Popconfirm>
        );
      },
    },
  ];
  const columns3 = [
    {
      title: "Mã khóa học",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
    },

    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      title: "Action",
      dataIndex: "hanhDong",
      key: "hanhDong",
      render: (_, record) => {
        return (
          <>
            <Popconfirm
            title={"Are you sure to register this course ?"}
            onConfirm={() => {
              handleConfirmRegister(record.maKhoaHoc);
            }}
            onCancel={() => {
              message.error("Do nothing!");
            }}
          >
            <Button>Confirm</Button>
          </Popconfirm>
          <Popconfirm
          title={"Are you sure to cancel this course ?"}
          onConfirm={() => {
            handleCancelRegister(record.maKhoaHoc);
          }}
          onCancel={() => {
            message.error("Do nothing!");
          }}
        >
          <Button>Cancel</Button>
        </Popconfirm>
          </>
        );
      },
    },
  ];
  return (
    <>
      {success && <Success message={"Success!"} notChangePage={true} />}
      {err && <Error message={err} display={true} />}
      <Layout>
        <div className={style.background}>
          <h1>Register by user</h1>
          <div className={style.content}>
            <h2>Unregistered</h2>
            <Table
              columns={columns}
              dataSource={unRegistered}
              pagination={{ position: ["bottomCenter"] }}
              className={style.myTable}
              style={{borderRadius:12, overflow:"hidden", textAlign:"center"}}
            ></Table>
          </div>
          <div className={style.content}>
            <h2>Registered</h2>
            <Table
              columns={columns2}
              dataSource={registered}
              pagination={{ position: ["bottomCenter"] }}
              className={style.myTable}
              style={{borderRadius:12, overflow:"hidden", textAlign:"center"}}
            ></Table>
          </div>
          <div className={style.content}>
            <h2>Waiting for confirmation</h2>
            <Table
              columns={columns3}
              dataSource={confirm}
              pagination={{ position: ["bottomCenter"] }}
              className={style.myTable}
              style={{borderRadius:12, overflow:"hidden", textAlign:"center"}}
            ></Table>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default memo(RegisterByUser);
