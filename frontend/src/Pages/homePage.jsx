import React from "react";
import "../Styles/home.css";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer.jsx";
import Logo from "../Image/logo_white.png";
import Homebg from "../Image/home_bg.png";

class HomePage extends React.Component {
  render() {
    return (
      <body>
        <Navbar className="navbar-bg" variant="dark">
          <Navbar.Brand className="navbrand">
            <img className="navbrand-img" alt="ReadME Logo" src={Logo} />
            ReadME
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Link exact to="/login">
              <button className="login-bttn">Log in/ Sign up</button>
            </Link>
          </Nav>
        </Navbar>

        <div>
          <img id="home-bg" alt="Background" src={Homebg}></img>
          <Link exact to="/signup">
            <button id="nextpage-bttn">let's explore</button>
          </Link>
        </div>

        <Footer></Footer>
      </body>
    );
  }
}

export default HomePage;
