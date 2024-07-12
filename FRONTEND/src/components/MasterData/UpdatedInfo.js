import React from "react";
import moment from "moment";

export const UpdatedInfo = ({updatedInfo, setUpdatedInfo}) => {

  return (
    <div className="row">
      <div className="col-6 form-group">
        <label className="mt-3" htmlFor="siteId">Created By: <span style={{fontWeight: 600}}>{updatedInfo?.createdBy}</span></label>
      </div>
      <div className="col-6 form-group">
        <label className="mt-3" htmlFor="siteName">Created On: <span style={{fontWeight: 600}}>{moment(updatedInfo?.createdOn, 'YYYY-MM-DD HH:mm:ss').format('MMMM Do YYYY, h:mm:ss a')}</span></label>
      </div>
      <div className="col-6 form-group">
        <label className="mt-3" htmlFor="siteId">Changed By: <span style={{fontWeight: 600}}>{updatedInfo?.changedBy}</span></label>
      </div>
      <div className="col-6 form-group">
        <label className="mt-3" htmlFor="siteName">Changed On: <span style={{fontWeight: 600}}>{moment(updatedInfo?.changedOn, 'YYYY-MM-DD HH:mm:ss').format('MMMM Do YYYY, h:mm:ss a')}</span></label>
      </div>
    </div>
  )
};