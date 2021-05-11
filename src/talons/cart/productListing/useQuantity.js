import { useCallback, useMemo, useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

export const useQuantity = props => {
    const {initialValue, onChange} = props;

    const [prevQuantity, setPrevQuantity] = useState(initialValue);
    const [quantity, setQuantity] = useState(initialValue);

    const isIncrementDisabled = useMemo(() => !quantity, [quantity]);
    const isDecrementDisabled = useMemo(() => !quantity || quantity <= 1, [
        quantity
    ]);

    const debouncedOnChange = useMemo(
        () =>
            debounce(val => {
                setPrevQuantity(val);
                onChange(val);
            }, 350),
        [onChange]
    );

    const handleDecrement = useCallback(() => {
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        debouncedOnChange(newQuantity);
    }, [debouncedOnChange, quantity]);

    const handleIncrement = useCallback(() => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        debouncedOnChange(newQuantity);
    }, [debouncedOnChange, quantity]);

    const handleOnChangeWithDebounce = useCallback((event) => {
        const newQuantity = parseInt(event.target.value); // TODO: what if decimal value is used?
        setQuantity(newQuantity);
        debouncedOnChange(newQuantity);
    }, [debouncedOnChange, quantity]);

    const handleBlur = useCallback(() => {
        if (typeof quantity === 'number' && quantity != prevQuantity) {
            debouncedOnChange(quantity);
        }
    }, [debouncedOnChange, prevQuantity, quantity]);

    // TODO: handle decimal values?

    useEffect(() => {
        setQuantity(initialValue);
    }, [initialValue]);

    return {
        quantity,
        isDecrementDisabled,
        isIncrementDisabled,
        handleDecrement,
        handleIncrement,
        handleOnChangeWithDebounce,
        handleBlur
    };
};
