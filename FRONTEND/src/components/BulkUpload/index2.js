import React, { useState } from 'react';
import config from '../../config';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const BulkUpload = () => {
  const [file, setFile] = useState(null);
  const { apiUrl } = config;
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('tkn');
    if(!token) {
      navigate('/login');
    }
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Use the fetch API to send the file content as an octet stream
      const response = await fetch(`${apiUrl}/eCRF-rest-service/upload`, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.text();
      console.log('Response from the server:', responseData);
      // setFile(null)
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error while submitting the excel.');
    }
  };

  return (
    <>
      <div className="container pb-4 pt-4">
        <div className="col-6">
          <h4 className="hfw6" style={{ marginBottom: 20 }}>Bulk Upload</h4>
        </div>
        <div className='card p-4'>
          <div className='row'>
            <form onSubmit={handleSubmit}>
              <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
              <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};