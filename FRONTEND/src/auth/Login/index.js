import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import { ThreeCircles } from "react-loader-spinner";
import "./index.css";
import { apiUrl } from './../../config';

const Login = () => {
  const [showPasswordMessage, setShowPassswordMessage] = useState(false);
  const [dataRole, setDataRole] = useState(null);
  // const [response, setResponse] = useState(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // const [tkn, setTkn] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    // <Modify dataRole={dataRole} />;
    if (dataRole) {
      navigate("/");
    }
  }, [dataRole]);
  
  const submitLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${apiUrl}/UserAuthentication/authenticate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            password,
          }),
        }
      );

      const data = await response.json();
      // // console.log(data.role);
      // console.log(data);
      setDataRole(data.role);

      if (data.role !== undefined) {
        Cookies.set("tkn", data.token, {
          expires: 1,
          secure: true,
          priority: "High",
        });
        Cookies.set("role", data.role, {
          expires: 1,
          secure: true,
          priority: "High",
        });
        setErrMsg("");
      } else {
        setErrMsg("*username and password didn't match");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-container">
      <img
        className="login-img"
        src="https://airproductionservice.com/wp-content/uploads/2021/05/Login.jpg"
        alt="login"
      />
      {/* <form className="form-container" onSubmit={submitLogin}>
        <div className="userlogin-txt">
          <h1 className="user-login-txt">User Login</h1>
        </div>
        <div>
          <h1 className="role-txt">User Name</h1>
          <input
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="user-input"
            type="text"
          />
          <h1 className="role-txt">Password</h1>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="user-input"
            type={showPasswordMessage ? "text" : "password"}
          />
          <div className="err-msg-container">
            <p className="err-msg">{errMsg}</p>
          </div>
          <div className="showpassword-checkbox">
            <input
              onChange={(e) => setShowPassswordMessage(!showPasswordMessage)}
              checked={showPasswordMessage}
              type="checkbox"
            />
            <p className="show-hidepassword">
              {showPasswordMessage ? "Hide Password" : "Show Password"}
            </p>
          </div>
          <div>
            <button className="login-btn">Login</button>
          </div>
        </div>
      </form> */}
      <form className="card p-5" onSubmit={submitLogin}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">User Name</label>
          <input
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="form-control"
            type="text"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            type={showPasswordMessage ? "text" : "password"}
          />
          <div className="err-msg-container">
            <p className="err-msg">{errMsg}</p>
          </div>
        </div>
        <div class="mb-3 form-check">
        <input
              onChange={(e) => setShowPassswordMessage(!showPasswordMessage)}
              checked={showPasswordMessage}
              type="checkbox"
            />
            <p className="show-hidepassword">
              {showPasswordMessage ? "Hide Password" : "Show Password"}
            </p>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Login;
