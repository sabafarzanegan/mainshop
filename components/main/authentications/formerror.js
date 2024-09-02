import { FiAlertCircle } from "react-icons/fi";
function formerror({ message }) {
  if (!message) return null;

  return (
    <div>
      <h2>
        <FiAlertCircle />
        <p>{message}</p>
      </h2>
    </div>
  );
}
export default formerror;
