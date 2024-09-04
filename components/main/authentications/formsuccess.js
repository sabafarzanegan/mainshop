import { FaRegCheckCircle } from "react-icons/fa";

function Formsuccess({ message }) {
  if (!message) return null;
  return (
    <div className="flex items-center justify-between">
      <FaRegCheckCircle />
      {message}
    </div>
  );
}

export default Formsuccess;
