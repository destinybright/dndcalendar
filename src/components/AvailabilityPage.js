import { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AvailabilityPage() {
    const navigate = useNavigate();
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Load availability from localStorage or set default
    const [availability, setAvailability] = useState(() => {
        const storedAvailability = JSON.parse(localStorage.getItem("availability")) || {};
        return storedAvailability;
    });

    const [selectedDay, setSelectedDay] = useState(null);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("availability", JSON.stringify(availability));
    }, [availability]);

    const openModal = (day) => {
        setSelectedDay(day);
        setStartTime(availability[day]?.start || "");
        setEndTime(availability[day]?.end || "");
        setIsModalOpen(true);
    };

    const saveAvailability = () => {
        setAvailability((prev) => ({
        ...prev,
        [selectedDay]: { start: startTime, end: endTime },
        }));
        setIsModalOpen(false);
    };

    return (
        <div className="page">
        <h1>Availability</h1>
        <br></br>
        <h4>Add or update your available times for sessions!</h4>

        <Table bordered>
            <thead>
            <tr>
                <th>Days</th>
                <th>Times</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody>
            {daysOfWeek.map((day) => (
                <tr key={day}>
                <td>{day}</td>
                <td>
                    {availability[day]
                    ? `${availability[day].start} - ${availability[day].end}`
                    : "No Availability Entered"}
                </td>
                <td>
                    <Button variant="success" size="sm" onClick={() => openModal(day)}>
                    Edit
                    </Button>
                </td>
                </tr>
            ))}
            </tbody>
        </Table>

        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered>
            <Modal.Header closeButton>
            <Modal.Title>Edit Availability for {selectedDay}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group>
                <Form.Label>Start Time</Form.Label>
                <Form.Control type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </Form.Group>
                <Form.Group>
                <Form.Label>End Time</Form.Label>
                <Form.Control type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </Form.Group>
                <br></br>
                <div>
                    * Warning: This will affect all future availability. *
                </div>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={saveAvailability}>Save</Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
}
