//import { useEffect, useState } from 'react';
//import './App.css';

//function App() {
//    const [forecasts, setForecasts] = useState();

//    useEffect(() => {
//        populateWeatherData();
//    }, []);

//    const contents = forecasts === undefined
//        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
//        : <table className="table table-striped" aria-labelledby="tabelLabel">
//            <thead>
//                <tr>
//                    <th>Date</th>
//                    <th>Temp. (C)</th>
//                    <th>Temp. (F)</th>
//                    <th>Summary</th>
//                </tr>
//            </thead>
//            <tbody>
//                {forecasts.map(forecast =>
//                    <tr key={forecast.date}>
//                        <td>{forecast.date}</td>
//                        <td>{forecast.temperatureC}</td>
//                        <td>{forecast.temperatureF}</td>
//                        <td>{forecast.summary}</td>
//                    </tr>
//                )}
//            </tbody>
//        </table>;

//    return (
//        <div>
//            <h1 id="tabelLabel">Weather forecast</h1>
//            <p>This component demonstrates fetching data from the server.</p>
//            {contents}
//        </div>
//    );

//    async function populateWeatherData() {
//        const response = await fetch('weatherforecast');
//        const data = await response.json();
//        setForecasts(data);
//    }
//}


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsersContainer from './containers/UsersContainer';
import AlbumsContainer from './containers/AlbumsContainer';
import PhotosContainer from './containers/PhotosContainer';
import Loading from './components/Loading';
import StatusCheck from './components/StatusCheck';
import './App.css';
    const App = () => {
        const [isApiUp, setIsApiUp] = useState(false);

        const handleStatusChange = (status) => {
            setIsApiUp(status);
        };

        return (
            <div>
                <h1>Photo Album Application</h1>
                <StatusCheck onStatusChange={handleStatusChange} />
                {isApiUp
                    // && <Loading/>
                }
            </div>
        );

    //return (
    //    <div className="App">
    //        <UsersContainer />
    //        <AlbumsContainer />
    //        <PhotosContainer />
    //    </div>
    //);
};

export default App;







