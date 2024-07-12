import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import config from '../../../config';

export const StudyInfo = ({ studyInfo, setStudyInfo, handleKeyPress }) => {
  const [sponserNames, setSponserNames] = useState([]);
  const [croNames, setCroNames] = useState([]);
  const [phases] = useState(["Phase I", "Phase II", "Phase III", "Phase IV"]);
  const navigate = useNavigate();
  const { apiUrl } = config;

  useEffect(() => {
    getCros();
    getSponsors();
  }, []);

  const getCros = () => {
    const token = Cookies.get('tkn');
    if (!token) {
      navigate('/login');
    }
    fetch(`${apiUrl}/eCRF-rest-service/cros`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if (!response.ok) {
        setCroNames([]);
        throw new Error('Request failed with status code ' + response.status);
      }
      return response.json()
    })
      .then((data) => {
        setCroNames(data);
        // if (data?.length) setStudyInfo(prevStudyInfo => ({ ...prevStudyInfo, croName: data[0].croName }));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getSponsors = () => {
    const token = Cookies.get('tkn');
    if (!token) {
      navigate('/login');
    }
    fetch(`${apiUrl}/eCRF-rest-service/sponsors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if (!response.ok) {
        setSponserNames([]);
        throw new Error('Request failed with status code ' + response.status);
      }
      return response.json()
    })
      .then((data) => {
        setSponserNames(data);
        // if (data?.length) setStudyInfo(prevStudyInfo => ({ ...prevStudyInfo, sponsorName: data[0].sponsorName }));
      })
      .catch((err) => {
        setSponserNames([]);
        console.error(err);
      });
  };

  return (
    <>
      <div className="card mb-3 p-5 pt-3">
        <div className='row mb-3'>
          <div className="col-4 form-group">
            <label htmlFor="siteId">Study ID</label>
            <input onKeyDown={handleKeyPress} type="text" className="form-control" id="siteId" placeholder="Enter Study ID" maxLength={10} required value={studyInfo?.studyId} onChange={(e) => {
              if (/^[a-zA-Z0-9]*$/.test(e.target.value)) {
                setStudyInfo({ ...studyInfo, studyId: e.target.value })
              }
              if(e.target.value?.length > 10) {
                return false;
              }
              setStudyInfo({ ...studyInfo, studyId: e.target.value })}
            } />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="siteName">Sponsor Name</label>
            <Form.Select required onChange={(e) => setStudyInfo({ ...studyInfo, sponsorName: e.target.value })} value={studyInfo?.sponsorName} onKeyDown={handleKeyPress}>
              <option>Select</option>
              {sponserNames && sponserNames.map((option, index) => (
                <>
                  <option key={index} value={option.sponsorName}>
                    {option.sponsorName}
                  </option>
                </>
              ))}
            </Form.Select>
          </div>
          <div className="col-4 form-group">
            <label htmlFor="siteId">CRO Name</label>
            <Form.Select required onChange={(e) => setStudyInfo({ ...studyInfo, croName: e.target.value })} value={studyInfo?.croName} onKeyDown={handleKeyPress}>
                <option>Select</option>
              {croNames && croNames.map((option, index) => (
                <>
                  <option key={index} value={option.croName}>
                    {option.croName}
                  </option>
                </>
              ))}
            </Form.Select>
          </div>
          <div className="col-12 form-group mt-3">
            <label htmlFor="siteName">Regulatory Agency</label>
            <input onKeyDown={handleKeyPress} type="text" className="form-control" id="siteName" placeholder="Enter Regulatory Agency" maxLength={40} required value={studyInfo?.regulatoryAgency} onChange={(e) => setStudyInfo({ ...studyInfo, regulatoryAgency: e.target.value })} style={{width: 250}} />
          </div>
        </div>
        <div className='row mb-3'>
          <div className="col-12 form-group">
            <label htmlFor="siteId">Study Title</label>
            <textarea onKeyDown={handleKeyPress} type="text" className="form-control" id="siteId" placeholder="Enter Study Title" maxLength={200} required value={studyInfo?.studyTitle} onChange={(e) => setStudyInfo({ ...studyInfo, studyTitle: e.target.value })} rows={2}></textarea>
          </div>
        </div>
        <div className='row mb-3'>
          <div className="col-4 form-group">
            <label htmlFor="siteId">Study Design</label>
            <input onKeyDown={handleKeyPress} type="text" className="form-control" id="siteId" placeholder="Enter Study Design" maxLength={20} required value={studyInfo?.studyDesign} onChange={(e) => setStudyInfo({ ...studyInfo, studyDesign: e.target.value })} />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="siteName">Phase</label>
            <Form.Select required onChange={(e) => setStudyInfo({ ...studyInfo, phase: e.target.value })} value={studyInfo?.phase} onKeyDown={handleKeyPress}>
              {phases.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="col-4 form-group mt-4">
            <Form.Check
              type="checkbox"
              label="Default"
              value={'sDesign'}
              checked={studyInfo?.defaultStudyDesign === 'default'}
              onChange={(e) => {
                const newValue = e.target.checked ? 'default' : null;
                setStudyInfo({ ...studyInfo, defaultStudyDesign: newValue })
              }}
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>
      </div>
    </>
  )
};