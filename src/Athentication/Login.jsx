// Hooks
import React, { useEffect, useState } from "react";
import "./Authentication.css";
import loginbg from "../Images/LoginBG.jpeg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "./firebase/fbConfig";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [showpass, setshowPass] = useState(false);

  const navigate = useNavigate();
  const [loginflag, setloginflag] = useState(false);

  //login With FireBase
  const handleLogin = () => {
    const auth = getAuth(firebaseApp);
    console.log(auth);

    signInWithEmailAndPassword(auth, name, pass)
      .then((userCredential) => {
        console.log("kjlkopo", loginflag);
        const user = userCredential.user;
        localStorage.setItem("Authorization", JSON.stringify(user.accessToken));
        localStorage.setItem("user", JSON.stringify(user.email));
        localStorage.setItem("userData", JSON.stringify(user));
        setloginflag(true);
        navigate("/");
        window.location.reload();

        console.log(user);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  };

  useEffect(() => {
    if (loginflag) {
      navigate("/");
      console.log("kjlkopo", loginflag);
    }
  }, [loginflag]);
  // alert("tt");
  return (
    <>
      <section
        className="LoginPage"
        style={{ backgroundImage: `url(${loginbg})` }}
      >
        <div className="LoginBgOverlay" />
        <div className="LoginForm">
          <div className="LoginTop">
            <h5 className="LoginHead">Sign in</h5>
          </div>
          <div className="LoginBtm">
            <form action="">
              <div className="form-group">
                <input
                  onChange={(e) => setName(e.target.value)}
                  name="email"
                  id="exampleEmail"
                  placeholder="Email here..."
                  type="email"
                  className="form-control"
                  // defaultValue="smart@gmail.com"
                />
              </div>
              <div className="form-group pass_input">
                <input
                  onChange={(e) => setPass(e.target.value)}
                  name="password"
                  id="examplePassword"
                  placeholder="Password here..."
                  type={showpass ? "text" : "password"}
                  className="form-control"
                  // defaultValue={12345678}
                />
                <div
                  className="eye_icon"
                  onClick={() => {
                    setshowPass(!showpass);
                  }}
                >
                  <i className="fa-solid fa-eye"></i>
                </div>
              </div>
              <div className="form-group">
                <input type="Checkbox" />
                <span className="LoginRem">Remember Me</span>
              </div>
            </form>
            <button
              className="LoginBtn"
              onClick={() => handleLogin()}
              type="submit"
            >
              SIGN IN
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
