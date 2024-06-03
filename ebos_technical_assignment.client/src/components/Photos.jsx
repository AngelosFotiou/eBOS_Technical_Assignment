import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
const Photos = () => {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isFirst, setisFirst] = useState(true);

    const apiUrl = '/api';///import.meta.env.VITE_API_URL; 

    useEffect(() => {
        const fetchPhotos = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/api/Photos/GetPaginated?_page=${page}`);
                setLoading(false);
                if (response.data.length > 0) {
                    setPhotos((prevPhotos) => [...response.data]);
                    setisFirst(false);

                } else {
                    setHasMore(false);
                    setisFirst(false);

                }
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

    const LoadPrevMore = () => {
        setPage(prevPage => prevPage - 1);
        if (prevPage < 0) {
            setisFirst(true);
            prevPage = 0;
        }
    };
   

    if (loading) { return <Loading />; }

    return (
      

        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-4"> {
                photos.map((photo) => (<div key={photo.id} className="col">
                    <div className="card h-100">
                        <img src={photo.url} className="card-img-top" alt={photo.title} />
                        <div className="card-body">
                            <p className="card-text">{photo.title}</p>
                        </div>
                    </div>
                </div>))}
            </div>
            <div className="d-flex justify-content-between mt-4">
                {!isFirst && (<button className="btn btn-primary" onClick={LoadPrevMore}> Load Previous Set </button>)}
                {hasMore && (<button className="btn btn-primary" onClick={handleLoadMore}> Load Next Set </button>)}
            </div>
        </div> 

    );
};

export default Photos;




