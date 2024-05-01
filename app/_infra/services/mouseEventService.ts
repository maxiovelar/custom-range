const LITERALS = {
    minValue: "min-value",
    maxValue: "max-value",
    minSelector: "min-selector",
    maxSelector: "max-selector",
    range: "range",
    progress: "progress",
};

const ERRORS = {
    rangeValue: (min: number, max: number) => `The values must be between ${min} and ${max}`,
    crossedValue: 'Min value and max value cannot be crossed in range',
};

const onMouseMove = (event: MouseEvent, rangeStartPosition: number, rangeEndPosition: number, mousePosition: number, selector: HTMLElement, min: number, max: number, setInputMinValue: (newValue: number) => void, setInputMaxValue: (newValue: number) => void) => {
    const selectorPosition = event.clientX - mousePosition - rangeStartPosition;
    let newSelectorPosition = Math.round(selectorPosition);
    console.log('newSelectorPosition', newSelectorPosition);

    if (newSelectorPosition < 0) newSelectorPosition = 0;
    if (newSelectorPosition > (rangeEndPosition - rangeStartPosition)) newSelectorPosition = (rangeEndPosition - rangeStartPosition);

    if (isValidMovement(selector, newSelectorPosition, rangeStartPosition)) {
        selector.style.left = `${newSelectorPosition}px`;
        selector.style.cursor = 'grabbing';
        setProgressWidth();

        const newValue = calculateNewValueFromPosition(newSelectorPosition, rangeStartPosition, rangeEndPosition, min, max);


        if (selector.id === LITERALS.minSelector) {
            setInputMinValue(newValue);
        }

        if (selector.id === LITERALS.maxSelector) {
            setInputMaxValue(newValue);
        }
    }
};


export const selectorMoveHandler = (selector: HTMLElement, rangeStartPosition: number, rangeEndPosition: number, min: number, max: number, setInputMinValue: (newValue: number) => void, setInputMaxValue: (newValue: number) => void) => {
    selector.onmousedown = (event: MouseEvent) => {
        event.preventDefault();

        const selectorPosition = selector.getBoundingClientRect().left;
        const mousePosition = event.clientX - selectorPosition;

        const handleMove = (event: MouseEvent) => {
            onMouseMove(event, rangeStartPosition, rangeEndPosition, mousePosition, selector, min, max, setInputMinValue, setInputMaxValue);
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

export const onChangeMinValueHandler = (min: number, max: number, rangeStartPosition: number, rangeEndPosition: number, newValue: number, setError: (error: string) => void) => {
    const minSelector = document.getElementById(LITERALS.minSelector) as HTMLElement;
    const newPosition = calculateNewPositionFromValue(min, max, rangeStartPosition, rangeEndPosition, newValue);

    if (!isValidValue(min, max, newValue)) {
        (minSelector as HTMLElement).style.left = '0px';
        setProgressWidth();
        setError(ERRORS.rangeValue(min, max));
        return;
    };

    if (isValueCrossed(LITERALS.minValue, newValue)) {
        (minSelector as HTMLElement).style.left = '0px';
        setProgressWidth();
        setError(ERRORS.crossedValue);
        return;
    }

    setError('');

    (minSelector as HTMLElement).style.left = `${newPosition}px`;
    setProgressWidth();
}

export const onChangeMaxValueHandler = (min: number, max: number, rangeStartPosition: number, rangeEndPosition: number, newValue: number, setError: (error: string) => void) => {
    const maxSelector = document.getElementById(LITERALS.maxSelector) as HTMLElement;
    const newPosition = calculateNewPositionFromValue(min, max, rangeStartPosition, rangeEndPosition, newValue);

    if (!isValidValue(min, max, newValue)) {
        (maxSelector as HTMLElement).style.left = `${rangeEndPosition - rangeStartPosition}px`;
        setProgressWidth();
        setError(ERRORS.rangeValue(min, max));
        return;
    };

    if (isValueCrossed(LITERALS.maxValue, newValue)) {
        (maxSelector as HTMLElement).style.left = `${rangeEndPosition - rangeStartPosition}px`;
        setProgressWidth();
        setError(ERRORS.crossedValue);
        return;
    }

    setError('');

    (maxSelector as HTMLElement).style.left = `${newPosition}px`;
    setProgressWidth();
}

export const setProgressWidth = () => {
    const minSelector = document.getElementById(LITERALS.minSelector) as HTMLElement;
    const maxSelector = document.getElementById(LITERALS.maxSelector) as HTMLElement;
    const selectorRadius = minSelector.offsetWidth / 2;
    const progress = document.getElementById(LITERALS.progress) as HTMLElement;
    const range = document.getElementById(LITERALS.range) as HTMLElement;
    const rangePosition = range.getBoundingClientRect().left;
    const minSelectorPosition = minSelector.getBoundingClientRect().left;
    const maxSelectorPosition = maxSelector.getBoundingClientRect().left;

    const progressWidth = maxSelectorPosition - minSelectorPosition;
    progress.style.width = `${progressWidth}px`;
    progress.style.marginLeft = `${minSelectorPosition - rangePosition + selectorRadius}px`;
}

const calculateNewPositionFromValue = (min: number, max: number, rangeStartPosition: number, rangeEndPosition: number, newInsertedValue: number) => {
    const valueVariationPercentage = (newInsertedValue * 100) / (max - min);
    const newPosition = ((rangeEndPosition - rangeStartPosition) * valueVariationPercentage) / 100;
    return Math.round(newPosition);
}

const calculateNewValueFromPosition = (newPosition: number, rangeStartPosition: number, rangeEndPosition: number, min: number, max: number) => {
    const positionVariationPercentage = ((newPosition) * 100) / (rangeEndPosition - rangeStartPosition);
    const newValue = ((max - min) * positionVariationPercentage) / 100;
    return Math.round(newValue + min);
}

// functions
export const isValidMovement = (selector: HTMLElement, newSelectorPosition: number, rangeStartPosition: number) => {
    const minSelector = document.getElementById(LITERALS.minSelector) as HTMLElement;
    const maxSelector = document.getElementById(LITERALS.maxSelector) as HTMLElement;

    const currentMinXPosition = (minSelector.getBoundingClientRect().left - rangeStartPosition);
    const currentMaxXPosition = (maxSelector.getBoundingClientRect().left - rangeStartPosition);

    if (selector.id === LITERALS.minSelector && newSelectorPosition >= currentMaxXPosition) return false;
    if (selector.id === LITERALS.maxSelector && newSelectorPosition <= currentMinXPosition) return false;

    return true;
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
