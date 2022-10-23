import { Button, Input, message, Popconfirm, Table } from "antd";
import Layout from "common/HOC/Layout";
import React, { memo, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  fetchUserList,
  fetchUserType,
  searchUsers,
} from "features/User/action";
import { MdDeleteOutline } from "react-icons/md";
import { BsGear } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import userManageSlice from "features/User/userManageSlice";
import Success from "common/components/Success";
import Error from "common/components/Error";
import style from "features/User/pages/UserManagement/style.module.css";

const { Search } = Input;
function UserManagement() {
  const dispatch = useDispatch();
  const history = useHistory();
  const fetchUserListAction = () => {
    dispatch(fetchUserList("GP01"));
  };
  const userList = useSelector((state) => {
    return state.userManager.userList;
  });
  const success = useSelector((state) => {
    return state.userManager.success;
  });
  const err = useSelector((state) => {
    return state.userManager.error;
  });
  const role = useSelector((state) => {
    return state.user.profile.maLoaiNguoiDung;
  });
  useEffect(() => {
    fetchUserListAction();
    dispatch(fetchUserType());
    dispatch(userManageSlice.actions.reset());
  }, []);
  const onSearch = (e) => {
    console.log(e);
  };
  const onChange = (e) => {
    if (e.target.value) {
      searchUsersAction(e.target.value);
    } else {
      fetchUserListAction();
    }
  };
  const searchUsersAction = (keyword) => {
    dispatch(searchUsers(keyword));
  };
  const goToAddUser = () => {
    history.push("/admin/user/adduser");
  };
  const deleteAction = (e) => {
    if (role === "HV") {
      message.error("You don't have permission");
      
    } else {
      dispatch(deleteUser(e));
    setTimeout(() => {
      fetchUserListAction();
    }, 3000);
    }
    
  };
  const cancel = () => {
    message.error("Do nothing!!");
  };
  const handleEdit = (values) => {
    dispatch(userManageSlice.actions.setSelectedUser(values));
    setTimeout(() => {
      history.push("/admin/user/updateuser");
    }, 1000);
  };
  const columns = [
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      responsive: ["xs", "sm", "md"],
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      key: "hoTen",
      responsive: ["md"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["lg"],
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "soDt",
      responsive: ["xl"],
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      responsive: ["xs", "sm", "md"],
    },
    {
      title: "Hành Động",
      dataIndex: "hanhDong",
      key: "hanhDong",
      responsive: ["xs", "sm", "md"],
      render: (_, record) => {
        return (
          <div style={{ textAlign: "center" }}>
            <Link
              style={{ marginRight: 12 }}
              to={"#"}
              onClick={() => {
                handleEdit(record);
              }}
            >
              <BsGear style={{ fontSize: 24, color: "gray" }} />
            </Link>
            <Popconfirm
              title={"Are you sure to delete this user?"}
              onConfirm={() => {
                deleteAction(record.taiKhoan);
              }}
              onCancel={cancel}
            >
              <Link style={{ marginRight: 12 }} to={"#"}>
                <MdDeleteOutline style={{ fontSize: 24, color: "red" }} />
              </Link>
            </Popconfirm>
            <Link
              className={style.regis}
              to={"/admin/register/user/" + record.taiKhoan}
            >
              <AiOutlineCalendar style={{ fontSize: 24, color: "blue" }} />
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <>
      {success && (
        <Success message={"Delete user success!"} notChangePage={true} />
      )}
      {err && <Error message={err} display={true} />}
      <Layout>
        <div style={{ padding: 20 }}>
          <h1>User management</h1>
          <Button
            style={{ marginBottom: 16 }}
            type="primary"
            onClick={goToAddUser}
          >
            Add new user
          </Button>
          <Search
            style={{ marginBottom: 16 }}
            placeholder="Input keyword"
            onSearch={onSearch}
            onChange={onChange}
            enterButton
          />
          <Table
            dataSource={userList}
            columns={columns}
            pagination={{ position: ["bottomCenter"] }}
            style={{
              borderRadius: 12,
              overflowX:"scroll",
              textAlign: "center",
            }}
            className={style.myTable}
          ></Table>
        </div>
      </Layout>
    </>
  );
}

export default memo(UserManagement);
