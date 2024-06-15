import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-dark-sea bg-opacity-50 z-[100]">
      <div className="bg-dark w-[500px] p-6">
        <div className="cursor-pointer" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </div>

        <div className="text-center text-light font-normal text-sm leading-[18px]">
          {title}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
