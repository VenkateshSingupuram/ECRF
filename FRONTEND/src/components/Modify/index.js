import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import Cookies from "js-cookie";
import "./index.css";
import config from "../../config";
import { jwtDecode } from "jwt-decode";

const Modify = () => {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const navigate = useNavigate();
  const { apiUrl } = config;

  let role = Cookies.get("role");
  if (role === "ROLE_DATAENTRY") {
    role = "ROLE_DATAENTRY";
  }

  useEffect(() => {
   const token = Cookies.get('tkn');
   if(!token) {
    navigate('/login');
   } 
  }, []);

  useEffect(() => {
    const token = Cookies.get('tkn');
    if(!token) {
      navigate('/login');
    }
    const data = jwtDecode(token);
    fetch(
      `${apiUrl}/eCRF-rest-service/getRecentRecords?roleName=${role}&siteId=${data?.SiteId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // // console.log(data);
        if (Array.isArray(data)) {
          setData(data);
          setDisplayData(data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [role]);

  const [fromDateValue, setFromDateValue] = useState("");
  const [toDateValue, setToDateValue] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [resets, setResets] = useState(false);
  const [errMSg, setErrorMsg] = useState(null);
  const tkn = Cookies.get("tkn");
  if (tkn === undefined) {
    return navigate("/login");
  }

  const sendDataHandle = (id) => {
    // console.log(id, "id");
    // setIdSend(id);
    // // console.log(idSend, "=idSend");
    // navigate(`/values:${id}`);
  };

  const searchButton = () => {
    if (fromDateValue === "" || toDateValue === "") {
      alert("Pleas provide two fields");
      return;
    }
    const token = Cookies.get('tkn');
    if(!token) {
      navigate('/login');
    }
    const data = jwtDecode(token);
    fetch(
      `${apiUrl}/eCRF-rest-service/findRecordOnDate?fromDate=${moment(fromDateValue).format('YYYY-MM-DD')} 00:00:00&toDate=${moment(toDateValue).format('YYYY-MM-DD')} 23:59:59&roleName=${role}&siteId=${data?.SiteId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // console.log(data);
          setFilterData(data);
          setDisplayData(data);
        } else if (data.error) {
          setErrorMsg(data.error);
          setDisplayData([]);
        }
      })
      .catch((err) => {
        setDisplayData([]);
        console.error(err);
      });
    // setFromDateValue("");
    // setToDateValue("");
  };
  let rolename;
  if (role === "qa") {
    rolename = "QA";
  } else if (role === "ROLE_DATAENTRY") {
    rolename = "DATA ENTRY";
  } else if (role === "ROLE_REVIEWER") {
    rolename = "Reviewer";
  }
  const resetButton = () => {
    setDisplayData(data);
    setFilterData([]);
    setFromDateValue("");
    setToDateValue("");
    setErrorMsg(null);
  };

  const navigateTo = (id) => {
    navigate(`/values/${id}`);
  }; 
  // // console.log(errMSg);
  return (
    <div className="container">
      <div>
        <div className='card p-4'>
          <div className='row'>
            <div className="col-sm-4 col-lg-4 col-xs-12 col-md-6 form-group">
              <label htmlFor="fromDate">From Date: &nbsp;&nbsp;</label>
              <DatePicker
                selected={fromDateValue}
                onChange={date => { setFromDateValue(date); setFilterData([]); }}
                selectsStart
                startDate={fromDateValue}
                endDate={toDateValue}
                className="form-control date"
                placeholderText="Select"
              />
            </div>
            <div className="col-sm-4 col-lg-4 col-xs-12 col-md-6 form-group">
              <label htmlFor="endDate">To Date: &nbsp;&nbsp; </label>
              <DatePicker
                selected={toDateValue}
                onChange={date => { setToDateValue(date); setFilterData([]); }}
                selectsEnd
                startDate={fromDateValue}
                endDate={toDateValue}
                minDate={fromDateValue}
                className="form-control date"
                placeholderText="Select"
              />
            </div>
            <div className='col-sm-4 col-lg-4 col-xs-12 col-md-6 form-group'>
              <div className="d-flex justify-content-end" style={{marginTop: 35}}>
                <button className="btn btn-primary" onClick={resetButton} style={{ marginRight: 20 }}>Reset</button>
                <button className="btn btn-primary" onClick={searchButton}>Search</button>
              </div>
            </div>
          </div>
        </div>

        <div className="row" style={{marginTop: 15}}>
          <div>
            <table className="table table-bordered text-center">
              <thead class="table-light">
                <tr>
                  <th>Site ID</th>
                  <th>Subject ID</th>
                  <th>Status</th>
                  <th>Created On</th>
                  {/* <th>Nationality</th> */}
                </tr>
              </thead>
              <tbody>
                <>
                  {displayData.map((each) => (
                    <>
                      <tr key={each.id}>
                        <td>{each.siteId}</td>
                        <td style={{cursor: 'pointer', color: 'blue'}} onClick={() => navigateTo(each.id)}>{each?.subjectId}</td>
                        <td>{each?.status}</td>
                        {/* <td>{each?.createDate}</td> */}
                        <td>
                          {/* {each?.section14?.createdOn} */}
                          <span>{moment(each?.section14?.createdOn, 'YYYY-MM-DD HH:mm:ss').format('MMMM Do YYYY, h:mm:ss a')}</span>
                        </td>
                      </tr>
                    </>
                  ))}
                </>
              </tbody>
            </table>
          </div>
        </div>
        {displayData.length === 0 && (
          <div className="noData-center">
            <h1>No Records Found for this Role</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modify;
