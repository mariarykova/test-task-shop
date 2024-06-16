import React from "react";
import PropTypes from "prop-types";

const Button = ({ onClick, isDisabled, additionalClasses, children }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-violet-dark rounded-md py-[9px] px-[20px] font-semibold leading-[20px] ${
        isDisabled
          ? "cursor-not-allowed bg-grey"
          : "cursor-pointer hover:bg-violet"
      } ${additionalClasses}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  additionalClasses: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  additionalClasses: "",
};

export default Button;
