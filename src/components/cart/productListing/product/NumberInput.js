import React, {Fragment} from 'react';
import {number, string, func, bool} from "prop-types";

import "hds-core/lib/components/text-input/text-input.min.css";
import {IconMinus, IconPlus} from 'hds-react';

import {useQuantity} from "../../../../talons/cart/productListing/useQuantity";
import '../../../clickable.css';

const NumberInput = props => {
    const {
        initialValue,
        itemId,
        label,
        inputAriaLabel,
        minusStepButtonAriaLabel,
        plusStepButtonAriaLabel,
        min,
        max,
        step,
        onChange,
        message,
        helperText,
        required
    } = props;

    const {
        isDecrementDisabled,
        isIncrementDisabled,
        handleBlur,
        handleDecrement,
        handleIncrement,
        handleOnChangeWithDebounce,
        quantity
    } = useQuantity({
        initialValue,
        onChange
    });

    const errorMessage = message ? <p>{message}</p> : null;

    return (
        <Fragment>
            <div className="hds-text-input">
                <label htmlFor={itemId} className="hds-text-input__label">
                    {label}
                    <span className="hds-text-input__required">{required ? '*' : ''}</span>
                </label>
                <div className="hds-text-input__input-wrapper">
                    <button
                        className="clickable"
                        aria-label={minusStepButtonAriaLabel}
                        disabled={isDecrementDisabled}
                        onClick={handleDecrement}
                        type="button"
                    >
                        <IconMinus/>
                    </button>
                    <input
                        className="hds-text-input__input"
                        aria-label={inputAriaLabel}
                        id={itemId}
                        inputMode="numeric"
                        min={min}
                        max={max}
                        step={step}
                        onBlur={handleBlur}
                        pattern="[0-9]*"
                        value={quantity}
                        onChange={handleOnChangeWithDebounce}
                    />
                    <button
                        className="clickable"
                        aria-label={plusStepButtonAriaLabel}
                        disabled={isIncrementDisabled}
                        onClick={handleIncrement}
                        type="button"
                    >
                        <IconPlus/>
                    </button>
                </div>
                <span className="hds-text-input__helper-text">{helperText}</span>
            </div>
            {errorMessage}
        </Fragment>
    );
};

NumberInput.propTypes = {
    initialValue: number,
    itemId: string,
    label: string,
    min: number,
    max: number,
    inputAriaLabel: string,
    minusStepButtonAriaLabel: string,
    plusStepButtonAriaLabel: string,
    step: number,
    onChange: func,
    message: string,
    helperText: string,
    required: bool
};

NumberInput.defaultProps = {
    label: 'Quantity',
    min: 0,
    max: 99,
    initialValue: 1,
    step: 1,
    inputAriaLabel: 'Item Quantity',
    minusStepButtonAriaLabel: 'Decrease Quantity',
    plusStepButtonAriaLabel: 'Increase Quantity',
    required: false,
    onChange: () => {
    }
};

export default NumberInput;