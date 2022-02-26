import React, { FunctionComponent } from 'react';

interface IErrorProps {
    message: string;
}

const Error: FunctionComponent<IErrorProps> = ({ message }) => {
    return (
        <div className={'m-6'}>
            <p className="text text_type_main-default">
                {message}
            </p>
        </div>
    );
}

export default Error;