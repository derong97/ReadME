import React from 'react';
import './style_HomePage.css'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Logo from "../Image/logo_white.png";

class HomePage extends React.Component {
    render() {
        return (
            <body>
                <Navbar className="navbar-bg" variant="dark">
                    <Navbar.Brand className="navbrand">
                        <img
                            alt="ReadME Logo"
                            src={Logo}
                            width="45"
                            height="auto"
                        />ReadME
                    </Navbar.Brand>
                    <Nav className="ml-auto">
                        <Link exact to="/"><button className="login-bttn">Log in/ Sign up</button></Link>
                    </Nav>
                </Navbar>

                <div className="home-bg">
                    <Link exact to="/"><button className="next-page-bttn">let's explore</button></Link>
                </div>

                <footer>
                    <Nav className="justify-content-end">
                        <Nav.Item>
                            <Nav.Link className="navlink">Contact Us</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="navlink">About Us</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </footer>
            </body>
        )
    }
}

export default HomePage;