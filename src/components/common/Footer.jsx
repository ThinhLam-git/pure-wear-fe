import React from 'react'
import WhiteLogo from "../../assets/images/logo-white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyCheckDollar,
  faCreditCard,
  faTruckFront,
} from "@fortawesome/free-solid-svg-icons";
const Footer = () => {
  return (
    <footer className="py-5">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-3">
              <img src={WhiteLogo} alt="Logo" className="logo" width={170} />
              <p className="text-white pt-3">
                Your Fashion Store - Bringing the latest trends to your
                wardrobe.
              </p>
            </div>
            <div className="col-md-3 ">
              <h2 className="mb-3 pt-3">Categories</h2>
              <ul>
                <li>
                  <a href="#action1" className="footer-content">
                    Men
                  </a>
                </li>
                <li>
                  <a href="#action1" className="footer-content">
                    Women
                  </a>
                </li>
                <li>
                  <a href="#action1" className="footer-content">
                    Kids
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h2 className="mb-3 pt-3">Quick Links</h2>
              <ul>
                <li>
                  <a href="#action1" className="footer-content">
                    Login
                  </a>
                </li>
                <li>
                  <a href="#action1" className="footer-content">
                    Register
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h2 className="mb-3 pt-3">Contact Me</h2>
              <ul>
                <li>
                  <a href="" className="footer-content">
                    +84 97796 7786
                  </a>
                </li>
                <li>
                  <a href="" className="footer-content">
                    ltthinh111@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="row spotlight py-5">
            <div className="col-md-4">
              <div className="text-white d-flex justify-content-center">
                <FontAwesomeIcon
                  icon={faTruckFront}
                  size="lg"
                  className="footer-icon px-2"
                />
                <h3 className="fw-bold">Free Delivery</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-white d-flex justify-content-center">
                <FontAwesomeIcon
                  icon={faMoneyCheckDollar}
                  size="lg"
                  className="footer-icon px-2"
                />
                <h3 className="fw-bold">Money Back Guarantee</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-white d-flex justify-content-center">
                <FontAwesomeIcon
                  icon={faCreditCard}
                  size="lg"
                  className="footer-icon px-2"
                />

                <h3 className="fw-bold">Secure Payments</h3>
              </div>
            </div>
          </div>

          <div className="row spotlight pt-5 ">
            <div className="col-md-12 text-white d-flex justify-content-center">
              <h4 className='text-center'>©   Copyright Lam Tuan Thinh 2025. All Rights Reserved.</h4>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer