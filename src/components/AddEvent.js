import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

export default function AddEvent() {
    const [eventData, setEventData] = useState({
        title: "",
        date: "",
        time: "",
        description: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
        const newEvent = { id: Date.now(), ...eventData };
        localStorage.setItem("events", JSON.stringify([...storedEvents, newEvent]));
        navigate("/");
    };

    return (
        <div className="page">
        <h1 className="title-m">Add New Event</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="control">
            <Form.Label>Event Title</Form.Label>
            <Form.Control
                type="text"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                required
            />
            </Form.Group>
            <Form.Group className="control">
            <Form.Label>Date</Form.Label>
            <Form.Control
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                required
            />
            </Form.Group>
            <Form.Group className="control">
            <Form.Label>Time</Form.Label>
            <Form.Control
                type="time"
                name="time"
                value={eventData.time}
                onChange={handleChange}
                required
            />
            </Form.Group>
            <Form.Group className="control">
            <Form.Label>Description</Form.Label>
            <Form.Control
                as="textarea"
                name="description"
                value={eventData.description}
                onChange={handleChange}
            />
            </Form.Group>
            <Button variant="primary" type="submit">Save Event</Button>
            <Button variant="secondary" className="cancel" onClick={() => navigate("/calendar")}>Cancel</Button>
        </Form>
        </div>
    );
}
