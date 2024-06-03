
import React, { useState, useEffect } from 'react';
import Photos from '../components/Photos';
import axios from 'axios';

const PhotosContainer = ({ apiReady }) => {
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        if (apiReady) {
            axios.get('${apiUrl}/photos')
                .then(
                    response => setPhotos(response.data))
                .catch(error => console.error('Error fetching photos:', error));
        }
    }, [apiReady]);

    if (!apiReady) {
        return <div>API is not ready yet.</div>;
    }
    return (
          //  <Photos photos={photos} />;

        <div> <h2>Photos</h2> <ul> {
            photos.map(photo => (
                <li key={photo.id}>{photo.title}</li>)
            )}
        </ul> </div>);
}; 
export default PhotosContainer;
