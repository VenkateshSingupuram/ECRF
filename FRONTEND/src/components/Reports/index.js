import Cookies from 'js-cookie';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from "react-router-dom";
import { Form } from 'react-bootstrap';

import config from '../../config';
import { jwtDecode } from 'jwt-decode';

export const Reports = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();
  const { apiUrl } = config;
  const [reportType, setReportType] = useState("addData");
  const [sites, setSites] = useState([]);
  const role = Cookies.get("role");
  const token = Cookies.get('tkn');
  const [siteId, setSiteId] = useState(null);
  const [subjectId, setSubjectId] = useState(null);

  useEffect(() => {
    if (token) {
      const data = jwtDecode(token);
      if (data && role && (role === 'ROLE_DATAENTRY' || role === 'ROLE_REVIEWER')) {
        setSiteId(data.SiteId);
      }
    }

    if (role && role !== 'ROLE_DATAENTRY' && role !== 'ROLE_REVIEWER') {
      getSiteDetails();
    }
  }, []);

  const handleSearch = () => {
    let queryParams = "";
    const token = Cookies.get('tkn');
    if (!token) {
      navigate('/login');
    }

    // const data = jwtDecode(token);
    
    if(startDate && endDate) {
      queryParams = `startDate=${moment(startDate).format('YYYY-MM-DD')}&endDate=${moment(endDate).format('YYYY-MM-DD')}`
    } else if((!siteId || siteId === '') && (!subjectId || subjectId === '')) {
      alert('Enter fields to proceed');
      return false;
    }
    if(subjectId) {
      queryParams += queryParams.length ? `&subjectId=${subjectId}` : `subjectId=${subjectId}`;
    }
    queryParams += queryParams.length ? `&siteId=${siteId}` : `siteId=${siteId}`;

    const url = reportType === 'addData' ? `${apiUrl}/eCRF-rest-service/export/excel?${queryParams}` : `${apiUrl}/eCRF-rest-service/export/auditexcel?${queryParams}`;

    // const url = reportType === 'addData' ? `${apiUrl}/eCRF-rest-service/export/excel/${moment(startDate).format('YYYY-MM-DD')}/${moment(endDate).format('YYYY-MM-DD')}/${data?.SiteId}` : `${apiUrl}/eCRF-rest-service/export/auditexcel/${moment(startDate).format('YYYY-MM-DD')}/${moment(endDate).format('YYYY-MM-DD')}/${data?.SiteId}`;
    fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/octet-stream'
      },
      responseType: 'blob'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Request failed with status code ' + response.status);
        }
        return response.blob()
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `export_${moment().format('YYYY-MM-DD')}_to_${moment().format('YYYY-MM-DD')}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        setStartDate(null);
        setEndDate(null);
        alert('Report downloaded successfully!');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getSiteDetails = () => {
    const token = Cookies.get('tkn');
    if (!token) {
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
        // if(data?.length) setUserInfo(prevUserInfo => ({ ...prevUserInfo, siteId: data[0].siteId }));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="container pb-4 pt-4">
        <div className="col-6">
          <h4 className="hfw6" style={{ marginBottom: 20 }}>Reports</h4>
        </div>
        <div className='card p-4'>
          <div className='row'>
            <div className='col-sm-4 col-lg-4'>
              <label className="label-txt" htmlFor="study-title">
                Report Type
              </label>
              <Form.Select required onChange={(e) => setReportType(e.target.value)} defaultValue={'addData'}>
                <option key={0} value={'addData'}>Add Data</option>
                <option key={0} value={'audit'}>Audit</option>
              </Form.Select>
            </div>
            <div className="col-sm-4 col-lg-4">
              <label className="label-txt" htmlFor="fromDate">From Date: &nbsp;&nbsp;</label>
              <DatePicker
                wrapperClassName='w-full'
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat={'dd/MMM/yyyy'}
                className="form-control date"
                placeholderText="Select"
              />
            </div>
            <div className="col-sm-4 col-lg-4">
              <label className="label-txt" htmlFor="endDate">To Date: &nbsp;&nbsp; </label>
              <DatePicker
                wrapperClassName='w-full'
                selected={endDate}
                onChange={date => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat={'dd/MMM/yyyy'}
                className="form-control date"
                placeholderText="Select"
              />
            </div>
            <div className='col-sm-4 col-lg-4'>
              <label className="label-txt" htmlFor="study-title">
                Site Id
              </label>
              {
                role === 'ROLE_DATAENTRY' || role === 'ROLE_REVIEWER' ? (
                  <>
                    <input
                      disabled
                      value={siteId}
                      type="text"
                      className="form-control"
                    />
                  </>
                ) : (
                  <>
                    <Form.Select required onChange={(e) => setSiteId(e.target.value)} value={siteId}>
                      <option>Select</option>
                      {sites && sites.map((option, index) => (
                        <>
                          <option key={index} value={option.siteId}>
                            {option.siteId} - {option.siteName}
                          </option>
                        </>
                      ))}
                    </Form.Select>
                  </>
                )
              }
            </div>
            <div className='col-sm-4 col-lg-4'>
              <label className="label-txt" htmlFor="study-title">
                Subject Id
              </label>
              <input
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className='col-sm-4 col-lg-4'>
              {/* <label>&nbsp;</label> */}
              <button className="btn btn-primary" style={{ marginTop: 35 }} onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
