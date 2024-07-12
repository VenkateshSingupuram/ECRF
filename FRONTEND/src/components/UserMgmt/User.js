import React, { useEffect, useState } from "react";
import { Form } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../AuthContext";
import Cookies from "js-cookie";
import config from "../../config";

export const User = () => {
  // const [roles] = useState([{ id: 1, name: 'ROLE_DATAENTRY' }, { id: 2, name: 'ROLE_ADMIN' }, { id: 3, name: 'ROLE_REVIEWER' }]);
  const [roles] = useState(['ROLE_DATAENTRY', 'ROLE_ADMIN', 'ROLE_REVIEWER', 'ROLE_SPONSOR']);
  const [userInfo, setUserInfo] = useState({ username: '', password: '', siteId: '', roles: 'Select Role' });
  const [sites, setSites] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { dataa } = useData();
  const { apiUrl } = config;

  useEffect(() => {
    if(id && dataa) {
      setUserInfo(prevUserInfo => ({ ...prevUserInfo, username: dataa.username, siteId: dataa.siteId, roles: dataa.roles && dataa.roles[0].name }));
    }
  }, [id]);

  useEffect(() => {
    getSiteDetails();
  }, []);

  const getSiteDetails = () => {
    const token = Cookies.get('tkn');
    if(!token) {
      navigate('/login');
    }
    fetch(`${apiUrl}/eCRF-rest-service/siteids`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if (!response.ok) {
        setSites([]);
        throw new Error('Request failed with status code ' + response.status);
      }
      return response.json()
    })
      .then((data) => {
        setSites(data);
        // if(data?.length && !id) setUserInfo(prevUserInfo => ({ ...prevUserInfo, siteId: data[0].siteId }));
        if(data?.length && id) setUserInfo(prevUserInfo => ({ ...prevUserInfo, siteId: dataa.siteId }));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    console.log(userInfo)
  }, [userInfo])

  const handleUserSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get('tkn');
    if(!token) {
      navigate('/login');
    }
    if(userInfo.siteId === '' || userInfo.siteId === null || userInfo.siteId === 'Select') {
      alert('Site ID is missing');
      return;
    }
    const reqBody = {
      username: userInfo?.username,
      password: userInfo?.password,
      siteId: userInfo?.siteId,
      roles: [userInfo?.roles]
    };
    if(id) {
      reqBody['id'] = id;
      delete reqBody.password;
    }
    const url = id ? `${apiUrl}/UserAuthentication/api/auth/user/${id}` : `${apiUrl}/UserAuthentication/api/auth/signup`
    fetch(url, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(reqBody)
    }).then((response) => response.json())
      .then((data) => {
        if(data?.error && data.error?.includes('Username is already taken')) {
          alert('Username is already exists');
          return false;
        }
        navigate('/userList');
        alert('User is added successfully!!!');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div className="container pb-4 pt-4">
      <div className='row mb-3'>
        <h4 className="hfw6">{id ? 'Update' : 'Add'} User</h4>
      </div>
      <form onSubmit={handleUserSubmit}>
        <div className="card mb-3 p-5 pt-3">
          <div className='row mb-3'>
            <div className="col-sm-3 col-xs-12">
              <label htmlFor="siteId">User Name</label>
              <input onKeyDown={handleKeyPress} type="text" className="form-control" id="siteId" placeholder="Enter User Name" maxLength={50} required value={userInfo?.username} onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })} />
            </div>
            {
              !id && (
              <div className="col-sm-3">
                <label htmlFor="siteId">Password</label>
                <input onKeyDown={handleKeyPress} type="text" className="form-control" id="siteId" placeholder="Enter Password" maxLength={20} required value={userInfo?.password} onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })} />
              </div>
              )
            }
            <div className="col-sm-3">
              <label htmlFor="siteName">Sites</label>
              <Form.Select required onChange={(e) => setUserInfo({ ...userInfo, siteId: e.target.value }) } value={userInfo.siteId} onKeyDown={handleKeyPress}>
                <option>Select</option>
                {sites && sites.map((option, index) => (
                  <>
                  <option key={index} value={option.siteId}>
                    {option.siteId} - {option.siteName}
                  </option>
                  </>
                ))}
              </Form.Select>
            </div>
            <div className="col-sm-3">
              <label htmlFor="siteName">Roles</label>
              <Form.Select required onChange={(e) => setUserInfo({ ...userInfo, roles: e.target.value })} value={userInfo.roles} onKeyDown={handleKeyPress}>
                {roles.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Save'}</button>
          </div>
        </div>
      </form>
    </div>
  )
};