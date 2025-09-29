import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useSessionTimeout(timeout = 3600000) { // 1 hour default
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // Clear session and redirect
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
        localStorage.removeItem("expiry");

        navigate("/login", { state: { sessionExpired: true }, replace: true });
      }, timeout);
    };

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Start timer
    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [navigate, timeout]);
}
