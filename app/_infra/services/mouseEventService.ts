const LITERALS = {
    minValue: "min-value",
    maxValue: "max-value",
    minSelector: "min-selector",
    maxSelector: "max-selector",
    range: "range",
    progress: "progress",
};

const onMouseMove = (event: MouseEvent, rangeStartPosition: number, rangeEndPosition: number, mousePosition: number, selector: HTMLElement) => {
    let newSelectorPosition = event.clientX - mousePosition - rangeStartPosition;
    if (newSelectorPosition < 0) newSelectorPosition = 0;

    if (newSelectorPosition > rangeEndPosition) newSelectorPosition = rangeEndPosition;

    if (isValidMovement(selector, newSelectorPosition, rangeStartPosition)) {
        selector.style.left = `${newSelectorPosition}px`;
        selector.style.cursor = 'grabbing';
        setProgressWidth(selector.id);
    }
};


export const selectorMoveHandler = (selector: HTMLElement, rangeStartPosition: number, rangeEndPosition: number) => {
    selector.onmousedown = (event: MouseEvent) => {
        event.preventDefault();

        const selectorPosition = selector.getBoundingClientRect().left;
        const mousePosition = event.clientX - selectorPosition;

        const handleMove = (event: MouseEvent) => {
            onMouseMove(event, rangeStartPosition, rangeEndPosition, mousePosition, selector);
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

export const onChangeMaxValueHandler = (min: number, max: number, rangeStartPosition: number, rangeEndPosition: number, newValue: number) => {
    const maxSelector = document.getElementById(LITERALS.maxSelector);

    if (!isValidValue(min, max, newValue)) {
        console.log('RANGE START POSITION:', rangeStartPosition);
        console.log('RANGE END POSITION:', rangeEndPosition);
        (maxSelector as HTMLElement).style.left = `${rangeEndPosition}px`;
        return;
    };

    const newPosition = calculateNewPositionFromValue(min, max, rangeStartPosition, rangeEndPosition, newValue);
    (maxSelector as HTMLElement).style.left = `${newPosition}px`;

    console.log('NEW POSITION:', newPosition)
}


const calculateNewPositionFromValue = (min: number, max: number, rangeStartPosition: number, rangeEndPosition: number, newInsertedValue: number) => {
    const valueVariationPercentage = (newInsertedValue * 100) / (max - min);
    const newPosition = ((rangeEndPosition - rangeStartPosition) * valueVariationPercentage) / 100;

    return newPosition;
}


// functions
export const isValidMovement = (selector: HTMLElement, newSelectorPosition: number, rangePosition: number) => {
    const minSelector = document.getElementById(LITERALS.minSelector) as HTMLElement;
    const maxSelector = document.getElementById(LITERALS.maxSelector) as HTMLElement;

    const currentMinXPosition = (minSelector.getBoundingClientRect().left - rangePosition);
    const currentMaxXPosition = (maxSelector.getBoundingClientRect().left - rangePosition);

    if (selector.id === LITERALS.minSelector && newSelectorPosition >= currentMaxXPosition) return false;
    if (selector.id === LITERALS.maxSelector && newSelectorPosition <= currentMinXPosition) return false;

    return true;
}

export const isValidValue = (min: number, max: number, value: number) => {
    return !isNaN(value) && value >= min && value <= max;
}

export const setProgressWidth = (selectorId: string) => {
    const minSelector = document.getElementById(LITERALS.minSelector) as HTMLElement;
    const maxSelector = document.getElementById(LITERALS.maxSelector) as HTMLElement;
    const progress = document.getElementById(LITERALS.progress) as HTMLElement;
    const range = document.getElementById(LITERALS.range) as HTMLElement;
    const rangePosition = range.getBoundingClientRect().left;
    const minSelectorPosition = minSelector.getBoundingClientRect().left;
    const maxSelectorPosition = maxSelector.getBoundingClientRect().left;

    const progressWidth = maxSelectorPosition - minSelectorPosition;
    progress.style.width = `${progressWidth}px`;

    if (selectorId === LITERALS.minSelector) {
        progress.style.marginLeft = `${maxSelectorPosition - rangePosition - progressWidth}px`;
    };

    if (selectorId === LITERALS.maxSelector) {
        progress.style.marginRight = `${minSelectorPosition - rangePosition - progressWidth}px`;
    }
}


