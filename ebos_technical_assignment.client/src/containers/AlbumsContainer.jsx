import React, { useState, useEffect } from 'react';
import Albums from '../components/Albums';
import axios from 'axios';

const AlbumsContainer = ({ apiReady }) => {
    const apiUrl = '/api';///import.meta.env.VITE_API_URL; 

        const [albums, setAlbums] = useState([]);

        useEffect(() => {
            if (apiReady) {
                axios.get('${apiUrl}/albums')
                    .then(response => setAlbums(response.data))
                    .catch(error => console.error('Error fetching albums:', error));
            }
        }, [apiReady]);

        if (!apiReady) {
            return <div>API is not ready yet.</div>;
        }



    return <Albums albums={albums} />;
};

export default AlbumsContainer;

