
import React, { useState, useEffect } from 'react';
import Users from '../components/Users';
import axios from 'axios';

const UsersContainer = () => {
    const [users, setUsers] = useState([]); 0
    const apiUrl = '/api';
//        import.meta.env.VITE_API_URL; 
    useEffect(() => {
        axios.get('${apiUrl}/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return <Users users={users} />;
};

export default UsersContainer;
