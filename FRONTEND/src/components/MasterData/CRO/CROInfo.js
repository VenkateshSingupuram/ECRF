import React from 'react';

export const CROInfo = ({croInfo, setCROInfo, handleKeyPress}) => {
  return (
    <div className="card mb-3 p-5 pt-3">
      <div className='row'>
        <h5 className='hfw6'>General Data</h5>
      </div>
      <hr />
      <div className='row'>
        <div className="col-sm-3 form-group">
          <label htmlFor="croName">CRO Code</label>
          <input onKeyDown={handleKeyPress} type="number" className="form-control" id="croName" placeholder="Enter CRO Code" maxLength={10} required value={croInfo?.croCode} onChange={(e) => {
            if(e.target.value?.length > 10) {
              return false;
            }
            setCROInfo({...croInfo, croCode: e.target.value})}
          } />
        </div>
        <div className="col-sm-4 form-group">
          <label htmlFor="instituteName">CRO Name</label>
          <input onKeyDown={handleKeyPress} type="text" className="form-control" id="instituteName" placeholder="Enter CRO Name" maxLength={100} required value={croInfo?.croName} onChange={(e) => setCROInfo({...croInfo, croName: e.target.value})} />
        </div>
        <div className="col-sm-5 form-group">
          <label htmlFor="croId">Legal Name (as per license)</label>
          <input onKeyDown={handleKeyPress} type="text" className="form-control" id="croId" placeholder="Enter Legal Name" maxLength={100} value={croInfo?.legalName} onChange={(e) => setCROInfo({...croInfo, legalName: e.target.value})} />
        </div>
      </div>
    </div>
  );
};