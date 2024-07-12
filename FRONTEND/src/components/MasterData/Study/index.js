import React, { useEffect, useState } from "react";
import moment from "moment";
import { StudyInfo } from "./StudyInfo";
import { UpdatedInfo } from "../UpdatedInfo";
import { useData } from "../../../AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import config from "../../../config";

export const MasterStudyData = () => {
  const [username, setUsername] = useState("");
  const [studyInfo, setStudyInfo] = useState({ studyId: '', sponsorName: '', croName: '', regulatoryAgency: '', studyTitle: '', studyDesign: '', phase: 'Phase I', defaultStudyDesign: '' });
  const [updatedInfo, setUpdatedInfo] = useState({createdBy: username, createdOn: moment().format('YYYY-MM-DD HH:mm:ss'), changedBy: username, changedOn: moment().format('YYYY-MM-DD HH:mm:ss')});
  const { id } = useParams();
  const navigate = useNavigate();
  const { dataa } = useData();
  const { apiUrl } = config;

  useEffect(() => {
    let data = localStorage.getItem("ecrf_details");
    if(data) {
      data = JSON.parse(data);
      setUsername(data?.username);
      if(!id) {
        setUpdatedInfo(prevUpdatedInfo => ({ ...prevUpdatedInfo, createdBy: data?.username }));
        setUpdatedInfo(prevUpdatedInfo => ({ ...prevUpdatedInfo, changedBy: data?.username }));
      }
    }
  }, []);

  useEffect(() => {
    if(id && dataa) {
      updateValues();
      setUpdatedInfo(dataa);
    }
  }, [id]);

  const updateValues = () => {
    setStudyInfo(prevStudyInfo => ({ ...prevStudyInfo, studyId: dataa.studyId }));
    setStudyInfo(prevStudyInfo => ({ ...prevStudyInfo, sponsorName: dataa.sponsorName }));
    setStudyInfo(prevStudyInfo => ({ ...prevStudyInfo, croName: dataa.croName }));
    setStudyInfo(prevStudyInfo => ({ ...prevStudyInfo, regulatoryAgency: dataa.regulatoryAgency }));
    setStudyInfo(prevStudyInfo => ({ ...prevStudyInfo, studyTitle: dataa.studyTitle }));
    setStudyInfo(prevStudyInfo => ({ ...prevStudyInfo, studyDesign: dataa.studyDesign }));
    setStudyInfo(prevStudyInfo => ({ ...prevStudyInfo, phase: dataa.phase }));
    setStudyInfo(prevStudyInfo => ({ ...prevStudyInfo, defaultStudyDesign: dataa.defaultStudyDesign }));
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();
    const token = Cookies.get('tkn');
    if(!token) {
      navigate('/login');
    }
    if(studyInfo?.sponsorName === '' || !studyInfo?.sponsorName || studyInfo?.croName === '' || !studyInfo?.croName || studyInfo?.croName === 'Select' || studyInfo?.sponsorName === 'Select') {
      alert('Sponsor Name/CRO Name is missing');
      return;
    }
    const reqBody = {
      studyId: studyInfo.studyId,
      sponsorName: studyInfo.sponsorName,
      croName: studyInfo.croName,
      regulatoryAgency: studyInfo.regulatoryAgency,
      studyTitle: studyInfo.studyTitle,
      studyDesign: studyInfo.studyDesign,
      phase: studyInfo.phase,
      defaultStudyDesign: studyInfo.defaultStudyDesign === 'default' ? 'default' : null,
      changedBy: username,
      changedOn: moment().format('YYYY-MM-DD HH:mm:ss'),
      createdBy: id ? dataa.createdBy : updatedInfo.createdBy,
      createdOn: id ? dataa.createdOn : updatedInfo.createdOn
    };
    if(id) reqBody['id'] = id;
    const url = id ? `${apiUrl}/eCRF-rest-service/project-details/${id}` : `${apiUrl}/eCRF-rest-service/project-details`;
    fetch(url, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(reqBody)
    }).then((response) => response.json())
    .then((data) => {
      navigate('/studyList');
      alert('Study Data is Saved Successfully');
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
      <div className="col-6">
        <h4 className="hfw6" style={{marginBottom: 20}}>{id ? 'Update' : 'Add'} Study Details</h4>
      </div>
      <form onSubmit={onSubmitHandle}>
        <div className="card p-5">
          <StudyInfo studyInfo={studyInfo} setStudyInfo={setStudyInfo} handleKeyPress={handleKeyPress} />
          {id && (
            <UpdatedInfo updatedInfo={updatedInfo} setUpdatedInfo={setUpdatedInfo} />
          )}
          <div className="d-flex justify-content-end mt-3">
            <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Save'}</button>
          </div>
        </div>
      </form>
    </div>
  )
};