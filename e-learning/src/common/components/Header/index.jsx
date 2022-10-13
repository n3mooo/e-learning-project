import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import styles from "./styles.module.css";
import logo from "assets/logo-3Learn.png";
import clsx from "clsx";
import authSlice from "features/authentication/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { fetchCourseDetailAction } from "features/home/action";

function Header() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.auth.profile);
    const cart = useSelector((state) => state.home.cart);

    const fetchCourseDetail = async (id) => {
        await dispatch(fetchCourseDetailAction(id));
    };

    const goHome = () => {
        history.push("/");
    };

    const handleLogOut = (e) => {
        e.preventDefault();

        localStorage.removeItem("token");
        dispatch(authSlice.actions.logOut(null));

        goHome();
    };

    const renderUserInfo = () => {
        if (userProfile) {
            return (
                <>
                    <NavDropdown
                        title={
                            <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: "1.3rem" }} />
                        }
                        className={styles.navDropdown}>
                        <NavDropdown.Item onClick={() => history.push("/user")}>
                            <div className='d-flex flex-column'>
                                <p className='m-0'>{userProfile.hoTen}</p>
                                <span
                                    style={{
                                        fontSize: "0.75rem",
                                        display: "block",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        color: "#6a6f73",
                                    }}>
                                    {userProfile.email}
                                </span>
                            </div>
                        </NavDropdown.Item>

                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => history.push("/user")}>
                            My profile
                        </NavDropdown.Item>
                        <NavDropdown.Item
                            className='d-flex flex-row justify-content-between align-items-center'
                            onClick={() => history.push("/cart")}>
                            <div>My cart</div>
                            <span
                                className={clsx({
                                    "d-none": cart.length === 0,
                                })}
                                style={{
                                    backgroundColor: "#f06a2b",
                                    fontSize: "0.7rem",
                                    width: "1rem",
                                    height: "1rem",
                                    lineHeight: "1rem",
                                    textAlign: "center",
                                    borderRadius: "50%",
                                    color: "#fff",
                                }}>
                                {cart.length > 9 ? "9+" : cart.length}
                            </span>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogOut}>Log out</NavDropdown.Item>
                    </NavDropdown>
                    <div className={styles.navToggle}>
                        <NavLink to='/user'>
                            <div className='d-flex flex-column'>
                                <p className='m-0'>{userProfile.hoTen}</p>
                                <span
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: "400",
                                        display: "block",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        color: "#6a6f73",
                                    }}>
                                    {userProfile.email}
                                </span>
                            </div>
                        </NavLink>
                        <NavLink
                            to='/'
                            className={clsx("btn btnPrimary btnSecond mt-3", styles.btnNav)}
                            onClick={handleLogOut}>
                            Log out
                        </NavLink>
                    </div>
                </>
            );
        }
        return (
            <>
                <NavLink to='/signin' className={clsx("btn btnPrimary btnSecond", styles.btnNav)}>
                    Log In
                </NavLink>
                <NavLink to='/signup' className={clsx("btn btnPrimary", styles.btnNav)}>
                    Get started
                </NavLink>
            </>
        );
    };

    const renderPreCart = () => {
        return (
            <NavDropdown
                title={
                    <>
                        <FontAwesomeIcon
                            icon={faCartShopping}
                            style={{ fontSize: "1.1rem" }}
                            className={styles.iconCart}
                        />
                        <span
                            className={clsx(styles.amountCart, {
                                "d-none": cart.length === 0,
                            })}>
                            {cart.length > 9 ? "9+" : cart.length}
                        </span>
                    </>
                }
                className={clsx(styles.navDropdown, styles.cart)}>
                {cart.length === 0 ? (
                    <NavDropdown.Item>Your cart is empty</NavDropdown.Item>
                ) : (
                    <>
                        {cart?.map((item, index) => {
                            return (
                                <div key={index}>
                                    <NavDropdown.Item
                                        onClick={async () => {
                                            await fetchCourseDetail(item.maKhoaHoc);
                                            history.push("/detail/" + item.biDanh);
                                        }}>
                                        <div
                                            className={clsx(
                                                "d-flex flex-row flex-nowrap gap-3",
                                                styles.itemCart
                                            )}>
                                            <div
                                                style={{
                                                    height: "4rem",
                                                    minWidth: "4rem",
                                                }}>
                                                <img src={item.hinhAnh} alt='' />
                                            </div>

                                            <div className={styles.text}>
                                                <h3>{item.tenKhoaHoc}</h3>
                                                <span>{item.nguoiTao.hoTen}</span>
                                            </div>
                                        </div>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                </div>
                            );
                        })}
                        <div className='w-100 text-center'>
                            <Button
                                className={clsx("btn btnDark", styles.btnCart)}
                                onClick={() => history.push("/cart")}>
                                Go to cart
                            </Button>
                        </div>
                    </>
                )}
            </NavDropdown>
        );
    };

    const renderCartToggle = () => {
        return (
            <NavDropdown
                title={
                    <>
                        <FontAwesomeIcon
                            icon={faCartShopping}
                            style={{ fontSize: "1.1rem" }}
                            className={styles.iconCart}
                        />
                        <span
                            className={clsx(styles.amountCart, {
                                "d-none": cart.length === 0,
                            })}>
                            {cart.length > 9 ? "9+" : cart.length}
                        </span>
                    </>
                }
                className={clsx(styles.navDropdown, styles.cartToggle)}>
                {cart.length === 0 ? (
                    <NavDropdown.Item>Your cart is empty</NavDropdown.Item>
                ) : (
                    <>
                        {cart?.map((item, index) => {
                            return (
                                <div key={index}>
                                    <NavDropdown.Item
                                        onClick={async () => {
                                            await fetchCourseDetail(item.maKhoaHoc);
                                            history.push("/detail/" + item.biDanh);
                                        }}>
                                        <div
                                            className={clsx(
                                                "d-flex flex-row flex-nowrap gap-3",
                                                styles.itemCart
                                            )}>
                                            <div
                                                style={{
                                                    height: "4rem",
                                                    minWidth: "4rem",
                                                }}>
                                                <img src={item.hinhAnh} alt='' />
                                            </div>

                                            <div className={styles.text}>
                                                <h3>{item.tenKhoaHoc}</h3>
                                                <span>{item.nguoiTao.hoTen}</span>
                                            </div>
                                        </div>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                </div>
                            );
                        })}
                        <div className='w-100 text-center'>
                            <Button
                                className={clsx("btn btnDark", styles.btnCart)}
                                onClick={() => history.push("/cart")}>
                                Go to cart
                            </Button>
                        </div>
                    </>
                )}
            </NavDropdown>
        );
    };

    return (
        <Navbar bg='light' expand='lg' fixed='top' className={styles.navBar}>
            <Container>
                <Link to='/' className={styles.navBrand}>
                    <img src={logo} alt='' />
                </Link>
                <div className='d-flex flex-row align-items-center' style={{ gap: 12 }}>
                    {renderCartToggle()}
                    <Navbar.Toggle aria-controls='narBar' className={styles.btnToggle}>
                        <FontAwesomeIcon icon={faBars} />
                    </Navbar.Toggle>
                </div>

                <Navbar.Offcanvas id='narBar' placement='end' style={{ width: 300 }}>
                    <Offcanvas.Header
                        closeButton
                        className={styles.offCanvasHeader}></Offcanvas.Header>
                    <Offcanvas.Body className={styles.offCanvasBody}>
                        <Nav className={clsx("justify-content-center w-100", styles.navLink)}>
                            <NavLink activeClassName={styles.active} to='/' exact>
                                Home
                            </NavLink>
                            <NavLink activeClassName={styles.active} to='/course'>
                                Course
                            </NavLink>
                            <NavLink activeClassName={styles.active} to='/contact'>
                                Contact
                            </NavLink>
                        </Nav>
                        <Nav
                            className={clsx("justify-content-end", styles.navLink)}
                            style={{ gap: 12, height: "fit-content" }}>
                            {renderPreCart()}
                            {renderUserInfo()}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;
