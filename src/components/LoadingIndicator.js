import React from 'react';
import {LoadingSpinner} from "hds-react";

const LoadingIndicator = props => {
    const className = props.global ? "indicatorRoot_global" : "indicatorRoot";

    return (
        <div className={className}>
            <LoadingSpinner/>
        </div>
    );
};

export default LoadingIndicator;