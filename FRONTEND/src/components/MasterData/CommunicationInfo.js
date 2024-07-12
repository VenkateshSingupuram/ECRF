import React from 'react';

export const CommunicationInfo = ({communicationInfo, setCommunicationInfo, handleKeyPress}) => {
  return (
    <div className="card mb-3 p-5 pt-3">
      <div className='row'>
        <h5 className='hfw6'>Communication</h5>
      </div>
      <hr />
      <div className='row mb-3'>
        <div className="col-6 form-group">
          <label htmlFor="siteId">Office Telephone</label>
          <input onKeyDown={handleKeyPress} type="number" className="form-control" id="siteId" placeholder="Enter Office Telephone" maxLength={20} required value={communicationInfo?.officeTelephone} onChange={(e) => {
            if(e.target.value?.length > 20) {
              return false;
            }
            setCommunicationInfo({...communicationInfo, officeTelephone: e.target.value})}
            } />
        </div>
        <div className="col-6 form-group">
          <label htmlFor="siteName">Extension</label>
          <input onKeyDown={handleKeyPress} type="number" className="form-control" id="siteName" placeholder="Enter Extension" maxLength={10} value={communicationInfo?.extension} onChange={(e) => {
            if(e.target.value?.length > 10) {
              return false;
            }
            setCommunicationInfo({...communicationInfo, extension: e.target.value})}
           } />
        </div>
      </div>
      <div className='row'>
        <div className="col-4 form-group">
          <label htmlFor="siteId">Mobile Telephone</label>
          <input onKeyDown={handleKeyPress} type="number" className="form-control" id="siteId" placeholder="Enter Mobile Telephone" maxLength={20} required value={communicationInfo?.mobileTelephone} onChange={(e) => {
            if(e.target.value?.length > 20) {
              return false;
            }
            setCommunicationInfo({...communicationInfo, mobileTelephone: e.target.value})}
            } />
        </div>
        <div className="col-4 form-group">
          <label htmlFor="siteName">Email</label>
          <input onKeyDown={handleKeyPress} type="text" className="form-control" id="siteName" placeholder="Enter Email" maxLength={60} required value={communicationInfo?.email} onChange={(e) => setCommunicationInfo({...communicationInfo, email: e.target.value})} />
        </div>
        <div className="col-4 form-group">
          <label htmlFor="instituteName">Website</label>
          <input onKeyDown={handleKeyPress} type="text" className="form-control" id="instituteName" placeholder="Enter Website" maxLength={60} required value={communicationInfo?.website} onChange={(e) => setCommunicationInfo({...communicationInfo, website: e.target.value})} />
        </div>
      </div>
    </div>
  );
};