import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/issues") // your backend endpoint
      .then(res => setIssues(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Community Problem Reporting App</h1>
      <ul>
        {issues.map(issue => (
          <li key={issue.id}>{issue.title} - {issue.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
