import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionTab } from 'primereact/accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRight from '@mui/icons-material/ExpandLess';
import img from '../../logo.jpg'
import Cookies from 'js-cookie';

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  const handleTabChange = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const navigation = (type) => {
    if (type === 'addRecord') navigate("/Addstudydata");
    else if (type === 'site') navigate("/siteList");
    else if (type === 'home') navigate("/");
    else if (type === 'sponser') navigate("/sponserList");
    else if (type === 'cro') navigate("/croList");
    else if (type === 'user') navigate("/userList");
    else if (type === 'study') navigate("/studyList");
    else if (type === 'reports') navigate("/reports");
    else if (type === 'bulkUpload') navigate("/bulkUpload");
  }

  const displaySidebarItem = (type) => {
    // return true;
    const role = Cookies.get("role");
    if (role) {
      if (role === type) return true;
      else return false;
    } else return false;
  };

  return (
    <>
      <div className="sidebar bg-dark border-right">
        <div className="logoWrap">
          <img src={img} alt='' style={{borderRadius: '50%'}} />
          <span style={{ color: '#fff', marginLeft: 16 }}>eCRF App</span>
        </div>
        <hr style={{ color: '#fff' }} />
        <div className="sideNavContent">
          <div className="sideNavMainList">
            <ul>
            {/* <li className='containsMenus' onClick={() => navigation('addRecord')}>Add Record</li> */}
              {displaySidebarItem('ROLE_DATAENTRY') && (
                <>
                  <li className='containsMenus' onClick={() => navigation('home')}>Home</li>
                  <li className='containsMenus' onClick={() => navigation('addRecord')}>Add Record</li>
                </>
              )}
              {displaySidebarItem('ROLE_REVIEWER') && (
                <>
                  <li className='containsMenus' onClick={() => navigation('home')}>Home</li>
                </>
              )}
              {displaySidebarItem('ROLE_ADMIN') && (
                <>
                  <li className='containsMenus' onClick={() => navigation('user')}>User Management</li>
                  {/* <li className='containsMenus' onClick={() => navigation('reports')}>Reports</li> */}
                  <li className='containsSubMenus' style={{ color: '#fff', marginLeft: 15, marginTop: 10 }}>
                    <Accordion activeIndex={activeIndex} onTabChange={(e) => handleTabChange(e.index)}>
                      <AccordionTab header={
                        <div>
                          <span style={{ color: '#fff' }}>Master Data
                            {activeIndex === 0 ? <ChevronRight fontSize='large' style={{ marginLeft: 60 }} /> : <ExpandMoreIcon fontSize='large' style={{ marginLeft: 60 }} />}
                          </span>
                        </div>
                      }>
                        <div className="sideNavList">
                          <ul>
                            <li onClick={() => navigation('cro')}>CRO</li>
                            <li onClick={() => navigation('sponser')}>Sponsor</li>
                            <li onClick={() => navigation('site')}>Site</li>
                            <li onClick={() => navigation('study')}>Study</li>
                          </ul>
                        </div>
                      </AccordionTab>
                    </Accordion>
                  </li>
                </>
              )}
              <li className='containsMenus' onClick={() => navigation('reports')}>Reports</li>
              <li className='containsMenus' onClick={() => navigation('bulkUpload')}>Bulk Upload</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
