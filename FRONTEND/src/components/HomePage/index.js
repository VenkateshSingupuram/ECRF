import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Modify from '../Modify';
import { useData } from '../../AuthContext';

function HomePage() {
    const [data, setData] = useState(localStorage.getItem("ecrf_details") || null);
    const [username, setUsername] = useState("");
    const { loggedInUsername } = useData();

    useEffect(() => {
        if (data) {
            typeof data === 'string' ? setData(JSON.parse(data)) : setData(data);
            setUsername(loggedInUsername ? loggedInUsername : data?.username);
        }
    }, [data, loggedInUsername]);

    useEffect(() => {
        // console.log('user home', loggedInUsername);
        setUsername(loggedInUsername);
    }, [loggedInUsername]);

    return (
        <div>
            <Header />
            <div className="d-flex" id="wrapper">
                {(data && username) && (
                    <Sidebar />
                )}
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <Modify />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;