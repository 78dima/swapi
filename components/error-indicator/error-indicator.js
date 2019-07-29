import React from 'react';
import './error-indicator.css';
const ErrorIndicator = () =>{
    return(
        <div className={"error-indicator"}>
            <span className={"boom"}>ERROR</span>
            <span>Something wrong</span>
            <span>already fixed</span>
        </div>
    );
};

export default ErrorIndicator;