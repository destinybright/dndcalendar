import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

export default function RSVPPage() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [selectedSession, setSelectedSession] = useState("");
    const [rsvp, setRSVP] = useState("");
    const [comment, setComment] = useState("");

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
        setEvents(storedEvents);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedSession) {
            alert("Please select a session.");
            return;
        }

        const storedRSVPs = JSON.parse(localStorage.getItem("rsvps") || "{}");

        if (!storedRSVPs[selectedSession]) {
        storedRSVPs[selectedSession] = {};
        }

        storedRSVPs[selectedSession] = {
        rsvp,
        comment,
        };

        localStorage.setItem("rsvps", JSON.stringify(storedRSVPs));
        alert("RSVP saved!");
        navigate("/calendar");
    };

    return (
        <div className="page">
        <h1>rsvp</h1>
        <h4>Let your Dungeon Master know if you can make it to the next session!</h4>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="control">
            <Form.Label><strong>Select Session:</strong></Form.Label>
            <Form.Select
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                required
            >
                <option value="">-- Select a Session --</option>
                {events.map(event => (
                <option key={event.id} value={event.id}>
                    {event.title} ({event.date} at {event.time})
                </option>
                ))}
            </Form.Select>
            </Form.Group>

            <Form.Group className="rsvp">
            <Form.Label><strong>RSVP:</strong></Form.Label>
            <div>
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

            <Form.Group className="control">
            <Form.Label><strong>Comments:</strong></Form.Label>
            <Form.Control
                as="textarea"
                placeholder="Add any comments"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            </Form.Group>

            <Button type="submit">Submit</Button>
            <Button variant="secondary" className="cancel" onClick={() => navigate("/calendar")}>Cancel</Button>
        </Form>
        </div>
    );
}
