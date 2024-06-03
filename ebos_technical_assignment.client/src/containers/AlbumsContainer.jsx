import React, { useState, useEffect } from 'react';
import Albums from '../components/Albums';
import axios from 'axios';

const AlbumsContainer = () => {
    const [albums, setAlbums] = useState([]);
    const apiUrl = '/api';///import.meta.env.VITE_API_URL; 
    useEffect(() => {
        axios.get('${apiUrl}/albums')
            .then(response => setAlbums(response.data))
            .catch(error => console.error('Error fetching albums:', error));
    }, []);

    return <Albums albums={albums} />;
};

export default AlbumsContainer;

