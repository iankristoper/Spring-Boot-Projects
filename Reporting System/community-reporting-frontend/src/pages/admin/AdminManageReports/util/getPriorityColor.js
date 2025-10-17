export default function getPriorityColor(priority) {
  switch (priority) {
    case "CRITICAL": return "#ff2525ff";
    case "HIGH": return "#ffac30ff";
    case "MEDIUM": return "#f9ff50ff";
    case "LOW": return "#19a763ff";
    default: return "gray";
  }
}
