import React, {Fragment} from 'react';
//import {NumberInput} from "hds-react";
import {func, number, string} from "prop-types";

import {useQuantity} from "../../../../talons/cart/productListing/useQuantity";

const Quantity = props => {
    const {initialValue, label, helperText, min, onChange} = props;

    const {
        quantity,
        isDecrementDisabled,
        isIncrementDisabled,
        handleDecrement,
        handleIncrement,
        handleOnChangeWithDebounce,
        handleBlur
    } = useQuantity({
        initialValue,
        min,
        onChange
    });

    // TODO: translations
    return (
        <Fragment>
            <div className="quantityRoot">
                <div className="TextInput-module_root__2CMNr text-input_hds-text-input__2LODq" style={{"max-width": "320px"}}>
                    <label className="FieldLabel-module_label__1zrXK ">{label}</label>
                    <div
                        className="TextInput-module_inputWrapper__3Rvel text-input_hds-text-input__input-wrapper__1OqYG">
                        <div className="NumberInput-module_numberInputContainer__hKNPp">
                            <div className="NumberInput-module_minusButtonWrapper__3PHN9">
                                <button className="NumberInput-module_button__2Shu7"
                                        type="button"
                                        aria-label="Decrease Quantity"
                                        onClick={handleDecrement}
                                        disabled={isDecrementDisabled}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="Icon-module_icon__1Jtzj icon_hds-icon__1YqNC Icon-module_s__2WGWe icon_hds-icon--size-s__2Lkik"
                                         viewBox="0 0 24 24" aria-hidden="true" role="img">
                                        <g fill="none" fill-rule="evenodd">
                                            <path d="M0 0h24v24H0z"/>
                                            <path fill="currentColor" d="M6 11h12v2H6z"/>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                            <input type="number"
                                   className="TextInput-module_input__1BlHi text-input_hds-text-input__input__GJm5C NumberInput-module_numberInputWithSteps__3q7N7"
                                   step={1}
                                   min={min}
                                   aria-describedby="undefined-helper"
                                   inputMode="numeric"
                                   pattern="[0-9]*"
                                   value={quantity}
                                   onBlur={handleBlur}
                                   onChange={handleOnChangeWithDebounce}/>
                            <div className="NumberInput-module_plusButtonWrapper__Wwq5t">
                                <button className="NumberInput-module_button__2Shu7"
                                        type="button"
                                        aria-label="Increase Quantity"
                                        onClick={handleIncrement}
                                        disabled={isIncrementDisabled}>
                                    <svg
                                        className="Icon-module_icon__1Jtzj icon_hds-icon__1YqNC Icon-module_s__2WGWe icon_hds-icon--size-s__2Lkik"
                                        viewBox="0 0 24 24" aria-hidden="true" role="img"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g fill="none" fill-rule="evenodd">
                                            <path d="M0 0h24v24H0z"/>
                                            <path fill="currentColor" d="M13 6v5h5v2h-5v5h-2v-5H6v-2h5V6z"/>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="TextInput-module_helperText__2dLR6 text-input_hds-text-input__helper-text__3V2KM"
                         id="undefined-helper">{helperText}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

Quantity.propTypes = {
    initialValue: number,
    itemId: string,
    label: string,
    helperText: string,
    min: number,
    onChange: func
};

Quantity.defaultProps = {
    label: '',
    min: 0,
    initialValue: 1,
    onChange: () => {
    }
};

export default Quantity;