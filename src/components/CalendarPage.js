import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, Modal } from "react-bootstrap";
import EventForm from "./EventForm";
import RSVPForm from "./RSVPForm";

export default function CalendarPage({ username }) {
    const [events, setEvents] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
        setEvents(storedEvents);
    }, []);

    useEffect(() => {
        if (events.length > 0) {
        localStorage.setItem("events", JSON.stringify(events));
        }
    }, [events]);

    const formatTime = (time) => {
        if (!time) return "";
        const [hour, minute] = time.split(":");
        const formattedHour = hour % 12 || 12;
        const period = hour >= 12 ? "PM" : "AM";
        return `${formattedHour}:${minute} ${period}`;
    };

    const addEvent = (date) => {
        if (username !== "dm_cullen") return;
        setSelectedEvent({ id: Date.now(), title: "", time: "", date });
        setIsEditing(false);
        setIsDialogOpen(true);
    };

    const deleteEvent = (eventId) => {
        if (window.confirm("Are you sure you want to delete this event?\n\nRemoving the session will remove the RSVPs of players who have already responded. If you want to remake this session, those users will need to RSVP again.")) {
            const updatedEvents = events.filter(event => event.id !== eventId);
            setEvents(updatedEvents);
            localStorage.setItem("events", JSON.stringify(updatedEvents));
            setIsDialogOpen(false);
        }
    };

    return (
        <div className="page">
        <h1 className="title-m">my calendar</h1>

        {username !== "dm_cullen" && (
            <div className="button-container">
            <Button className="big-button" variant="success" onClick={() => navigate("/availability")}>Add Availability</Button>
            <Button className="big-button" variant="success" onClick={() => navigate("/rsvp")}>RSVP</Button>
            </div>
        )}

        <div className="cal">
            <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: "prev",
                center: "title",
                right: "next"
            }}
            events={events.map(event => ({
                id: event.id,
                title: `${event.title} - ${formatTime(event.time)}`,
                date: event.date
            }))}
            editable={username === "dm_cullen"}
            selectable={username === "dm_cullen"}
            dayCellContent={({ date }) => (
                <div className="add-session">
                {username === "dm_cullen" && (
                    <Button variant="success" className="plus" onClick={() => addEvent(date.toISOString().split("T")[0])}>
                    ＋
                    </Button>
                )}
                <span>{date.getDate()}</span>
                </div>
            )}
            eventClick={(info) => {
                const clickedEvent = events.find(event => event.id.toString() === info.event.id);
                if (clickedEvent) {
                setSelectedEvent(clickedEvent);
                setIsEditing(username === "dm_cullen");
                setIsDialogOpen(true);
                }
            }}
            />
        </div>

        {isDialogOpen && (
            username === "dm_cullen" ? (
                <EventForm
                    event={selectedEvent}
                    onSave={(event) => {
                        setEvents(prevEvents => {
                        const updatedEvents = prevEvents.some(e => e.id === event.id)
                        ? prevEvents.map(e => e.id === event.id ? event : e) // Edit existing
                        : [...prevEvents, event];
                        localStorage.setItem("events", JSON.stringify(updatedEvents));
                        return updatedEvents;
                        });
                        setIsDialogOpen(false);
                    }}
                    onDelete={deleteEvent}
                    onClose={() => setIsDialogOpen(false)}
                    isEditing={isEditing}
                    />
                ) : (
                    <RSVPForm
                    event={selectedEvent}
                    username={username}
                    onClose={() => setIsDialogOpen(false)}
                    isEditing={false}
                    />
                )
            )}
        </div>
    );
}
