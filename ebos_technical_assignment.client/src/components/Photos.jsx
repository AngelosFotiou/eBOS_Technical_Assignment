import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { useSearchParams } from 'react-router-dom';
const Photos = () => {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isFirst, setisFirst] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const apiUrl = '/api';///import.meta.env.VITE_API_URL; 

    useEffect(() => {
        const fetchPhotos = async () => {
            setLoading(true);

            const albumId = searchParams.get('albumId');
            let url = `${apiUrl}/api/Photos/GetPaginated?_page=${page}`;

            if (albumId) {
                url += `&_album=${albumId}`;
            }


            try {
                const response = await axios.get(url);
                setLoading(false);
                if (response.data.length > 0) {
                    setPhotos((prevPhotos) => [...response.data]);
                    setisFirst(false);

                } else {
                    setHasMore(false);
                    setisFirst(false);

                }
            }
            catch (err) {
                setError('Error fetching Photos');
                console.error('Error fetching Albums:', error);

            } finally {
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

    if (error) {
        return <div className="alert alert-danger" role="alert">{error}</div>;
    }

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




