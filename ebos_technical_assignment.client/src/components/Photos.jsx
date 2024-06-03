import React from 'react';

const Photos = ({ photos }) => {
    return (
        <div>
            <h2>Photos</h2>
            <ul>
                {photos.map(photo => (
                    <li key={photo.id}>{photo.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Photos;
