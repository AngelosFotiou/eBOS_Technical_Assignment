
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { useSearchParams } from 'react-router-dom';
const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isFirst, setisFirst] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const apiUrl = '/api';///import.meta.env.VITE_API_URL; 

    useEffect(() => {
        const fetchAlbums = async () => {
            setLoading(true);

            const userId = searchParams.get('userId');
            let url = `${apiUrl}/api/Albums/GetPaginated?_page=${page}`;

            if (userId) {
                url += `&_user=${userId}`;
            }

            try {
                    const response = await axios.get(url);
                    if (response.data.length > 0) {
                    setAlbums((prevAlbums) => [...response.data]);
                    setisFirst(false);

                } else {
                    setHasMore(false);
                    setisFirst(false);
                }
                } catch (err) {
                setError('Error fetching albums');
                console.error('Error fetching Albums:', error);

                } finally {
                    setLoading(false);
                }
        };
        fetchAlbums();
    }, [page]);


    if (loading) { return <Loading />; }

if (error) {
    return <div className="alert alert-danger" role="alert">{error}</div>;
}
    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };
    const LoadPrevMore = () => {
        setPage((prevPage) => {
            if (prevPage > 0) {
                return prevPage - 1;
            } else {
                setisFirst(true);
                return 0;
            }
        });
    };

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-4"> {
                albums.map((album) => (<div key={album.id} className="col">
                    <div className="card h-100">
                        <div className="card-body">
                            <p className="card-text">{album.title}</p>
                         {/*  image count ??*/}
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
export default Albums;