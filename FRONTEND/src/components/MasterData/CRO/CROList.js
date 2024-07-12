import { useEffect, useState } from "react";
import { MasterList } from "../MasterList";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import config from "../../../config";

export const CROList = () => {
  const [list, setList] = useState([]);
  const [headings] = useState(["CRO Code", "CRO Name", "Email", "Mobile", "Actions"]);
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
    fetch(`${apiUrl}/eCRF-rest-service/cro-details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => response.json())
      .then((data) => {
        // console.log('data', data);
        setList(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const navigateToAdd = () => {
    navigate('/croInfo');
  };

  return (
    <>
      <div className="container pb-4 pt-4">
        <div className="row mb-3">
          <div className="col-6">
            <h4 className="hfw6">CRO Details</h4>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={() => navigateToAdd()}>Add CRO Data</button>
          </div>
        </div>
        <div className="row">
          <MasterList headers={headings} data={list} type={'cro'} onRefresh={() => getList()} />
        </div>
      </div>
    </>
  )

};