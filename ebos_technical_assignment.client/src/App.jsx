




import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link  } from 'react-router-dom';
import Photos from './components/Photos';
import StatusCheck from './components/StatusCheck';
import Home from './components/Home';
import Users from './components/Users';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LanguageSwitcher from './components/LanguageSwitcher';

//import './App.css';
import Albums from './components/Albums';
    const App = () => {
        const [apiIsUp, setIsApiUp] = useState(false);
        const handleStatusChange = (status) => {
            setIsApiUp(status);
        };
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container">
                            <Link className="navbar-brand" to="/">MyApp</Link>
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav me-auto">
                                    <li className="nav-item"> <Link className="nav-link" to="/">Home</Link> </li>
                                    {apiIsUp && (<>
                                        <li className="nav-item"> <Link className="nav-link" to="/photos">Photos</Link> </li>
                                        <li className="nav-item"> <Link className="nav-link" to="/users">Users</Link></li>
                                        <li className="nav-item"> <Link className="nav-link" to="/albums">Albums</Link> </li>
                                        <li className="nav-item">  <LanguageSwitcher /> </li>
                                    </>)}
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div className="container mt-5">
                        <Routes> <Route path="/" element={<Home />} />
                            <Route path="/photos" element={<Photos  />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/albums" element={<Albums inputVall= { '0' }/>} />
                        </Routes> </div> </div>
        <StatusCheck onStatusChange={handleStatusChange} />
            </Router>);
};
export default App;










