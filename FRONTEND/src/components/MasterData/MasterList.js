import React, { useState } from "react";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useData } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import config from "../../config";
import Cookies from "js-cookie";

export const MasterList = ({ headers, data, type, onRefresh }) => {
  const { setInfo } = useData();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { apiUrl } = config;
  const [ information, setInformation ] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = (item) => {
    setInformation(item);
    setShowModal(true);
  };

  const updatedInfo = (item) => {
    setInfo(item);
    if (type === 'site') navigate(`/siteInfo/${item.id}`);
    if (type === 'cro') navigate(`/croInfo/${item.id}`);
    if (type === 'sponsor') navigate(`/sponserInfo/${item.id}`);
    if (type === 'study') navigate(`/studyInfo/${item.id}`);
    if (type === 'user') navigate(`/userMgmt/${item.id}`);
  };

  const deleteData = () => {
    const token = Cookies.get('tkn');
    if(!token) {
      navigate('/login');
    }
    let url = '';
    if(type === 'user') url = `${apiUrl}/UserAuthentication/api/auth/user/${information?.id}`;
    else if(type === 'site') url = `${apiUrl}/eCRF-rest-service/site-details/${information.id}`;
    else if(type === 'cro') url = `${apiUrl}/eCRF-rest-service/cro-details/${information.id}`;
    else if(type === 'sponsor') url = `${apiUrl}/eCRF-rest-service/sponsor-details/${information.id}`;
    else if(type === 'study') url = `${apiUrl}/eCRF-rest-service/project-details/${information.id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Request failed with status code ' + response.status);
      }
      return response.text()
    })
      .then((data) => {
        // console.log('Successfully deleted!!!');
        alert('Successfully deleted!!!');
        handleClose();
        onRefresh();
      })
      .catch((err) => {
        console.error(err);
      });

  };

  return (
    <>
    <div className="table-responsive">
      <table className="table table-bordered text-center">
        <thead class="table-light">
          <tr>
            {headers.map(item => (
              <React.Fragment key={item?.id}>
                <th>{item}</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              {type === 'site' && (
                <>
                  <td>{item.siteId}</td>
                  <td>{item.siteName}</td>
                  <td>{item.communicationDetails?.email}</td>
                  <td>{item.communicationDetails?.mobileTelephone}</td>
                </>
              )}
              {type === 'cro' && (
                <>
                  <td>{item.croCode}</td>
                  <td>{item.croName}</td>
                  <td>{item.communicationDetails?.email}</td>
                  <td>{item.communicationDetails?.mobileTelephone}</td>
                </>
              )}
              {type === 'sponsor' && (
                <>
                  <td>{item.sponsorCode}</td>
                  <td>{item.sponsorName}</td>
                  <td>{item.communicationDetails?.email}</td>
                  <td>{item.communicationDetails?.mobileTelephone}</td>
                </>
              )}
              {type === 'study' && (
                <>
                  <td>{item.studyId}</td>
                  <td>{item.sponsorName}</td>
                  <td>{item.croName}</td>
                  <td>{item.regulatoryAgency}</td>
                  <td>{item.studyDesign}</td>
                  <td>{item.phase}</td>
                </>
              )}
              {type === 'user' && (
                <>
                  <td>{item.username}</td>
                  <td>{item.siteId}</td>
                  <td>{item.roles[0]?.name}</td>
                </>
              )}
              <td style={{display: 'inline-flex'}}>
                <span style={icons_borders}>
                  <BorderColorIcon fontSize="small" onClick={() => updatedInfo(item)} title="Edit" />
                </span>
                  <span style={icons_borderss}>
                    <DeleteIcon fontSize="small" onClick={() => handleShow(item)} />
                  </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {type.toUpperCase()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure, you want to delete the {type.toUpperCase()}?</Modal.Body>
        <Modal.Footer>
          <button variant="secondary" style={delete_btn} onClick={handleClose}>
            Close
          </button>
          <button variant="primary" style={delete_btn} onClick={() => deleteData()}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
const icons_borders = {
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 30,
  height: 30,
  border: '1px solid #000',
  borderRadius: '20%',
  marginTop: 5
}

const icons_borderss = {
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 30,
  height: 30,
  border: '1px solid #000',
  borderRadius: '20%',
  marginTop: 5,
  marginLeft: 10
}

const delete_btn = {
  padding: 5,
  borderRadius: 5,
  color: 'white'
}