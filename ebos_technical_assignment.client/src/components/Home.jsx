import React from 'react';
import { useTranslation } from 'react-i18next';


const Home = () => {
    const { t } = useTranslation();
    return (
        <div className="container text-center mt-5">
            <div className="row">
                <div className="col">
                    <h1 className="display-4">
{ t('welcome') }</h1>
                    <p className="lead"> {t('welcome2')}</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
