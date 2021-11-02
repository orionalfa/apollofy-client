import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { sendNewPass, verifyCode } from "../../services/firebase";
//Components
import { Row, Col } from "react-bootstrap";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function ChangePassword() {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);

  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
    urlCode: "",
  });
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state.confirmPassword);
  };

  useEffect(() => {
    const code = query.get("oobCode");
    setState({ ...state, urlCode: code });
    console.log(code);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      verifyCode(state.urlCode)
        .then(() => {
          sendNewPass(state.urlCode, state.confirmPassword)
            .then(() => {
              console.log("Password Changed Succesfuly");
              history.push("/login");
            })
            .catch((err) => {
              alert(err);
            });
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Las contraseñas deben ser iguales");
    }
  }

  return (
    <main className="login-main gradient-background">
      <Row>
        <Col xs={12} md={6} className="login-register">
          <h1 className="h3 mb-3 mt-2 fw-normal">
            Please change your password{" "}
          </h1>
          <form onSubmit={handleSubmit}>
            <Input
              type="password"
              name="password"
              id="password"
              label="New Password"
              value={state.password}
              placeholder="New Password"
              handleChange={handleChange}
            />

            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              label="Confirm Password"
              value={state.confirmPassword}
              placeholder="Confirm password"
              handleChange={handleChange}
            />
            <div className="login-register-button-centered">
              <Button title="Change Password" onSubmit={handleSubmit} />
            </div>
          </form>
        </Col>
      </Row>
    </main>
  );
}
