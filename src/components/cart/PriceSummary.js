import React from 'react';
import {bool, number, shape} from "prop-types";

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

PriceSummary.propTypes = {
    isUpdating: bool,
    totals: shape({
        grossValue: number,
    })
};

export default PriceSummary;