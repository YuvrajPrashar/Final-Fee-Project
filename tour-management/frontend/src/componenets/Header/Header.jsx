import React, { useRef, useEffect, useContext} from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png"; // Corrected "assests" to "assets"
import "./header.css";
import {AuthContext} from './../../context/AuthContext'
const nav__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours", // Corrected the path by removing the extra slash
    display: "Tours",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const navigate= useNavigate()
  const {user, dispatch}= useContext(AuthContext)
  const logout= ()=>{
    dispatch({type:'LOGOUT'})
    navigate('/')
  }
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header"); // Removed the dot before class name
      } else {
        headerRef.current.classList.remove("sticky__header"); // Removed the dot before class name
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    // Corrected the removal of event listener
    return () => {
      window.removeEventListener("scroll", stickyHeaderFunc);
    };
  }, []); // Added an empty dependency array to run this effect only once

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/*==================logo===============*/}
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            {/*==================logo end===============*/}

            {/*==================menu starts ===============*/}
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      activeClassName="active__link" // Use activeClassName to apply the active class
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/*==================menu ends===============*/}

            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">
                {
                  user? (<>
                  <h5 className="mb-0">{user.username}</h5>
                  <Button className="btn btn-dark" onClick={logout}>logout</Button>
                  </>
                  ) : (
                  <>
                   <Button className="btn secondary__btn">
                   <Link to="/login">Login</Link>
                 </Button>
                 <Button className="btn primary__btn">
                   <Link to="/register">Register</Link>
                 </Button></>
                  ) 

                }
                
              </div>

              <span className="mobile__menu">
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;