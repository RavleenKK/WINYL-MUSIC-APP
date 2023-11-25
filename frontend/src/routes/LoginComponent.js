import React from "react";
import TextInput from "../components/shared/TextInput";
import { Link, useNavigate, Navigate } from "react-router-dom";
import logo from "../../src/logo.png";
import "../index.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";
import { jwtDecode } from "jwt-decode";
import $ from "jquery";

const LoginComponent = () => {
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const Login = async () => {
    const data = { email, password };
    const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);
    if (response && !response.err) {
      console.log(response);
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      alert("success");
      navigate("/home");
    } else {
      alert("failure");
    }
  };

  function handleCallbackResponse(response) {
    console.log("encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);

    // jquery
    $("#signin").hide();
  }

  return (
    <>
      <section className="header ">
        <div className="login-container logo p-0">
          <img src={logo} alt="hello" height={300} width={300} />
        </div>
      </section>

      <div className="flex flex-col items-center font-bold mb-8 my-5">
        To continue, log in to Winyl.
      </div>

      <div className="flex flex-col items-center  ">
        <div className="flex flex-col items-center py-1 mb-2">
          <div id="signin" className="py-1 mb-5">
            {/* {Object.keys(user).length !== 0 && (
            <button className="btn" onClick={(e) => handleSignOut(e)}>
              Sign Out
            </button>
          )} */}
            {user && (
              <div>
                <img src={user.picture} alt={user.name}></img>
                <h3>{user.name}</h3>
              </div>
            )}
          </div>
        </div>

        <hr></hr>

        <TextInput
          type={"text"}
          label={"Email ID or Username"}
          placeholder={"Email ID or Username"}
          value={email}
          setValue={setEmail}
        />
        <TextInput
          type={"password"}
          label={"Password"}
          placeholder={"Password"}
          value={password}
          setValue={setPassword}
        />
        <button
          className="btn mb-2"
          onClick={(e) => {
            Login();
          }}
        >
          LOG IN
        </button>

        <br />

        <hr></hr>

        <div className="flex flex-col items-center py-2 ">
          <div className="font-bold text-xl mb-1 pt-2">
            Don't have an account ?
          </div>
          <Link to="/signup">
            <button className="btn mb-1">SIGN UP</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
