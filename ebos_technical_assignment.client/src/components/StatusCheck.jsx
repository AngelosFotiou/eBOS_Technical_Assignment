import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const StatusCheck = ({ onStatusChange }) => {

    const [status, setStatus] = useState('Pending');
    const { t } = useTranslation();

    useEffect( () => {
        const maxRetries = 3; // Maximum number of retries
        let retryCount = 0; // Current retry count

        const checkStatus = async () => {
            try {
                //`${import.meta.env.VITE_API_URL}/status`
                const response = await axios.get(`/api/Status`);
                if (response.status === 200) {

                    setStatus('API is up and running'
                      //  { t('api_up') }
                    );

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
                setStatus('API is not responding'
                  //  { t('api_down') }
                );
                onStatusChange(false);
            }
        };

        checkStatus();
    }, [onStatusChange]);

    return (
      
        <div className="container mt-5">
            <h4> {t('status_check')}</h4>
            <div className={`alert ${status === 'API is up and running' ? 'alert-success' : 'alert-danger'}`}>
                {status}
            </div>
        </div>
    );
};

export default StatusCheck;




