import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import CalendarPage from "./components/CalendarPage";
import AddEvent from "./components/AddEvent";
import AvailabilityPage from "./components/AvailabilityPage";
import RSVPPage from "./components/RSVPPage";
import AppNavbar from "./components/Navbar";
import HelpPage from "./components/HelpPage";
import './App.css';

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// ✅ This component now correctly uses `useLocation()`
function AppContent() {
  const [username, setUsername] = useState(localStorage.getItem("loggedInUser") || "");
  const location = useLocation(); // ✅ Now inside a `<Router>`

  useEffect(() => {
    localStorage.setItem("loggedInUser", username);
  }, [username]);

  return (
    <>
      {/* ✅ Navbar only shows if logged in AND not on the login page */}
      {username && location.pathname !== "/" && <AppNavbar />}

      <Routes>
        <Route path="/" element={<LoginPage onLogin={setUsername} />} />
        <Route path="/calendar" element={<CalendarPage username={username} />} />
        <Route path="/add-event" element={username === "admin" ? <AddEvent /> : <CalendarPage username={username} />} />
        <Route path="/availability" element={<AvailabilityPage />} />
        <Route path="/rsvp" element={<RSVPPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </>
  );
}
