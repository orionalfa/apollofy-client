//Imports
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { logIn } from "../../services/firebase";
import * as $ from "jquery";
import { setIsActive } from "../../services/api";
import "./login.css";
import { fetchUserData } from "../../redux/userData/actions";
import { useDispatch } from "react-redux";


//Import components
import Input from "../../components/Input";
import SignNav from "../../components/SignNav";
import Button from "../../components/Button";
import { Row, Col } from "react-bootstrap";
import validate from "jquery-validation";
//Hoc No Authorization
import withoutAuth from "../../hoc/withoutAuth.js";
import { getCurrentUser } from "../../services/api/index";

function Login() {
  const dispatch = useDispatch();
  const [passAndEmailNotMatch, setPassAndEmailNotMatch] = useState();
  const formLogin = useRef();
  const [validedLogin, setValidedLogin] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  //Manage values of state properties
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (validedLogin) {
      console.log(state);
      logIn(state.email, state.password)
        .then((res) => {
          console.log("uid de usuario fairebase", res.user.uid);
          getCurrentUser().then((res) => dispatch(fetchUserData(res)));
          setIsActive(true);

          // const user = userCredential.user;
          // setIsActive(true);
          // console.log(user);
        })
        .catch((error) => {
          setPassAndEmailNotMatch("Password and email doesn't match");
        });
    }
    setValidedLogin(false);
  }, [validedLogin]);
  //Sign in with user email and password
  const handleSubmit = (e) => {
    e.preventDefault();

    $(formLogin.current).validate({
      rules: {
        email: { required: true },
        password: { required: true },
      },
      messages: {
        email: {
          required: "<div className='errorModal'>Email is required</div>",
        },
        password: {
          required: "<div className='errorModal'>Password is required </div>",
        },
      },

      submitHandler: () => {
        setValidedLogin(true);
      },
    });
  };

  return (
    <main className="login-main gradient-background">
      {passAndEmailNotMatch ? (
        <div className="errorModalREACT">{passAndEmailNotMatch}</div>
      ) : (
        <div></div>
      )}
      <Row>
        <Col xs={12} md={6} className="login-register">
          <SignNav />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <form ref={formLogin} onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              id="email"
              label="Email"
              value={state.email}
              placeholder="Type email"
              handleChange={handleChange}
            />

            <Input
              type="password"
              name="password"
              id="password"
              label="Password"
              value={state.password}
              placeholder="Type password"
              handleChange={handleChange}
            />
            <Link to="/recover-password">
              <p className="mb-3 fw-normal">I have forgotten my password</p>
            </Link>
            <div className="login-register-button-centered">
              <Button title="Login" />
            </div>
          </form>
        </Col>
      </Row>
    </main>
  );
}

export default withoutAuth(Login);
