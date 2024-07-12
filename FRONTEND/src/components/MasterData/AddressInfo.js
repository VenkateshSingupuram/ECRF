import React from 'react';

export const AddressInfo = ({addressInfo, setAddressInfo, handleKeyPress}) => {
  return (
    <div className="card mb-3 p-5 pt-3">
      <div className='row'>
        <h5 className='hfw6'>Address</h5>
      </div>
      <hr />
      <div className='row mb-3'>
        <div className="col-4 form-group">
          <label htmlFor="siteId">Address 1</label>
          <input onKeyDown={handleKeyPress} type="text" className="form-control" id="siteId" placeholder="Enter Address 1" maxLength={80} required value={addressInfo?.address1} onChange={(e) => setAddressInfo({...addressInfo, address1: e.target.value})} />
        </div>
        <div className="col-4 form-group">
          <label htmlFor="siteName">Address 2</label>
          <input onKeyDown={handleKeyPress} type="text" className="form-control" id="siteName" placeholder="Enter Address 2" maxLength={80} value={addressInfo?.address2} onChange={(e) => setAddressInfo({...addressInfo, address2: e.target.value})} />
        </div>
        <div className="col-4 form-group">
          <label htmlFor="siteId">Address 3</label>
          <input onKeyDown={handleKeyPress} type="text" className="form-control" id="siteId" placeholder="Enter Address 3" maxLength={80} value={addressInfo?.address3} onChange={(e) => setAddressInfo({...addressInfo, address3: e.target.value})} />
        </div>
      </div>
      <div className='row mb-3'>
        <div className="col-4 form-group">
          <label htmlFor="siteId">Address 4</label>
          <input onKeyDown={handleKeyPress} type="text" className="form-control" id="siteId" placeholder="Enter Address 4" maxLength={80} value={addressInfo?.address4} onChange={(e) => setAddressInfo({...addressInfo, address4: e.target.value})} />
        </div>
        <div className="col-4 form-group">
          <label htmlFor="siteName">City</label>
          <input onKeyDown={handleKeyPress} type="text" className="form-control" id="siteName" placeholder="Enter City" maxLength={40} required value={addressInfo?.city} onChange={(e) => setAddressInfo({...addressInfo, city: e.target.value})} />
        </div>
        <div className="col-4 form-group">
          <label htmlFor="instituteName">District</label>
          <input onKeyDown={handleKeyPress} type="text" className="form-control" id="instituteName" placeholder="Enter District" maxLength={40} required value={addressInfo?.district} onChange={(e) => setAddressInfo({...addressInfo, district: e.target.value})} />
        </div>
      </div>
      <div className='row mb-3'>
        <div className="col-4 form-group">
          <label htmlFor="siteId">Region</label>
          <input onKeyDown={handleKeyPress} type="text" className="form-control" id="siteId" placeholder="Enter Region" maxLength={40} required value={addressInfo?.region} onChange={(e) => setAddressInfo({...addressInfo, region: e.target.value})} />
        </div>
        <div className="col-4 form-group">
          <label htmlFor="siteName">Zip Code</label>
          <input onKeyDown={handleKeyPress} type="text" className="form-control" id="siteName" placeholder="Enter Zip Code" maxLength={12} required value={addressInfo?.zipCode} onChange={(e) => setAddressInfo({...addressInfo, zipCode: e.target.value})} />
        </div>
        <div className="col-4 form-group">
          <label htmlFor="instituteName">Country</label>
          <input onKeyDown={handleKeyPress} type="text" className="form-control" id="instituteName" placeholder="Enter Country" maxLength={40} required value={addressInfo?.country} onChange={(e) => setAddressInfo({...addressInfo, country: e.target.value})} />
        </div>
      </div>
    </div>
  );
};