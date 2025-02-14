import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import d20 from "../images/d20.png"

const users = {
    dm_cullen: "password123",
    player_jillian: "password123",
};

export default function LoginComponent({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (users[username] && users[username] === password) {
            onLogin(username);
            navigate("/calendar");
        } else {
            alert("Invalid username or password");
        }
    };

    return (
        <div className="login-page">
            <h1>my D&D calendar</h1>
            <img src={d20} className="d20" />
            <br></br>
            <h4>Keep track of all your D&D sessions with ease!</h4>
            <br></br>
            <h6>Username:</h6>
            <Form.Group className="control">
                <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>
            <h6>Password:</h6>
            <Form.Group className="control">
                <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button variant="success" onClick={handleLogin}>Submit</Button>
        </div>
    );
}
