import { FiAlertCircle } from "react-icons/fi";
function Formerror({ message }) {
  if (!message) return null;

  return (
    <div>
      <h2 className="flex items-center justify-between">
        <FiAlertCircle />
        <p>{message}</p>
      </h2>
    </div>
  );
}
export default Formerror;
