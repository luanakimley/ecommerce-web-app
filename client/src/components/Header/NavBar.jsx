import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
      <nav className="classy-navbar" id="essenceNav">
        <img src={require("../../assets/milky-sky-logo.png")} alt="logo" />
        <a className="nav-brand">Milky Sky</a>
        <div className="classy-menu">
          <div className="classycloseIcon">
            <div className="cross-wrap">
              <span className="top"></span>
              <span className="bottom"></span>
            </div>
          </div>
          <div className="classynav">
            <ul>
              <li>
                <Link to="/shop">
                  <a>Shop</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
