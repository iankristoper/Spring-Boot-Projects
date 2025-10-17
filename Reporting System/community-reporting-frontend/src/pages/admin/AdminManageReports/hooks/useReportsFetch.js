import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function useReportsFetch() {
  const [reports, setReports] = useState([]);
  const [newReportAlert, setNewReportAlert] = useState(false);
  const previousIdsRef = useRef([]);

  useEffect(() => {
    const fetchReports = () => {
      axios
        .get("http://localhost:8080/api/reports/fetch_all", { withCredentials: true })
        .then((res) => {
          const sorted = res.data.slice().sort((a, b) => {
            if (a.status === "Resolved" && b.status !== "Resolved") return 1;
            if (a.status !== "Resolved" && b.status === "Resolved") return -1;
            return 0;
          });

          const newIds = sorted.map((r) => r.id);
          if (previousIdsRef.current.length > 0 && newIds.some((id) => !previousIdsRef.current.includes(id))) {
            setNewReportAlert(true);
          }

          previousIdsRef.current = newIds;
          setReports(sorted);
        })
        .catch((err) => console.error("Failed to fetch reports", err));
    };

    fetchReports();
    const interval = setInterval(fetchReports, 5000);
    return () => clearInterval(interval);
  }, []);

  return { reports, setReports, newReportAlert, setNewReportAlert, previousIdsRef };
}
