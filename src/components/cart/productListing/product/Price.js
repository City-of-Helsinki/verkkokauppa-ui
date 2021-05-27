import React from 'react';
import {number} from "prop-types";

const Price = props => {
    const { value } = props;

    return <div>{value + ' '}&#8364;</div>;
};

Price.propTypes = {
    value: number.isRequired,
};

export default Price;