




import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link  } from 'react-router-dom';
import Photos from './components/Photos';
import axios from 'axios';
//import UsersContainer from './containers/UsersContainer';
//import AlbumsContainer from './containers/AlbumsContainer';
//import PhotosContainer from './containers/PhotosContainer';
import Loading from './components/Loading';
import StatusCheck from './components/StatusCheck';
import './App.css';
import Albums from './components/Albums';
    const App = () => {
        //const [isApiUp, setIsApiUp] = useState(false);
        const [apiIsUp, setApiIsUp] = useState(false);
        const handleStatusChange = (status) => {
            setIsApiUp(status);
        };

        //return (
        //    <div>
        //       <h1>Photo Album Application</h1>
        //        <StatusCheck onStatusChange={handleStatusChange} />
        //        {
        //           isApiUp &&
        //        }
                
        //    </div>
        //);
        return (
            <Router>
                <div>
                    <StatusCheck onStatusChange={setApiIsUp} />
                    {apiIsUp && (
                        <Link to="/photos">
                            <button>Photos</button>
                        </Link>
                        //<Link to="/users">
                        //    <button>API is Up</button>
                        //</Link><Link to="/ambums">
                        //    <button>API is Up</button>
                        //</Link>
                    )}
                    <Routes>
                        {<Route path="/photos" element={<Photos />} />}

                       {/*<Route path="/ambums" element={<Albums/>} />*/}
                       {/* <Route path="/users" element={<Users/>} />*/}

                    </Routes>
                </div>
            </Router>
        );


};
export default App;
    //return (
    //    <div className="App">
    //        <UsersContainer />
    //        <AlbumsContainer />
    //        <PhotosContainer />
    //    </div>
    //);










