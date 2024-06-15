import { useSelector } from "react-redux";
import { RegistrationForm } from "./RegisterForm";
import { LogInForm } from "./LogInForm";

export const AuthForm = ({ onSubmitRegister, onSubmitLogin }) => {
  const { formType } = useSelector((state) => state.auth);

  return (
    <>
      {formType === "login" ? (
        <LogInForm onSubmit={onSubmitLogin} />
      ) : (
        <RegistrationForm onSubmit={onSubmitRegister} />
      )}
    </>
  );
};
