import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import { ThreeCircles } from "react-loader-spinner";

import "./index.css";
import { useData } from "../../AuthContext";
import useLocalStorage from "use-local-storage";
import config from "../../config";

const Login = () => {
  const [showPasswordMessage, setShowPassswordMessage] = useState(false);
  const [dataRole, setDataRole] = useState(null);
  // const [response, setResponse] = useState(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { setLoggedInUsername } = useData();
  const [ ecrfDetails, setEcrfDetails ] = useLocalStorage(`ecrf_details`, "");
  // const [tkn, setTkn] = useState("");
  const { apiUrl } = config;

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
        `${apiUrl}/UserAuthentication/api/auth/signin`,
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
      // // console.log(data);
      setDataRole(data.role);

      if (data.roles && data.roles.length > 0) {
        Cookies.set("tkn", data.accessToken, {
          expires: 1/12,
          // secure: true,
          // priority: "High",
        });
        Cookies.set("role", data.roles[0], {
          expires: 1/12,
          // secure: true,
          // priority: "High",
        });
        navigate("/");
        window.location.reload();
        // setEcrfDetails({username: data.username, siteId: data.siteId, roles: data.roles});
        localStorage.removeItem('ecrf_details');
        localStorage.setItem('ecrf_details', JSON.stringify({username: data.username, siteId: data.siteId, roles: data.roles}));
        if(data) setLoggedInUsername(data.username);
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
      <form className="form-container" onSubmit={submitLogin}>
        <div className="userlogin-txt">
          <h1 className="user-login-txt">User Login</h1>
        </div>
        <div style={{marginTop: 20}}>
          {/* <h1 className="role-txt">Role</h1>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="user-input"
          >
            <option value={"Reviewer"}>Reviewer</option>
            <option value={"Modify"}>Modify</option>
            <option value={"QA"}>QA</option>
          </select> */}
          <h1 className="role-txt">User Name</h1>
          <input
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="user-input"
            type="text"
          />
          <h1 className="role-txt" style={{marginTop: 15}}>Password</h1>
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
            <p className="show-hidepassword" style={{marginLeft: 15, marginRight: 15, marginTop: 15}}>
              {showPasswordMessage ? "Hide Password" : "Show Password"}
            </p>
          </div>
          <div>
            <button className="login-btn">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
