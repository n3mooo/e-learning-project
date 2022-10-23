import { Button, message, Popconfirm, Table } from "antd";
import Layout from "common/HOC/Layout";
import React, { memo, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import style from "features/Register/pages/RegisterByCourse/style.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelRegister,
  confirmRegister,
  fetchConfirmList,
  fetchRegisteredList,
  fetchUnregisterList,
  register,
} from "features/Register/action";
import Success from "common/components/Success";
import Error from "common/components/Error";
import registerSlice from "features/Register/registerSlice";
function RegisterByCourse() {
  const match = useRouteMatch();
  const id = match.params.id;
  const dispatch = useDispatch();
  const fetchUnregisterListAction = (id) => {
    dispatch(fetchUnregisterList(id));
  };
  const fetchRegisteredListAction = (id) => {
    dispatch(fetchRegisteredList(id));
  };
  const fetchConfirmListAction = (id) => {
    dispatch(fetchConfirmList(id));
  };
  const cancleRegisterAction = (data) => {
    dispatch(cancelRegister(data));
  };
  const confirmRegisterAction = (data) => {
    dispatch(confirmRegister(data));
  };
  const registerAction = (data) => {
    dispatch(register(data));
  };
  const unRegister = useSelector((state) => {
    return state.register.unRegistered;
  });
  const registered = useSelector((state) => {
    return state.register.registered;
  });
  const confirm = useSelector((state) => {
    return state.register.confirm;
  });
  const err = useSelector((state) => {
    return state.register.error;
  });
  const success = useSelector((state) => {
    return state.register.success;
  });
  useEffect(() => {
    fetchUnregisterListAction(id);
    fetchRegisteredListAction(id);
    fetchConfirmListAction(id);
    dispatch(registerSlice.actions.reset());
  }, []);
  const handleCancelRegister = (e) => {
    const data = {
      id: id,
      taiKhoan: e,
    };
    cancleRegisterAction(data);
    setTimeout(() => {
      fetchRegisteredListAction(id);
      fetchUnregisterListAction(id);
      fetchConfirmListAction(id)
    }, 2000);
  };
  const handleConfirmRegister = (e) => {
    const data = {
      id: id,
      taiKhoan: e,
    };
    confirmRegisterAction(data);
    setTimeout(() => {
      fetchRegisteredListAction(id);
      fetchConfirmListAction(id);
    }, 2000);
  };
  const handleRegister = (e) => {
    const data = {
      id: id,
      taiKhoan: e,
    };
    registerAction(data);
    setTimeout(() => {
      fetchUnregisterListAction(id);
      fetchConfirmListAction(id);
    }, 2000);
  };
  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Bí danh",
      dataIndex: "biDanh",
      key: "biDanh",
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
              handleRegister(record.taiKhoan);
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
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Bí danh",
      dataIndex: "biDanh",
      key: "biDanh",
    },
    {
      title: "Action",
      dataIndex: "hanhDong",
      key: "hanhDong",
      render: (_, record) => {
        return (
          <Popconfirm
            title={"Are you sure to cancel register this course ?"}
            onConfirm={() => {
              handleCancelRegister(record.taiKhoan);
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
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Bí danh",
      dataIndex: "biDanh",
      key: "biDanh",
    },
    {
      title: "Action",
      dataIndex: "hanhDong",
      key: "hanhDong",
      render: (_, record) => {
        return (
          <>
            <Popconfirm
            title={"Are you sure to confirm register this course ?"}
            onConfirm={() => {
              handleConfirmRegister(record.taiKhoan);
            }}
            onCancel={() => {
              message.error("Do nothing!");
            }}
          >
            <Button>Confirm</Button>
          </Popconfirm>
          <Popconfirm
            title={"Are you sure to cancel register this course ?"}
            onConfirm={() => {
              handleCancelRegister(record.taiKhoan);
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
          <h1>Register By Course</h1>
          <div className={style.content}>
            <h2>Unregistered</h2>
            <Table
              columns={columns}
              dataSource={unRegister}
              pagination={{ position: ["bottomCenter"] }}
              className={style.myTable}
              style={{borderRadius:12, overflow:"hidden", textAlign:"center"}}
            />
          </div>
          <div className={style.content}>
            <h2>Registered</h2>
            <Table
              columns={columns2}
              dataSource={registered}
              pagination={{ position: ["bottomCenter"] }}
              className={style.myTable}
              style={{borderRadius:12, overflow:"hidden", textAlign:"center"}}
            />
          </div>
          <div className={style.content}>
            <h2>Waiting for confirmation</h2>
            <Table
              columns={columns3}
              dataSource={confirm}
              pagination={{ position: ["bottomCenter"] }}
              className={style.myTable}
              style={{borderRadius:12, overflow:"hidden", textAlign:"center"}}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default memo(RegisterByCourse);
