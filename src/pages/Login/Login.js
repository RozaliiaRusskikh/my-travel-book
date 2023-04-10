import "./Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import UserContext from "../../context/userContext";
import { useContext } from "react";

const Login = () => {
  const { onLogin } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isEnabled = email.length > 0 && password.length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(email, password);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  let navigate = useNavigate();
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <section className="login-page">
      <form className="login-container" onSubmit={handleSubmit}>
        <h1 className="login-container__title">ADMIN Log In</h1>
        <p>
          <label className="login-container__label" htmlFor="email">
            Email:
          </label>
          <input
            className="login-container__input"
            value={email}
            type="email"
            onChange={handleEmailChange}
          ></input>
        </p>
        <p>
          <label className="login-container__label" htmlFor="password">
            Password:
          </label>
          <input
            className="login-container__input"
            value={password}
            type="password"
            onChange={handlePasswordChange}
          ></input>
        </p>
        <div className="login-container__buttons">
          <Button
            type="submit"
            text="Login"
            disabled={!isEnabled}
            isDisabled={!isEnabled}
          />
          <Button onClick={handleCancel} text="Cancel" isDisabled={false} />
        </div>
      </form>
    </section>
  );
};

export default Login;
