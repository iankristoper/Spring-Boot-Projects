
//This is for colors

export const getPriorityColor = (priority) => ({
  CRITICAL: "#ff2525ff",
  HIGH: "#ffac30ff",
  MEDIUM: "#f9ff50ff",
  LOW: "#19a763ff",
}[priority] || "gray");

export const getStatusColor = (status) => ({
  Pending: "red",
  Verified: "orange",
  Resolved: "#00e676",
  Archived: "#ffeb3b",
}[status] || "gray");

// src/utils/colorHelpers.js
export const COLORS = {
  black: "#000",
  darkGray: "#111",
  lightGray: "#ccc",
  yellow: "#ffeb3b",
  yellowHover: "#f9ff50",
  green: "#00e676",
  orange: "#ff9800",
  red: "#f44336",
};

