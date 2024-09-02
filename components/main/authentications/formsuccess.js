import { FaRegCheckCircle } from "react-icons/fa";

function formsuccess({ message }) {
  if (!message) return null;
  return (
    <div>
      <FaRegCheckCircle />
      {message}
    </div>
  );
}

export default formsuccess;
