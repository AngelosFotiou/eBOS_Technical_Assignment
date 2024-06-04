
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
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

    //useEffect(() => {
    //    const fetchPhotosCount = async () => {
    //        const promises = albums.map(async (album) => {
    //            try {
    //                const response = await axios.get(`${apiUrl}/api/Albums/PhotoCount${album.id}`);
    //                album.photoCount = response.data;
    //            } catch (error)
    //            {
    //                console.error(`Error fetching photos for album ${album.id}`, error);
    //                setError('Error fetching photos count');
    //            }
    //        });
    //        await Promise.all(promises); setAlbums([...albums]);
    //    }; fetchPhotosCount();
    //}, [albums]);


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
            <div className="row row-cols-1 row-cols-md-3 g-4"> {
                albums.map((album) => (<div key={album.id} className="col">
                    <div className="card h-100">
                        <div className="card-body">
                            <p className="card-text">{album.title}</p>
                            <Link to={`/photos?albumId=${album.id}`} className="btn btn-success m-2"> Albums Photos </Link>
                            {/*  image count ??*/}
                            <p className="card-text">Image Count: {album.photoCount}</p>
                            <button className="btn btn-danger m-2" onClick={() => handleDeleteAlbum(album.id)}>Delete</button>
                            <button className="btn btn-warning m-2" onClick={() => handleEditAlbum(album)}>Edit</button>
                        </div>
                    </div>
                </div>))}
            </div>
            <div className="d-flex justify-content-between mt-4">
                {!isFirst && (<button className="btn btn-primary" onClick={LoadPrevMore}> Load Previous Set </button>)}
                {hasMore && (<button className="btn btn-primary" onClick={handleLoadMore}> Load Next Set </button>)}
            </div>
        </div>

      

            //{editAlbum && (
            //    <div className="modal" tabIndex="-1" role="dialog">
            //        <div className="modal-dialog" role="document">
            //            <div className="modal-content">
            //                <div className="modal-header">
            //                    <h5 className="modal-title">Edit Album</h5>
            //                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setEditAlbum(null)}>
            //                        <span aria-hidden="true">&times;</span>
            //                    </button>
            //                </div>
            //                <form onSubmit={handleEditAlbumSubmit}>
            //                    <div className="modal-body">
            //                        <div className="form-group">
            //                            <label htmlFor="title">Title</label>
            //                            <input type="text" className="form-control" id="title" name="title" value={editAlbum.title} onChange={handleEditAlbumChange} required />
            //                        </div>
            //                        <div className="form-group">
            //                            <label htmlFor="userId">User ID</label>
            //                            <input type="text" className="form-control" id="userId" name="userId" value={editAlbum.userId} onChange={handleEditAlbumChange} required />
            //                        </div>
            //                    </div>
            //                    <div className="modal-footer">
            //                        <button type="button" className="btn btn-secondary" onClick={() => setEditAlbum(null)}>Close</button>
            //                        <button type="submit" className="btn btn-primary">Save changes</button>
            //                    </div>
            //                </form>
            //            </div>
            //        </div>
            //    </div>
            //)}
       // </div>

    );
};
export default Albums;