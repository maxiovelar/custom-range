import { isValidMovement, setProgressWidth } from "@/_common/business/range";
import { LITERALS } from "@/_common/constants/constants";
import { getState } from "@/store";

const ERRORS = {
    rangeValue: (min: number, max: number) => `The values must be between ${min} and ${max}`,
    crossedValue: 'Min value and max value cannot be crossed in range',
};

interface MouseMoveProps {
    event: MouseEvent, mousePosition: number, selector: HTMLElement, onInputChange: (newValue: string) => void
}

const onMouseMove = ({ event, mousePosition, selector, onInputChange }: MouseMoveProps) => {
    const { min, max, rangeStartPosition, rangeEndPosition } = getState();

    const selectorPosition = event.clientX - mousePosition - rangeStartPosition;
    let newSelectorPosition = Math.round(selectorPosition);

    if (newSelectorPosition < 0) newSelectorPosition = 0;
    if (newSelectorPosition > (rangeEndPosition - rangeStartPosition)) newSelectorPosition = (rangeEndPosition - rangeStartPosition);

    if (isValidMovement(selector, newSelectorPosition, rangeStartPosition)) {
        selector.style.left = `${newSelectorPosition}px`;
        selector.style.cursor = 'grabbing';
        setProgressWidth();

        const newValue = calculateNewValueFromPosition(newSelectorPosition, min, max);


        if (selector.id === LITERALS.minSelector) {
            onInputChange(`${newValue}`);
        }

        if (selector.id === LITERALS.maxSelector) {
            onInputChange(`${newValue}`);
        }
    }
};


export const selectorMoveHandler = (selector: HTMLElement, onInputChange: (newValue: string) => void) => {
    selector.onmousedown = (event: MouseEvent) => {
        event.preventDefault();

        const selectorPosition = selector.getBoundingClientRect().left;
        const mousePosition = event.clientX - selectorPosition;

        const handleMove = (event: MouseEvent) => {
            onMouseMove({ event, mousePosition, selector, onInputChange });
        }

        const onMouseUp = () => {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', handleMove);
            selector.style.cursor = 'grab';
        };

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    selector.ondragstart = () => {
        return false;
    };
};

export const onChangeMinValueHandler = (newValue: number, setError: (error: string) => void) => {
    const { min, max } = getState();
    const minSelector = document.getElementById(LITERALS.minSelector) as HTMLElement;
    const newPosition = calculateNewPositionFromValue(newValue);

    if (!isValidValue(min, max, newValue)) {
        (minSelector).style.left = '0px';
        setProgressWidth();
        setError(ERRORS.rangeValue(min, max));
        return;
    };

    if (isValueCrossed(LITERALS.minValue, newValue)) {
        (minSelector).style.left = '0px';
        setProgressWidth();
        setError(ERRORS.crossedValue);
        return;
    }

    setError('');

    (minSelector).style.left = `${newPosition}px`;
    setProgressWidth();
}

export const onChangeMaxValueHandler = (newValue: number, setError: (error: string) => void) => {
    const { min, max, rangeStartPosition, rangeEndPosition } = getState();
    const maxSelector = document.getElementById(LITERALS.maxSelector) as HTMLElement;
    const newPosition = calculateNewPositionFromValue(newValue);

    if (!isValidValue(min, max, newValue)) {
        (maxSelector).style.left = `${rangeEndPosition - rangeStartPosition}px`;
        setProgressWidth();
        setError(ERRORS.rangeValue(min, max));
        return;
    };

    if (isValueCrossed(LITERALS.maxValue, newValue)) {
        (maxSelector).style.left = `${rangeEndPosition - rangeStartPosition}px`;
        setProgressWidth();
        setError(ERRORS.crossedValue);
        return;
    }

    setError('');

    (maxSelector).style.left = `${newPosition}px`;
    setProgressWidth();
}

const calculateNewPositionFromValue = (newInsertedValue: number) => {
    const { min, max, rangeStartPosition, rangeEndPosition } = getState();

    const valueVariationPercentage = (newInsertedValue * 100) / (max - min);
    const newPosition = ((rangeEndPosition - rangeStartPosition) * valueVariationPercentage) / 100;
    return Math.round(newPosition);
}

const calculateNewValueFromPosition = (newPosition: number, min: number, max: number) => {
    const { rangeStartPosition, rangeEndPosition } = getState();
    const positionVariationPercentage = ((newPosition) * 100) / (rangeEndPosition - rangeStartPosition);
    const newValue = ((max - min) * positionVariationPercentage) / 100;
    return Math.round(newValue + min);
}

export const isValueCrossed = (inputValueId: string, newValue: number) => {
    if (inputValueId === LITERALS.minValue) {
        const inputMaxValue = document.getElementById(LITERALS.maxValue) as HTMLInputElement;
        return newValue >= Number(inputMaxValue.value);
    }

    if (inputValueId === LITERALS.maxValue) {
        const inputMinValue = document.getElementById(LITERALS.minValue) as HTMLInputElement;
        return newValue <= Number(inputMinValue.value);
    }

}

export const isValidValue = (min: number, max: number, value: number) => {
    return !isNaN(value) && value >= min && value <= max;
}


export const hasText = (str: string) => {
    return typeof str === 'string' && str !== undefined && str !== '';
}
