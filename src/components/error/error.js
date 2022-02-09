import React from 'react';

function Error({message}) {
    return (
        <div className={'m-6'}>
            <p className="text text_type_main-default">
                {message}
            </p>
        </div>
    );
}

export default Error;