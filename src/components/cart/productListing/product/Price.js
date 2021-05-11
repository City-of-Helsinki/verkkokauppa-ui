import React, { Fragment } from 'react';

const Price = props => {
    const { value } = props;

    return <div>{value + ' '}&#8364;</div>;
};

// TODO: prop types

export default Price;