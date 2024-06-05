import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Photos = () => {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isFirst, setisFirst] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const apiUrl = '/api';///import.meta.env.VITE_API_URL; 
    const [selectedPhoto, setSelectedPhoto] = useState(null); // State for the selected photo
    const location = useLocation();
    const [editPhoto, setEditPhoto] = useState(null); // State for editing photo

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
    const handleDelete = async (photoId) => {
        try {
            await axios.delete(`${apiUrl}/api/Photos/${photoId}`);
            setPhotos((prevPhotos) => prevPhotos.filter(photo => photo.id !== photoId));
        } catch (error) {
            console.error('Error deleting photo', error);
        }
    };

    //const handleEdit = async (photoId, newTitle) => {
    //    try {
    //        const response = await axios.put(`$${apiUrl}/api/Photos/${photoId}`, { title: newTitle });
    //        setPhotos((prevPhotos) => prevPhotos.map(photo => photo.id === photoId ? response.data : photo));
    //    } catch (error) {
    //        console.error('Error editing photo', error);
    //    }
    //};
const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${apiUrl}/api/Photos/${editPhoto.id}`, editPhoto);
            setPhotos((prevPhotos) => prevPhotos.map(photo => photo.id === editPhoto.id ? response.data : photo));
            setEditPhoto(null);
        } catch (error) {
            console.error('Error editing photo', error);
        }
    };
    const handleViewDetails = (photo) => {
        setSelectedPhoto(photo);
    };

    const closeModal = () => {
        setSelectedPhoto(null);
    };
    const closeEditModal = () => {
        setEditPhoto(null);
    };


    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditPhoto((prevPhoto) => ({ ...prevPhoto, [name]: value }));
    };

    const handleEdit = (photo) => {
        setEditPhoto({ ...photo }); // Set edit photo state
    };

    

    if (loading) { return <Loading />; }

    if (error) {
        return <div className="alert alert-danger" role="alert">{error}</div>;
    }

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {photos.map((photo) => (
                    <div key={photo.id} className="col">
                        <div className="card h-100">
                            <div className="card-body">
                                <img src={photo.url} alt={photo.title} className="card-img-top" />
                                <h5 className="card-title">{photo.title}</h5>
                                <button className="btn btn-danger m-2" onClick={() => handleDelete(photo.id)}>Delete</button>
                                {/*<button className="btn btn-warning m-2" onClick={() => handleEdit(photo.id, prompt('Enter new title:'))}>Edit</button>*/}
                                <button className="btn btn-info m-2" onClick={() => handleViewDetails(photo)}>View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-between mt-4">
                {!isFirst && (
                    <button className="btn btn-primary" onClick={LoadPrevMore}>
                        Load Previous Set
                    </button>
                )}
                {hasMore && (
                    <button className="btn btn-primary" onClick={handleLoadMore}>
                        Load Next Set
                    </button>
                )}
            </div>

            {/* Modal for viewing photo details */}
            {selectedPhoto && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Photo Details</h5>
                                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <img src={selectedPhoto.url} alt={selectedPhoto.title} className="img-fluid" />
                                <p><strong>Title:</strong> {selectedPhoto.title}</p>
                                <p><strong>Album ID:</strong> {selectedPhoto.albumId}</p>
                                <p><strong>Photo ID:</strong> {selectedPhoto.id}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default Photos;




