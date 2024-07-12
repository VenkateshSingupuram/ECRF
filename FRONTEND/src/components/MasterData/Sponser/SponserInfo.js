import React from 'react';

export const SponserInfo = ({sponserInfo, setSponserInfo, handleKeyPress}) => {
  return (
    <div className="card mb-3 p-5 pt-3">
      <div className='row'>
        <h5 className='hfw6'>General Data</h5>
      </div>
      <hr />
      <div className='row'>
        <div className="col-3 form-group">
          <label htmlFor="sponserName">Sponsor Code</label>
          <input onKeyDown={handleKeyPress} type="number" className="form-control" id="sponserName" placeholder="Enter Sponsor Code" maxLength={10} required value={sponserInfo?.sponsorCode} onChange={(e) => {
            if(e.target.value?.length > 10) {
              return false;
            }
            setSponserInfo({...sponserInfo, sponsorCode: e.target.value})} 
            }/>
        </div>
        <div className="col-4 form-group">
          <label htmlFor="instituteName">Sponsor Name</label>
          <input onKeyDown={handleKeyPress} type="text" className="form-control" id="instituteName" placeholder="Enter Sponsor Name" maxLength={100} required value={sponserInfo?.sponsorName} onChange={(e) => setSponserInfo({...sponserInfo, sponsorName: e.target.value})} />
        </div>
        <div className="col-5 form-group">
          <label htmlFor="sponserId">Legal Name (as per license)</label>
          <input onKeyDown={handleKeyPress} type="text" className="form-control" id="sponserId" placeholder="Enter Legal Name" maxLength={100} value={sponserInfo?.legalName} onChange={(e) => setSponserInfo({...sponserInfo, legalName: e.target.value})} />
        </div>
      </div>
    </div>
  );
};