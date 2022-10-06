import React from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import styles from "./styles.module.css";
import logo from "assets/logo-3Learn.png";
import clsx from "clsx";
import authSlice from "features/authentication/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Header() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.auth.profile);

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
                    <NavLink
                        to='/user'
                        className='text-black'
                        style={{
                            fontSize: 16,
                            fontWeight: 700,
                            lineHeight: "22px",
                            padding: "0.5rem",
                        }}>
                        Hi, {userProfile.hoTen}
                    </NavLink>
                    <NavLink
                        to=''
                        className={clsx("btn btnPrimary btnSecond", styles.btnNav)}
                        onClick={handleLogOut}>
                        Log out
                    </NavLink>
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
    return (
        <Navbar bg='light' expand='lg' fixed='top' className={styles.navBar}>
            <Container>
                <Link to='/' className={styles.navBrand}>
                    <img src={logo} alt='' />
                </Link>
                <Navbar.Toggle aria-controls='narBar' />
                <Navbar.Offcanvas id='narBar' placement='end' style={{ width: 300 }}>
                    <Offcanvas.Header
                        closeButton
                        className={styles.offCanvasHeader}></Offcanvas.Header>
                    <Offcanvas.Body className={styles.offCanvasBody}>
                        <Nav
                            className={clsx("justify-content-center w-100", styles.navLink)}
                            style={{ marginLeft: 80 }}>
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
                            {renderUserInfo()}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;
