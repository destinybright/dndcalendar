import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import d20 from "../images/d20.png"


export default function AppNavbar() {
    return (
        <Navbar>
        <Container>
            <Navbar.Toggle aria-controls="navbar" />
            <Navbar.Collapse id="navbar">
            <Nav className="mx-auto">
                <img src={d20} className="d20-nav" />
                <Nav.Link as={Link} to="/calendar">Home</Nav.Link>
                <Nav.Link as={Link} to="/help">Help</Nav.Link>
                <Nav.Link as={Link} to="/">Logout</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}
