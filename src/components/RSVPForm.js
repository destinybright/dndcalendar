import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function RSVPForm({ event, username, onClose }) {
    const [rsvp, setRSVP] = useState("");

    useEffect(() => {
        const storedRSVPs = JSON.parse(localStorage.getItem("rsvps") || "{}");
        if (storedRSVPs[event.id] && storedRSVPs[event.id][username]) {
        setRSVP(storedRSVPs[event.id][username]);
        }
    }, [event.id, username]);

    const handleRSVP = () => {
        const storedRSVPs = JSON.parse(localStorage.getItem("rsvps") || "{}");

        if (!storedRSVPs[event.id]) {
        storedRSVPs[event.id] = {};
        }

        storedRSVPs[event.id][username] = rsvp;
        localStorage.setItem("rsvps", JSON.stringify(storedRSVPs));

        alert("RSVP saved!");
        onClose();
    };

    return (
        <Modal show onHide={onClose} centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
            <Modal.Title>rsvp for {event.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Comments:</strong> {event.comments}</p>

            <Form>
            <Form.Group>
                <Form.Label><strong>RSVP:</strong></Form.Label>
                <div class="rsvp">
                <Form.Check
                    type="radio"
                    label="Yes"
                    name="rsvp"
                    value="Yes"
                    checked={rsvp === "Yes"}
                    onChange={(e) => setRSVP(e.target.value)}
                />
                <Form.Check
                    type="radio"
                    label="No"
                    name="rsvp"
                    value="No"
                    checked={rsvp === "No"}
                    onChange={(e) => setRSVP(e.target.value)}
                />
                <Form.Check
                    type="radio"
                    label="Maybe"
                    name="rsvp"
                    value="Maybe"
                    checked={rsvp === "Maybe"}
                    onChange={(e) => setRSVP(e.target.value)}
                />
                </div>
            </Form.Group>
            <div className="form-buttons">
                <Button variant="primary" onClick={handleRSVP}>Submit</Button>
                <Button variant="secondary" className="cancel" onClick={onClose}>Close</Button>
            </div>
            </Form>
        </Modal.Body>
        </Modal>
    );
}
