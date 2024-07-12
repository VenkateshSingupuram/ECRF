import { React } from "react";

export const Notes = ({notes, setNotes, handleKeyPress}) => {
  return (
    <div className="row mb-3">
      <div className="form-group">
          <label htmlFor="siteId">Notes</label>
          <textarea onKeyDown={handleKeyPress} type="text" className="form-control" id="siteId" placeholder="Enter Notes" rows={3} maxLength={400} value={notes} onChange={(e) => setNotes(e.target.value)} ></textarea>
        </div>
    </div>
  )
};