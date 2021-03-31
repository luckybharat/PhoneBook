import React, { useEffect, useState } from "react";
import { AlertTriangle, Eye, EyeOff } from "react-feather";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useConsumerAuth } from "../../context/Index";

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 24rem;
  border-radius: 1rem;
`;

const LoginHeader = styled.div`
  min-height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
`;
const LoginFormWrapper = styled.div`
  padding: 1rem;
`;

const ErrorWrapper = styled.div`
  display: flex;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  background: #ff000020;
  color: #ff000090;
`;

const LoginButtonWrapper = styled.button`
  outline: none;
  border: none;
  color: #fff;
  margin-top: 1rem;
  padding: 0.6rem;
  border-radius: 0.4rem;
`;

export default function Login() {
  const { consumer, login } = useConsumerAuth();
  const history = useHistory();
  const [credential, setCredential] = useState({ email: "", password: "" });
  const [eye, setEye] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
  };

  const toggleEye = () => {
    setEye(!eye);
  };

  useEffect(() => {
    consumer ? history.push("/") : console.log("please login");
  }, [consumer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credential);
    login(credential.email, credential.password)
      .then(() => {
        setError("");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen p-2">
      <LoginWrapper className="shadow-lg">
        <LoginHeader className="bg-blue-500">Login</LoginHeader>
        <LoginFormWrapper>
          {error ? (
            <ErrorWrapper>
              <AlertTriangle />
              <span className="ml-2">{error}</span>
            </ErrorWrapper>
          ) : null}
          <form autoComplete="off" onSubmit={handleSubmit}>
            <input
              type="text"
              className="border p-3 w-full rounded-lg"
              placeholder="Email"
              name="email"
              value={credential.email}
              onChange={handleChange}
            />
            <div className="flex items-center justify-between border mt-4 px-3 rounded-lg">
              <input
                type={eye ? "text" : "password"}
                className="py-3"
                placeholder="Password"
                name="password"
                value={credential.password}
                onChange={handleChange}
              />
              <span className="text-gray-400" onClick={toggleEye}>
                {eye ? <EyeOff /> : <Eye />}
              </span>
            </div>

            <LoginButtonWrapper className="bg-blue-500 w-full" type="submit">
              Login
            </LoginButtonWrapper>
          </form>
        </LoginFormWrapper>
      </LoginWrapper>
    </div>
  );
}
