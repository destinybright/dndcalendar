import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function EventForm({ event, onSave, onClose, isEditing, onDelete }) {
    const [eventData, setEventData] = useState({
        id: "",
        title: "",
        date: "",
        time: "",
        location: "",
        comments: "",
    });

    useEffect(() => {
        if (event) {
        setEventData(event);
        }
    }, [event]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(eventData);
    };

    return (
        <Modal show onHide={onClose} centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "edit event" : "add event"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="control">
                <Form.Label>Title</Form.Label>
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
                <Form.Label>Location</Form.Label>
                <Form.Control
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="control">
                <Form.Label>Comments</Form.Label>
                <Form.Control
                as="textarea"
                name="comments"
                value={eventData.comments}
                onChange={handleChange}
                />
            </Form.Group>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                {isEditing && (
                <Button variant="danger" onClick={() => onDelete(event.id)}>Delete</Button>
                )}
                <Button variant="success" type="submit">Save</Button>
            </Modal.Footer>
            </Form>
        </Modal.Body>
        </Modal>
    );
}
