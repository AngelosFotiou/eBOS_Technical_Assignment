import { useState, useEffect } from 'react';
import axios from 'axios';

const StatusCheck = ({ onStatusChange }) => {
    const [status, setStatus] = useState('Pending');

    useEffect(() => {
        const maxRetries = 3; // Maximum number of retries
        let retryCount = 0; // Current retry count

        const checkStatus = async () => {
            try {
                //`${import.meta.env.VITE_API_URL}/status`
                const response = await axios.get(`/api/Status`);
                if (response.status === 200) {
                    setStatus('API is up and running');
                    onStatusChange(true);
                } else {
                    handleRetry();
                }
            } catch (error) {
                handleRetry();
            }
        };

        const handleRetry = () => {
            retryCount++;
            if (retryCount <= maxRetries) {
                setStatus(`Retrying... Attempt ${retryCount}`);
                setTimeout(checkStatus, 6000); // Retry after 6 seconds
            } else {
                setStatus('API is not reachable');
                onStatusChange(false);
            }
        };

        checkStatus();
    }, [onStatusChange]);

    return (
        //<div>
        //    <h2>Status Check</h2>
        //    <p>{status}</p>

        //</div>
        <div className="container mt-5">
            <h2>Status Check</h2>
            <div className={`alert ${status === 'API is up and running' ? 'alert-success' : 'alert-danger'}`}>
                {status} </div> </div>
    );
};

export default StatusCheck;




