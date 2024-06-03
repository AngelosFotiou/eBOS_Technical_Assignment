//import React from 'react';

//const Photos = ({ photos }) => {
//    return (
//        <div>
//            <h2>Photos</h2>
//            <ul>
//                {photos.map(photo => (
//                    <li key={photo.id}>{photo.title}</li>
//                ))}
//            </ul>
//        </div>
//    );
//};

//export default Photos;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Photos = () => {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const apiUrl = '/api';///import.meta.env.VITE_API_URL; 

    useEffect(() => {
        const fetchPhotos = async () => {
            setLoading(true);
            try {
              
                const response = await axios.get(`${apiUrl}/api/Photos/GetPaginated?_page=${page}`);
                setPhotos(prevPhotos => [...prevPhotos, ...response.data]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching photos:', error);
                setLoading(false);
            }
        };

        fetchPhotos();
    }, [page]);

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div>
            <h2>Photos</h2>
            <div>
                {photos.map(photo => (
                    <div key={photo.id}>
                        <img src={photo.thumbnailUrl} alt={photo.title} />
                        <p>{photo.title}</p>
                    </div>
                ))}
            </div>
            {loading && <p>Loading...</p>}
            {!loading && (
                <button onClick={handleLoadMore}>Load More Photos</button>
            )}
        </div>
    );
};

export default Photos;


