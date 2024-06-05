import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import CreateAlbum from './CreateAlbum';
import { useSearchParams, Link } from 'react-router-dom';
const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isFirst, setisFirst] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const apiUrl = '/api';///import.meta.env.VITE_API_URL; 
    const [editAlbum, setEditAlbum] = useState(null);
    const [newAlbum, setNewAlbum] = useState({ title: '', userId: '' });

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

                } else {
                    setHasMore(false);
               
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

    useEffect(() => {
        const fetchPhotosCount = async () => {
            try {
                const updatedAlbums = await Promise.all(albums.map(async (album) => {
                    const response = await axios.get(`${apiUrl}/api/Albums/PhotoCount?id=${album.id}`);
                    return { ...album, photoCount: response.data };
                }));
                setAlbums(updatedAlbums);
            } catch (error) {
                console.error('Error fetching photos count', error);
                setError('Error fetching photos count');
            }
        };

        if (albums.length > 0) {
            fetchPhotosCount();
        }
    }, [albums, apiUrl]);



if (loading) { return <Loading />; }

if (error) {
    return <div className="alert alert-danger" role="alert">{error}</div>;
    }
    const handleAddAlbum = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/albums`, newAlbum);
            setAlbums((prevAlbums) => [...prevAlbums, response.data]);
            setNewAlbum({ title: '', userId: '' });
        } catch (error) {
            console.error('Error adding album', error);
        }
    };

    const handleNewAlbumChange = (e) => {
        const { name, value } = e.target;
        setNewAlbum((prevAlbum) => ({ ...prevAlbum, [name]: value }));
    };


    const handleDeleteAlbum = async (albumId) => {
        try {
            await axios.delete(`${apiUrl}/api/Albums/${albumId}`);
            setAlbums((prevAlbums) => prevAlbums.filter(album => album.id !== albumId));
        } catch (error) {
            console.error('Error deleting album', error);
        }
    };

    const handleEditAlbum = (album) => {
        setEditAlbum({ ...album });
    };

    const handleEditAlbumChange = (e) => {
        const { name, value } = e.target;
        setEditAlbum((prevAlbum) => ({ ...prevAlbum, [name]: value }));
    };

    const handleEditAlbumSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${apiUrl}/api/Albums/${editAlbum.id}`, editAlbum);
            setAlbums((prevAlbums) => prevAlbums.map(album => album.id === editAlbum.id ? response.data : album));
            setEditAlbum(null);
        } catch (error) {
            setError('Error editing album', error);
        }
    };

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
        setisFirst(false);

    };

    const LoadPrevMore = () => {
        setPage((prevPage) => {
            if (prevPage > 0) {
                setHasMore(true);
                return prevPage - 1;
            } else {
                setisFirst(true);
                return 0;
            }
        });
    };

    return (           
        
 
        <div className="container">
            <div>
                <Link to="/create-album" className="btn btn-primary m-2">Create Album</Link>
            </div> <div className="row row-cols-1 row-cols-md-3 g-4"> {
                albums.map(album => (<div key={album.id} className="col">
                    <div className="card h-100"> <div className="card-body">
                        <p className="card-text">{album.title}</p>
                        <Link to={`/photos?albumId=${album.id}`}
                            className="btn btn-success m-2">Albums Photos</Link>
                        <p className="card-text">Image Count: {album.photoCount}
                        </p> <button className="btn btn-danger m-2" onClick={() => handleDeleteAlbum(album.id)}>Delete</button>
                        <button className="btn btn-warning m-2" onClick={() => handleEditAlbum(album)}>Edit</button>
                    </div> </div> </div>))} </div> <div className="d-flex justify-content-between mt-4">
                {!isFirst && (<button className="btn btn-primary" onClick={LoadPrevMore}>
                    Load Previous Set
                </button>)}
                {hasMore && (<button className="btn btn-primary" onClick={handleLoadMore}>
                    Load Next Set
                </button>)}
            </div>
        </div> 
    );
};
export default Albums;