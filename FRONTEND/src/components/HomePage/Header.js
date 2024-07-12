import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import userIcon from './../../user-icon.jpg';

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [data, setData] = useState(localStorage.getItem("ecrf_details") || null);

  useEffect(() => {
    let userDetails = typeof data === 'string' ? JSON.parse(data) : data;
    setUsername(userDetails?.username);
    let role = userDetails?.roles && userDetails?.roles[0];
    setRole(role && role.replace(/^ROLE_/i, ""));
  }, [data]);

  const logout = () => {
    Cookies.remove("tkn");
    Cookies.remove("role");
    localStorage.removeItem('ecrf_details');
    setData(null);
    setUsername(null);
    navigate("/login");
  };

  return (
    <>
      <div className="header-nav">
        <div className="row">
          <div className="col d-flex align-items-center header-wrapper">
          </div>
          <div className="col-auto" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <div style={{ marginRight: 10 }}>
              <span style={{ fontWeight: 600 }}>Role: {role}</span>
            </div>
            <div className="verticalLine"></div>
            <div style={{ marginRight: 10 }}>
              <span style={{ fontWeight: 600 }}>User: {username}</span>
            </div>
            {/* <div className="btn-group">
              <a className="profile-pic-dropdown">
                <div className="profile_pic">
                  <img src={userIcon} alt="" />
                </div>
              </a>
            </div> */}
            <div>
              <span style={{ cursor: 'pointer', marginLeft: 15 }} onClick={() => logout()} title='Logout'><LogoutIcon /></span>
            </div>
          </div>
        </div>
      </div>
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light" style={header}>
        <div className='d-flex justify-content-between' style={{width: '100%'}}>
          <div>
          </div>
            <div className="d-flex justify-content-end">
              <span>{username}</span>
              <span style={{cursor: 'pointer', marginLeft: 15}} onClick={() => logout()} title='Logout'><LogoutIcon /></span>
            </div>
        </div>
      </nav> */}
    </>
  );
}

const header = {
  padding: 30,
  marginBottom: 0
}

export default Header;