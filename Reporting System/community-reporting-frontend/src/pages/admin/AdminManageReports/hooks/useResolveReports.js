import { useState } from "react";
import axios from "axios";

export default function useResolveReport({ setReports }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const confirmResolve = async (ids, onClose) => {
    setLoading(true);
    setError(null);

    try {
      await Promise.all(
        ids.map((id) =>
          axios.put(
            `http://localhost:8080/api/admin/update/report-status/${id}`,
            { status: "Resolved" },
            { withCredentials: true }
          )
        )
      );

      // ✅ Update reports in state
      setReports((prevReports) =>
        prevReports.map((r) =>
          ids.includes(r.id) ? { ...r, status: "Resolved" } : r
        )
      );

      setSuccess(true);
      if (onClose) onClose();
    } catch (err) {
      console.error("Failed to resolve report(s):", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { confirmResolve, loading, success, error, setSuccess };
}
