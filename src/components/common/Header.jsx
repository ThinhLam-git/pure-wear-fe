import React from 'react'
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="shadow">
        <div className="bg-black text-white text-center d-block p-3">
          <span>Your Fashion Store</span>
        </div>

        <div className="container">
          <Navbar expand="lg" className="">
            <Navbar.Brand href="/">
              <img src={Logo} alt="Logo" className="logo" width={170} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
                <Nav.Link href="/shop">Men</Nav.Link>
                <Nav.Link href="#action2">Women</Nav.Link>
                <Nav.Link href="#action3">Kids</Nav.Link>
              </Nav>
              <div className="nav-right d-flex gap-3 align-items-center">
                <a href="#" className="text-dark">
                  <FontAwesomeIcon icon={faUser} size="lg" />
                </a>
                {/* <a href="" className="text-dark">
                  <FontAwesomeIcon icon={faHeart} size="lg" />
                </a> */}
                <Link to="/cart" className="text-dark">
                  <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                </Link>
                {/* <a href="" className="text-dark">
                  <FontAwesomeIcon icon={faSearch} size="lg" />
                </a> */}
              </div>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </header>
  )
}

export default Header