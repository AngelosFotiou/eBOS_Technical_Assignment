
import React, { useState, useEffect } from 'react';
import Photos from '../components/Photos';
import axios from 'axios';

const PhotosContainer = () => {
    const [photos, setPhotos] = useState([]);
    const apiUrl = '/api';
    //import.meta.env.VITE_API_URL;
    useEffect(() => {
        axios.get('${apiUrl}/photos')
            .then(response => setPhotos(response.data))
            .catch(error => console.error('Error fetching photos:', error));
    }, []);

    return <Photos photos={photos} />;
};

export default PhotosContainer;
