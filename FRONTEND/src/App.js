import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./components/Login";
import Home from "./components/Home";
import Modify from "./components/Modify";
// import Values from "./components/Values";
import Reused from "./components/New";
import NotFound from "./components/NotFound";
import Admin from "./components/Admin";
import Sponsor from "./components/Sponsor";
import Site from "./components/Site";
import Protocol from "./components/Protocol";
// import AddStudyData from "./components/AddStudyData";
import { MasterSiteData } from "./components/MasterData/Site";
import HomePage from "./components/HomePage";
import Header from "./components/HomePage/Header";
import Sidebar from "./components/HomePage/Sidebar";
import { MasterSponserData } from "./components/MasterData/Sponser";
import { MasterCROData } from "./components/MasterData/CRO";
import { SiteList } from "./components/MasterData/Site/siteList";
import { AuthProvider, useData } from "./AuthContext";
import { User } from "./components/UserMgmt/User";
import { CROList } from "./components/MasterData/CRO/CROList";
import { MasterStudyData } from "./components/MasterData/Study";
import { SponserList } from "./components/MasterData/Sponser/SponsetList";
import { StudyList } from "./components/MasterData/Study/StudyList";
import { UserList } from "./components/UserMgmt/UserList";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import Cookies from 'js-cookie';
import { Reports } from "./components/Reports";
import ProtectedRoute from "./auth/ProtectedRoute";
import { BulkUpload } from "./components/BulkUpload/index2";
// import { useNavigate } from "react-router-dom";

function App() {
  // const [data, setData] = useLocalStorage(`ecrf_details`, null);
  const [data, setData] = useState(localStorage.getItem("ecrf_details") || null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('tkn');
    if (token) {
      // Perform token validation logic if needed
      // For simplicity, assume the token is valid
      setIsLoggedIn(true);
    } 
    // else {
    //   navigate('/');
    // }
  }, []);

  // useEffect(() => {
  //   if (data) {
  //     // console.log('innn', data);
  //     typeof data === 'string' ? setData(JSON.parse(data)) : setData(data);
  //   }
  // }, [data]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'ecrf_details') {
        // console.log('localStorage updated!', event.key, data);
        setIsLoggedIn(false);
      }
    };

    // Add event listener to listen for storage events
    window.addEventListener('storage', handleStorageChange);

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <div>
            {/* { isLoggedIn && <Header /> } */}
            <div className="d-flex" id="wrapper">
              {isLoggedIn && <Sidebar />}
              <div className="content-wrapper">
                {isLoggedIn && <Header />}
                <div className="content">
                  <div id="page-content-wrapper" style={{ width: '100%' }}>
                    <div className="container-fluid">
                      <Routes>
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/" element={<ProtectedRoute role={'ROLE_DATAENTRY,ROLE_REVIEWER'}> <Modify /> </ProtectedRoute> } />
                        <Route exact path="/Addstudydata" element={<ProtectedRoute role={'ROLE_DATAENTRY'}> <Home /> </ProtectedRoute>} />
                        <Route exact path="/values/:formID" element={<ProtectedRoute role={'ROLE_DATAENTRY,ROLE_REVIEWER'}> <Reused /> </ProtectedRoute>} />
                        <Route exact path="/siteInfo" element={<ProtectedRoute role={'ROLE_ADMIN'}> <MasterSiteData /> </ProtectedRoute>} />
                        <Route exact path="/siteInfo/:id" element={<ProtectedRoute role={'ROLE_ADMIN'}> <MasterSiteData /> </ProtectedRoute>} />
                        <Route exact path="/siteList" element={<ProtectedRoute role={'ROLE_ADMIN'}> <SiteList /> </ProtectedRoute>} />
                        <Route exact path="/croList" element={<ProtectedRoute role={'ROLE_ADMIN'}> <CROList /> </ProtectedRoute>} />
                        <Route exact path="/sponserInfo" element={<ProtectedRoute role={'ROLE_ADMIN'}> <MasterSponserData /> </ProtectedRoute>} />
                        <Route exact path="/sponserInfo/:id" element={<ProtectedRoute role={'ROLE_ADMIN'}> <MasterSponserData /> </ProtectedRoute>} />
                        <Route exact path="/sponserList" element={<ProtectedRoute role={'ROLE_ADMIN'}> <SponserList /> </ProtectedRoute>} />
                        <Route exact path="/croInfo" element={<ProtectedRoute role={'ROLE_ADMIN'}> <MasterCROData /> </ProtectedRoute>} />
                        <Route exact path="/croInfo/:id" element={<ProtectedRoute role={'ROLE_ADMIN'}> <MasterCROData /> </ProtectedRoute>} />
                        <Route exact path="/Cro" element={<ProtectedRoute role={'ROLE_ADMIN'}> <Admin /> </ProtectedRoute>} />
                        <Route exact path="/Sponsor" element={<ProtectedRoute role={'ROLE_ADMIN'}> <Sponsor /> </ProtectedRoute>} />
                        <Route exact path="/Site" element={<ProtectedRoute role={'ROLE_ADMIN'}> <Site /> </ProtectedRoute>} />
                        <Route exact path="/Protocol" element={<ProtectedRoute role={'ROLE_DATAENTRY'}> <Protocol /> </ProtectedRoute>} />
                        <Route exact path="/studyInfo" element={<ProtectedRoute role={'ROLE_ADMIN'}> <MasterStudyData /> </ProtectedRoute>} />
                        <Route exact path="/studyList" element={<ProtectedRoute role={'ROLE_ADMIN'}> <StudyList /> </ProtectedRoute>} />
                        <Route exact path="/studyInfo/:id" element={<ProtectedRoute role={'ROLE_ADMIN'}> <MasterStudyData /> </ProtectedRoute>} />
                        <Route exact path="/userMgmt" element={<ProtectedRoute role={'ROLE_ADMIN'}> <User /> </ProtectedRoute>} />
                        <Route exact path="/userList" element={<ProtectedRoute role={'ROLE_ADMIN'}> <UserList /> </ProtectedRoute>} />
                        <Route exact path="/userMgmt/:id" element={<ProtectedRoute role={'ROLE_ADMIN'}> <User /> </ProtectedRoute>} />
                        <Route exact path="/reports" element={<ProtectedRoute role={'ROLE_DATAENTRY,ROLE_REVIEWER,ROLE_ADMIN'}> <Reports /> </ProtectedRoute>} />
                        <Route exact path="/bulkUpload" element={<ProtectedRoute role={'ROLE_DATAENTRY,ROLE_REVIEWER,ROLE_ADMIN'}> <BulkUpload /> </ProtectedRoute>} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                  </div>
                </div>
              </div>
              {/* <Sidebar /> */}
            </div>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
