
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isFirst, setisFirst] = useState(true);
    const apiUrl = '/api';///import.meta.env.VITE_API_URL; 

    useEffect(() => {
        const fetchAlbums = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/api/Albums/GetPaginated?_page=${page}`);
                setLoading(false);
                if (response.data.length > 0) {
                    setAlbums((prevAlbums) => [...response.data]);
                    setisFirst(false);

                } else {
                    setHasMore(false);
                    setisFirst(false);

                }
            } catch (error) {
                console.error('Error fetching Albums:', error);
                setLoading(false);
            }
        };
        fetchAlbums();
    }, [page]);


    if (loading) { return <Loading />; }

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

    return (
        //<div>
        //    <h2>Albums</h2>
        //    <ul>
        //        {albums.map(album => (
        //            <li key={album.id}>{album.title}</li>
        //        ))}
        //    </ul>
        //</div>

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