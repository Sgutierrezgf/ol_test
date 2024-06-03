/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import './success.css'

function Success({ message, onClose }) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timeout);
    }, [onClose]);

    return (
        <div className="popup-success">
            <p>{message}</p>
        </div>
    );
}

export default Success;
