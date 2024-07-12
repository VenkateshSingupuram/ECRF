import React from 'react';

export const SiteInfo = ({siteInfo, setSiteInfo, handleKeyPress}) => {
  return (
    <div className="card mb-3 p-5 pt-3">
      <div className='row'>
        <h5 className='hfw6'>General Data</h5>
      </div>
      <hr />
      <div className='row mb-3'>
        <div className="col-6 form-group">
          <label htmlFor="siteId">Site ID</label>
          <input onKeyDown={handleKeyPress} type="text" className="form-control" id="siteId" placeholder="Enter Site ID" maxLength={4} required value={siteInfo?.siteId} onChange={(e) => {
            const { value } = e.target;
            // Only allow alphabets (uppercase and lowercase) using regex
            // const newValue = value.replace(/[^A-Za-z]/gi, '');
            if(value && value.length > 4) {
              return false;
            }
            setSiteInfo({...siteInfo, siteId: value})}
            } />
        </div>
        <div className="col-6 form-group">
          <label htmlFor="siteName">Site Name</label>
          <input onKeyDown={handleKeyPress} type="text" className="form-control" id="siteName" placeholder="Enter Site Name" maxLength={100} required value={siteInfo?.siteName} onChange={(e) => setSiteInfo({...siteInfo, siteName: e.target.value})} />
        </div>
      </div>
      <div className='row'>
        <div className="col-6 form-group">
          <label htmlFor="siteId">Legal Site Name (as per license)</label>
          <input onKeyDown={handleKeyPress} type="text" className="form-control" id="siteId" placeholder="Enter Legal Site Name" maxLength={100} value={siteInfo?.legalSiteName} onChange={(e) => setSiteInfo({...siteInfo, legalSiteName: e.target.value})} />
        </div>
        <div className="col-3 form-group">
          <label htmlFor="siteName">Institution Name</label>
          <input onKeyDown={handleKeyPress} type="text" className="form-control" id="siteName" placeholder="Enter Institution Name" maxLength={100} value={siteInfo?.institutionName} onChange={(e) => setSiteInfo({...siteInfo, institutionName: e.target.value})} />
        </div>
        <div className="col-3 form-group">
          <label htmlFor="instituteName">Contact Person</label>
          <input onKeyDown={handleKeyPress} type="text" className="form-control" id="instituteName" placeholder="Enter Contact Person" maxLength={40} value={siteInfo?.contactPerson} onChange={(e) => setSiteInfo({...siteInfo, contactPerson: e.target.value})} />
        </div>
      </div>
    </div>
  );
};