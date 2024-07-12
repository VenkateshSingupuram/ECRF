import { useEffect, useState } from "react";
import moment from "moment";
import { AddressInfo } from "../AddressInfo";
import { CommunicationInfo } from "../CommunicationInfo";
import { Notes } from "../Note";
import { UpdatedInfo } from "../UpdatedInfo";
import { SponserInfo } from "./SponserInfo";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../../AuthContext";
import Cookies from "js-cookie";
import config from "../../../config";

export const MasterSponserData = () => {
  const [username, setUsername] = useState("");
  const [sponserInfo, setSponserInfo] = useState({ sponsorCode: '', sponsorName: '', legalName: '' });
  const [addressInfo, setAddressInfo] = useState({ address1: '', address2: '', address3: '', address4: '', city: '', district: '', region: '', zipCode: '', country: '' });
  const [communicationInfo, setCommunicationInfo] = useState({ officeTelephone: '', extension: '', mobileTelephone: '', email: '', website: '' });
  const [notes, setNotes] = useState("");
  const [updatedInfo, setUpdatedInfo] = useState({ createdBy: username, createdOn: moment().format('YYYY-MM-DD HH:mm:ss'), changedBy: username, changedOn: moment().format('YYYY-MM-DD HH:mm:ss') });
  const { id } = useParams();
  const navigate = useNavigate();
  const { dataa } = useData();
  const { apiUrl } = config;

  useEffect(() => {
    let data = localStorage.getItem("ecrf_details");
    if (data) {
      data = JSON.parse(data);
      setUsername(data?.username);
      if (!id) {
        setUpdatedInfo(prevUpdatedInfo => ({ ...prevUpdatedInfo, createdBy: data?.username }));
        setUpdatedInfo(prevUpdatedInfo => ({ ...prevUpdatedInfo, changedBy: data?.username }));
      }
    }
  }, []);

  useEffect(() => {
    if (id && dataa) {
      setSponserInfo(dataa);
      setAddressInfo(dataa?.addressDetails);
      setCommunicationInfo(dataa?.communicationDetails);
      setNotes(dataa?.notes);
      setUpdatedInfo(dataa);
    }
  }, [id]);

  const onSubmitHandle = (e) => {
    e.preventDefault();
    const token = Cookies.get('tkn');
    if (!token) {
      navigate('/login');
    }
    const reqBody = {
      sponsorCode: sponserInfo.sponsorCode,
      sponsorName: sponserInfo.sponsorName,
      legalName: sponserInfo.legalName,
      addressDetails: addressInfo,
      communicationDetails: communicationInfo,
      notes: notes,
      changedBy: username,
      changedOn: moment().format('YYYY-MM-DD HH:mm:ss'),
      createdBy: id ? dataa.createdBy : updatedInfo.createdBy,
      createdOn: id ? dataa.createdOn : updatedInfo.createdOn
    };
    if (id) reqBody['id'] = id;
    const url = id ? `${apiUrl}/eCRF-rest-service/sponsor-details/${id}` : `${apiUrl}/eCRF-rest-service/sponsor-details`;
    fetch(url, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(reqBody)
    }).then((response) => response.json())
      .then((data) => {
        navigate('/sponserList');
        alert('Sponsor Data is Saved Successfully');
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
        <h4 className="hfw6" style={{ marginBottom: 20 }}> {id ? 'Update' : 'Add'} Sponsor Details</h4>
      </div>
      <form onSubmit={onSubmitHandle}>
        <div className="card p-5">
          <SponserInfo sponserInfo={sponserInfo} setSponserInfo={setSponserInfo} handleKeyPress={handleKeyPress} />
          <AddressInfo addressInfo={addressInfo} setAddressInfo={setAddressInfo} handleKeyPress={handleKeyPress} />
          <CommunicationInfo communicationInfo={communicationInfo} setCommunicationInfo={setCommunicationInfo} handleKeyPress={handleKeyPress} />
          <div className="row mb-3">
            <div className="col-12">
              <Notes notes={notes} setNotes={setNotes} handleKeyPress={handleKeyPress} />
            </div>
            {id && (
              <div className="col-12">
                <UpdatedInfo updatedInfo={updatedInfo} setUpdatedInfo={setUpdatedInfo} />
              </div>
            )}
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Save'}</button>
          </div>
        </div>
      </form>
    </div>
  );
}; 