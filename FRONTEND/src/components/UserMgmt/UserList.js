import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MasterList } from "../MasterData/MasterList";
import Cookies from "js-cookie";
import config from "../../config";

export const UserList = () => {
  const [list, setList] = useState([]);
  const [headings] = useState(["User Name", "Site Id", "Roles", "Actions"]);
  const navigate = useNavigate();
  const { apiUrl } = config;

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    const token = Cookies.get('tkn');
    if(!token) {
      navigate('/login');
    }
    fetch(`${apiUrl}/UserAuthentication/api/auth/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => response.json())
      .then((data) => {
        setList(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const navigateToAdd = () => {
    navigate('/userMgmt');
  };

  return (
    <>
      <div className="container pb-4 pt-4">
        <div className="row mb-3">
          <div className="col-6">
            <h4 className="hfw6">User Details</h4>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <button className="btn btn-secondary" onClick={() => navigateToAdd()}>Add User</button>
          </div>
        </div>
        <div className="row">
          <MasterList headers={headings} data={list} type={'user'} onRefresh={() => getList()} />
        </div>
      </div>
    </>
  )

};