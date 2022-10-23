import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "common/HOC/Layout/style.module.css";
import { Link, NavLink } from "react-router-dom";
import userSlice from "features/LogIn/userSlice";
import { BsBook } from "react-icons/bs";
import { MdOutlineAppRegistration } from "react-icons/md";
import {
  AiOutlineMenu,
  AiOutlineUser,
  AiFillCloseSquare,
  AiOutlineLogout,
} from "react-icons/ai";
import { HiUserCircle } from "react-icons/hi";
import { IoLogoWebComponent } from "react-icons/io5";
function Layout(props) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => {
    return state.user.profile;
  });
  const handleLogOut = () => {
    dispatch(userSlice.actions.logOut());
    localStorage.removeItem("token")
    localStorage.removeItem("role")
  };
  const [sidebar, setSideBar] = useState(false);
  const [icon, setIcon] = useState(false);
  const [logOut, setLogOut] = useState(false);
  const showSideBar = () => {
    setSideBar(!sidebar);
    setIcon(!icon);
    // setContent(!content);
  };
  const showLogOut = () => {
    setLogOut(!logOut);
  };
  
  return (
    <>
      <nav className={!sidebar ? ` ${style.close}` : ""}>
        <div className={style.logo}>
          <div className={style.logo_image}>
            <IoLogoWebComponent />
          </div>
          <span className={style.logo_name}>Admin Page</span>
        </div>
        <div className={style.menu_item}>
          <ul className={style.nav_link}>
            <li>
              <NavLink to={"/admin/user"} activeClassName={style.active}>
                <AiOutlineUser />
                <span className={style.link_name}>User Manage</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/courses"} activeClassName={style.active}>
                <BsBook />
                <span className={style.link_name}>Courses Manage</span>
              </NavLink>
            </li>
            <li>
              {/* <Link to={"#"} >
                <MdOutlineAppRegistration />
                <span className={style.link_name}>Register Manage</span>
              </Link> */}
            </li>
          </ul>
        </div>
      </nav>
      <section className={style.dashboard}>
        <div className={style.top}>
          <Link to={"#"} onClick={showSideBar}>
            {icon ? (
              <AiOutlineMenu className={style.side_toggle} />
            ) : (
              <AiFillCloseSquare className={style.side_toggle} />
            )}
          </Link>
          {profile && (
            <div className={style.info}>
            <button className={style.avt} onClick={showLogOut}>
              <HiUserCircle />
            </button>
            <div
              className={
                !logOut ? `${style.logout}` : `${style.logout} ${style.active}`
              }
            >
              <span className={style.taiKhoan}>{profile.taiKhoan}</span>
              <span className={style.taiKhoan}>Role: {profile.maLoaiNguoiDung}</span>
              <Link to={"/admin/login"} onClick={handleLogOut}>
                <AiOutlineLogout />
                <span className={style.link_name}>Log out</span>
              </Link>
            </div>
          </div>
          )}
        </div>
        <div className={style.main}>
          <div className={style.container}>{props.children}</div>
        </div>
      </section>
    </>
  );
}

export default Layout;
