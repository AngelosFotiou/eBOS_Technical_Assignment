import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isFirst, setisFirst] = useState(true);

    const apiUrl = '/api';///import.meta.env.VITE_API_URL; 
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {

                const response = await axios.get(`${apiUrl}/api/Users/GetPaginated?_page=${page}`);
                setLoading(false);
                if (response.data.length > 0) {

                    setUsers((prevUsers) => [...response.data]);
                } else {
                    setHasMore(false);
                }
            } catch (error) {
                setError('Error fetching Users');
                console.error('Error fetching Users:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchUsers();
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
    

    if (loading) { return <Loading />; }

    if (error) {
        return <div className="alert alert-danger" role="alert">{error}</div>;
    }

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-4"> {
                users.map((user) => (
                    <div key={user.id} className="col">
                        <div className="card h-100">
                            <div className="card-body">
                            <p className="card-text">{user.username}</p>
                                <Link to={`/albums?userId=${user.id}`}
                                    className="btn btn-success m-2">
                                    Albums
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-between mt-4">
                {!isFirst && (<button className="btn btn-primary" onClick={LoadPrevMore}> Load Previous Set </button>)}
                {hasMore && (<button className="btn btn-primary" onClick={handleLoadMore}> Load Next Set </button>)}
            </div>
        </div>
    );
};

export default Users;



