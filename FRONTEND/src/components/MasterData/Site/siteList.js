import { useEffect, useState } from "react";
import { MasterList } from "../MasterList";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import config from "../../../config";

export const SiteList = () => {
  const [list, setList] = useState([]);
  const [headings] = useState(["Site ID", "Site Name", "Email", "Mobile", "Actions"]);
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
    fetch(`${apiUrl}/eCRF-rest-service/site-details`, {
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
    navigate('/siteInfo');
  };

  return (
    <>
      <div className="container pb-4 pt-4">
        <div className="row mb-3">
          <div className="col-6">
            <h4 className="hfw6">Site Details</h4>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={() => navigateToAdd()}>Add Site Data</button>
          </div>
        </div>
        <div className="row">
          <MasterList headers={headings} data={list} type={'site'} onRefresh={() => getList()} />
        </div>
      </div>
    </>
  )

};