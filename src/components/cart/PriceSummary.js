import React from 'react';

const PriceSummary = props => {
    const {isUpdating, totals} = props; // TODO: currency code

    if (!totals) {
        return null;
    }

    return (
        <div className="priceSummaryRoot">
            <div>
                <strong>Yhteensä</strong>{/* TODO: translations */}
                <span className="priceSummaryTotal">
                    <strong>{totals.grossValue} &euro;</strong>
                </span>
            </div>
        </div>
    );
};

// TODO: prop types

export default PriceSummary;